import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useAppContext } from 'src/appContext';
import { PokemonBox } from 'components/index/pokemonBox';
import { FAVORITE_POKEMON, UNFAVORITE_POKEMON } from 'src/api/queries';
import { useSnackbar } from 'notistack';

import type { PokemonsQuery } from 'src/__generated__/graphql';

interface Props {
    fetchNext: () => void;
    pokemons: PokemonsQuery['pokemons']['edges'];
}

export const PokemonList = ({
    fetchNext,
    pokemons,
}: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [favoritePokemon] = useMutation(FAVORITE_POKEMON, {
        onCompleted: () => {
            enqueueSnackbar({
                message: 'Pokemon was added to favorites',
                variant: 'success',
            });
        },
    });
    const [unFavoritePokemon] = useMutation(UNFAVORITE_POKEMON, {
        onCompleted: () => {
            enqueueSnackbar({
                message: 'Pokemon was removed from favorites',
                variant: 'success',
            });
        },
    });
    const handleFavorite = useCallback((pokemon: PokemonsQuery['pokemons']['edges'][0]) => {
        if (pokemon.isFavorite) {
            unFavoritePokemon({
                update: (cache, { data }) => {
                    cache.modify({
                        fields: (value: PokemonsQuery['pokemons'], { readField, storeFieldName }) => {
                            const unFavoritePokemon = data ? data.unFavoritePokemon : undefined;
                            if (unFavoritePokemon && storeFieldName.includes('"isFavorite":true')) {
                                return {
                                    ...value,
                                    edges: value.edges.filter((pokemon) => readField('id', pokemon) !== unFavoritePokemon.id),
                                };
                            }
                            return value;
                        },
                    });
                },
                variables: {
                    id: pokemon.id,
                },
            });
        } else {
            favoritePokemon({
                variables: {
                    id: pokemon.id,
                },
            });
        }
    }, [favoritePokemon, unFavoritePokemon]);
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
