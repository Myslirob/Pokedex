import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { useAppContext } from 'src/appContext';
import { PokemonBox } from 'components/index/pokemonBox';
import { useFavoriteMutation } from 'src/api/hook';

import type { PokemonsQuery } from 'src/__generated__/graphql';

interface Props {
    fetchNext: () => void;
    pokemons: PokemonsQuery['pokemons']['edges'];
}

export const PokemonList = ({
    fetchNext,
    pokemons,
}: Props) => {
    const handleFavorite = useFavoriteMutation();
    const { view } = useAppContext();
    return (
        <InfiniteScroll
            dataLength={pokemons.length}
            hasMore
            loader={<div />}
            next={fetchNext}
        >
            <Container $mode={view}>
                {pokemons.map((pokemon) => (
                    <PokemonBox
                        favoritePokemon={handleFavorite}
                        key={pokemon.id}
                        pokemon={pokemon}
                    />
                ))}
            </Container>
        </InfiniteScroll>
    );
};

const Container = styled.div<{ $mode: 'list' | 'grid'}>`
  gap: 15px;
  padding: 15px;
  display: grid;
  grid-template-columns: ${(props) => props.$mode === 'grid' ? 'repeat(auto-fill, 200px)' : '1'};
  justify-content: ${(props) => props.$mode === 'grid' ? 'center' : 'stretch'};
  position: relative;
`;
