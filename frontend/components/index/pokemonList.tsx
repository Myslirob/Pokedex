import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { graphql } from 'src/__generated__';
import { useAppContext } from 'src/appContext';
import { PokemonBox } from 'components/index/pokemonBox';

import type { PokemonsQuery } from 'src/__generated__/graphql';

interface Props {
    fetchNext: () => void;
    pokemons: PokemonsQuery['pokemons']['edges'];
}

const FAVORITE_POKEMON = graphql(/* GraphQL */ `
    mutation FavoritePokemon($id: ID!) {
        favoritePokemon(id: $id) {
            id
            isFavorite
        }
    }
`);

const UNFAVORITE_POKEMON = graphql(/* GraphQL */ `
    mutation UnFavoritePokemon($id: ID!) {
        unFavoritePokemon(id: $id) {
            id
            isFavorite
        }
    }
`);

export const PokemonList = ({
    fetchNext,
    pokemons,
}: Props) => {
    const [favoritePokemon] = useMutation(FAVORITE_POKEMON);
    const [unFavoritePokemon] = useMutation(UNFAVORITE_POKEMON);
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
`;
