import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_BY_NAME } from 'src/api/queries';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { PokemonEvolution } from 'components/index/pokemonEvolution';
import { useFavoriteMutation } from 'src/api/hooks';

export default function PokemonDetail() {
    const router = useRouter();
    return <Request pokemonName={`${router.query.pokemon}`} />;
}

const Request = ({ pokemonName }: { pokemonName: string }) => {
    const { data } = useQuery(GET_POKEMON_BY_NAME, { variables: { name: pokemonName } });
    const favoritePokemon = useFavoriteMutation();
    return (
        <Container>
            {data !== undefined && data.pokemonByName && (
                <>
                    <Paper>
                        <ImageWrapper>
                            <PlayButton sound={data.pokemonByName.sound} />
                            <img alt={data.pokemonByName.name} src={data.pokemonByName.image} />
                        </ImageWrapper>
                        <Content>
                            <Item>CP:</Item>
                            <Item>{data.pokemonByName.maxCP}</Item>
                            <Item>HP:</Item>
                            <Item>{data.pokemonByName.maxHP}</Item>
                            <Item>Weakness:</Item>
                            <Item>{data.pokemonByName.weaknesses.join(', ')}</Item>
                            <Item>Resistant:</Item>
                            <Item>{data.pokemonByName.resistant.join(', ')}</Item>
                            <Item>Height:</Item>
                            <Item>{data.pokemonByName.height.minimum} - {data.pokemonByName.height.maximum}</Item>
                            <Item>Weight:</Item>
                            <Item>{data.pokemonByName.weight.minimum} - {data.pokemonByName.weight.maximum}</Item>
                        </Content>
                        <DescriptionWrapper>
                            <TitleWrapper>
                                <b>{data.pokemonByName.name}</b><br />
                                {data.pokemonByName.types.join(', ')}
                            </TitleWrapper>
                            <IconButton><FontAwesomeIcon color="red" icon={data.pokemonByName.isFavorite ? fullHeart : emptyHeart} onClick={(e) => {
                                e.preventDefault();
                                // @ts-expect-error
                                favoritePokemon(data.pokemonByName);
                            }} size="xl"
                            /></IconButton>
                        </DescriptionWrapper>
                    </Paper>
                    {data.pokemonByName.evolutions.length > 0 && (
                        <>
                            <h3>Evolutions:</h3>
                            <Container2>
                                {
                                    data.pokemonByName.evolutions.map((pokemon) => (
                                        <>
                                            {pokemon && (
                                                <PokemonEvolution
                                                    favoritePokemon={favoritePokemon}
                                                    key={pokemon.id}
                                                    pokemon={pokemon}
                                                />
                                            )}
                                        </>
                                    ))
                                }
                            </Container2>
                        </>
                    )}
                </>
            )}
        </Container>
    );
};
const PlayButton = ({ sound }: { sound: string }) => {
    const play = () => {
        const a = new Audio(sound);
        a.play();
    };
    return <PlayButtonWrapper><IconButton onClick={() => play()}><FontAwesomeIcon icon={faVolumeHigh} size="lg" /></IconButton></PlayButtonWrapper>;
};

const PlayButtonWrapper = styled.div`
  position: absolute;
  left: 5px;
  bottom: 5px;
`;

const Container2 = styled.div`
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  position: relative;
  & a {
    color: black;
    text-decoration: none;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: [c1] max-content [c2] auto;
  grid-row-gap: 15px;
  grid-column-gap: 40px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Item = styled.div`
`;

const ImageWrapper = styled.div`
    position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 2px 0 #eee;
  }
`;

const TitleWrapper = styled.span`
  color: black;
  text-decoration: none;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #d5e6d196;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
`;

const Container = styled.div`
  padding: 1rem;
  max-width: 700px;
  margin: 0 auto;
`;

const Paper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #96eca4;
  border-radius: 5px;
  box-shadow: 0 0 3px #96eca4;
  height: 100%;
  width: 100%;
  flex-direction: column;
  background-color: white;
`;
