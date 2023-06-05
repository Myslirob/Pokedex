import styled, { css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faMaximize } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { useAppContext } from 'src/providers/appContext';
import { useRef } from 'react';
import { useMaximalize } from 'src/hooks/maximalize';
import { Backdrop } from 'src/elements/backdrop';
import { MaximalizablePokemonCard } from 'src/elements/card/pokemonCard';
import { IconButton } from 'src/elements/input/button/iconButton';
import { ImageWrapper } from 'src/elements/card/imageWrapper';
import { DescriptionWrapper } from 'src/elements/card/descriptionWrapper';
import { Title } from 'src/elements/card/title';

import type { PokemonsQuery } from 'src/__generated__/graphql';

interface Props {
    pokemon: PokemonsQuery['pokemons']['edges'][0];
    favoritePokemon: (pokemon: PokemonsQuery['pokemons']['edges'][0]) => void;
}

export const PokemonBox = ({ pokemon, favoritePokemon }: Props) => {
    const { view } = useAppContext();
    const boxRef = useRef<any>(null);
    const {
        maximalize,
        minimalize,
        isHiding,
        coordination,
    } = useMaximalize({ ref: boxRef });
    return (
        <CardWrapper $mode={view} ref={boxRef}>
            {coordination && (
                <Backdrop onClick={minimalize}
                    show={!isHiding}
                />
            )}
            <Link href={`/${pokemon.name}`}>
                <MaximalizablePokemonCard $coordination={coordination} $isHiding={isHiding} $mode={view}>
                    <ImageWrapper $mode={view}>
                        {view === 'grid' && coordination === undefined && (
                            <MaximalizeButton onClick={(e) => {
                                e.preventDefault();
                                maximalize();
                            }}
                            >
                                <FontAwesomeIcon icon={faMaximize} size="lg" />
                            </MaximalizeButton>
                        )}
                        <img alt={pokemon.name} src={pokemon.image} />
                    </ImageWrapper>
                    {!isHiding && (
                        <AdditionalInfo>
                            <DescriptionWrapper>
                                <Line color="red" />
                                <span>HP: {pokemon.maxHP}</span>
                            </DescriptionWrapper>
                            <DescriptionWrapper>
                                <Line color="blue" />
                                <span>CP: {pokemon.maxCP}</span>
                            </DescriptionWrapper>
                        </AdditionalInfo>
                    )}
                    <DescriptionWrapper>
                        <Title>
                            <b>{pokemon.name}</b><br />
                            {pokemon.types.join(', ')}
                        </Title>
                        <IconButton><FontAwesomeIcon color="red" icon={pokemon.isFavorite ? fullHeart : emptyHeart} onClick={(e) => {
                            e.preventDefault();
                            favoritePokemon(pokemon);
                        }} size="xl"
                        /></IconButton>
                    </DescriptionWrapper>
                </MaximalizablePokemonCard>
            </Link>
        </CardWrapper>
    );
};

const Line = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 10px;
  flex-grow: 1;
  height: 10px;
  margin-right: 10px;
`;

const CardWrapper = styled.div<{ $mode: 'list' | 'grid'}>`
  ${(props) => {
        switch (props.$mode) {
            case 'list': return css`
              width: 100%;
              height: 60px;
        `;
            default: return css`
              height: 250px;
              width: 195px;
        `;
        }
    }
}
  position: relative;
  & a {
    color: black;
    text-decoration: none;
  }
`;

const MaximalizeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 2px 0px #eee;
    opacity: 0.5;
  }
  position: absolute;
  top: 10px;
  right: 5px;
  opacity: 0.3;
  z-index: 2;
`;

const Opacity = keyframes`
  0% {
    opacity: 0;
    display: none;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
    display: block;
  }
`;

const AdditionalInfo = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex-grow: 1;
  opacity: 0;
  animation: ${Opacity} 1s 0.2s ease-in forwards;
`;

