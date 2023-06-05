import Webcam from 'react-webcam';
import { useCallback, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_BY_NAME } from 'src/api/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRotate, faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { useFavoriteMutation } from 'src/api/hook';
import { usePokemonRecognizer } from 'src/pokemonRecognizer/hook';
import { useDisableScroll } from 'src/hook/disableScroll';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isMobile } from 'src/helper';

import { Backdrop } from '../../elements/backdrop';
import { IconButton } from '../../elements/input/button/iconButton';
import { Button } from '../../elements/input/button/button';
import { DescriptionWrapper } from '../../elements/card/descriptionWrapper';
import { Title } from '../../elements/card/title';
import { ImageWrapper, RelativeImageWrapper } from '../../elements/card/imageWrapper';
import { Modal } from '../../elements/modal';

export const useImageRecognizer = () => {
    const [ isShown, setShow ] = useState(false);
    return {
        Component: <div>
            {isShown && (
                <>
                    <Backdrop onClick={() => setShow(false)} show />
                    <PokemonRecognizer />
                </>
            )}
        </div>,
        show: () => setShow(true),
    };
};

const PokemonRecognizer = () => {
    useDisableScroll(false);
    const webcamRef = useRef<Webcam>(null);
    const { predict } = usePokemonRecognizer();
    const isWide = useMediaQuery('(min-width: 480px)');
    const [orientation, setOrientation] = useState(isWide);
    const [pokemonName, setPokemonName] = useState<string | null>(null);
    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (!imageSrc) {
            return;
        }
        const data = await predict(imageSrc);
        setPokemonName(data);
    }, [predict]);
    const videoConstraints = {
        facingMode: !orientation ? { exact: 'environment' } : undefined,
        height: 300,
        width: 300,
    };
    const isMobileDevice = isMobile();
    const processFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (FileReader && event.target.files) {
            const fr = new FileReader();
            fr.onload = async function () {
                const result = fr.result;
                if (typeof result !== 'string') return;
                const pokemonName = await predict(result);
                setPokemonName(pokemonName);
            };
            fr.readAsDataURL(event.target.files[0]);
        }
    };
    return (
        <Modal>
            {pokemonName === null && (
                <>
                    {isMobileDevice && (
                        <RelativeImageWrapper>
                            <>
                                <SwitchButtonWrapper>
                                    <IconButton
                                        onClick={() => {
                                            setOrientation(!orientation);
                                        }}
                                    ><FontAwesomeIcon icon={faCameraRotate} size="xl" /></IconButton>
                                </SwitchButtonWrapper>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                            </>
                        </RelativeImageWrapper>
                    )}
                    {!isMobileDevice && (
                        <>
                            <UploadImageWrapper htmlFor="uploadImage">
                                <Image alt="Upload image" height={300} src="/upload-pokemon.jpg" width={300} />
                            </UploadImageWrapper>
                            <input id="uploadImage" onChange={processFile} style={{ display: 'none' }} type="file" />
                        </>
                    )}
                    <ButtonContainer>
                        {isMobileDevice && (
                            <>
                                <Button color="green" maxWidth={250} onClick={capture}>Photo</Button>
                            </>
                        )}
                    </ButtonContainer>
                </>
            )}
            {pokemonName !== null && <PokemonInfo pokemonName={pokemonName} />}
        </Modal>
    );
};

const UploadImageWrapper = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SwitchButtonWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
`;

const PokemonInfo = ({ pokemonName }: { pokemonName: string }) => {
    const router = useRouter();
    const { data } = useQuery(GET_POKEMON_BY_NAME, { variables: { name: pokemonName } });
    const favoritePokemon = useFavoriteMutation();
    const pokemon = data?.pokemonByName;
    return (
        <>
            { pokemon && (
                <>
                    <ImageWrapper>
                        <img alt={pokemon.name} src={pokemon.image} />
                    </ImageWrapper>
                    <ButtonContainer>
                        <Button color="white" maxWidth={250} onClick={() => router.push(`/${pokemon.name}`)}>Open detail</Button>
                    </ButtonContainer>
                    <DescriptionWrapper>
                        <Title>
                            <b>{pokemon.name}</b><br />
                            {pokemon.types.join(', ')}
                        </Title>
                        <IconButton onClick={(e) => {
                            e.preventDefault();
                            favoritePokemon(pokemon);
                        }}
                        >
                            <FontAwesomeIcon color="red" icon={pokemon.isFavorite ? fullHeart : emptyHeart} size="xl" />
                        </IconButton>
                    </DescriptionWrapper>
                </>
            )}
        </>
    );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px 20px 10px;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

