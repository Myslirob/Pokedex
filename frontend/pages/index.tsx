import { useQuery } from '@apollo/client';
import { useAppContext } from 'src/providers/appContext';
import { GET_POKEMONS } from 'src/api/query';
import React from 'react';
import { useDocumentTitle } from 'usehooks-ts';
import { PokemonList } from 'src/components/pokemonList';
import { Filter } from 'src/components/filter';

export default function Home() {
    useDocumentTitle('Pokedex');
    const { filter } = useAppContext();
    const query = {
        limit: 40,
        offset: 0,
        ...(filter.name ? { search: filter.name } : {}),
        filter: {
            ...(filter.type ? { type: filter.type } : {}),
            ...(filter.isFavorite ? { isFavorite: filter.isFavorite } : {}),
        },
    };
    const { data, fetchMore } = useQuery(
        GET_POKEMONS,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                query,
            },
        }
    );

    const fetchNext = () => fetchMore({
        variables: {
            query: {
                ...query,
                offset: data?.pokemons.edges.length,
            },
        },
    });

    return (
        <>
            <Filter />
            {data && (
                <PokemonList
                    fetchNext={fetchNext}
                    pokemons={data.pokemons.edges}
                />
            )}
        </>
    );
}
