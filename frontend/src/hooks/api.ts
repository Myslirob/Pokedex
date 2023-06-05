import { useMutation } from '@apollo/client';
import { FAVORITE_POKEMON, UNFAVORITE_POKEMON } from 'src/api/query';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

import type { PokemonByNameQuery, PokemonsQuery } from 'src/__generated__/graphql';

export const useFavoriteMutation = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [ favoritePokemonMutation ] = useMutation(FAVORITE_POKEMON, {
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
    });
    const favoritePokemon = useCallback((pokemon: NonNullable<PokemonByNameQuery['pokemonByName']>['evolutions'][0] | NonNullable<PokemonByNameQuery['pokemonByName']>) => {
        if (pokemon.isFavorite) {
            unFavoritePokemon({
                variables: {
                    id: pokemon.id,
                },
            });
        } else {
            favoritePokemonMutation({
                variables: {
                    id: pokemon.id,
                },
            });
        }
    }, [favoritePokemonMutation, unFavoritePokemon]);
    return favoritePokemon;
};
