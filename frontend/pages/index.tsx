import { useQuery } from '@apollo/client';
import { useAppContext } from 'src/appContext';
import { Filter } from 'components/index/filter';
import { PokemonList } from 'components/index/pokemonList';
import { GET_POKEMONS } from 'src/api/queries';
import React from 'react';
import { useDocumentTitle } from 'usehooks-ts';

export default function Home() {
    useDocumentTitle('Pokedex');
    const { filter } = useAppContext();
    const query = {
        limit: 20,
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
