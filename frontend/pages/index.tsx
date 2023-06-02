import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { useAppContext } from 'src/appContext';
import { Filter } from 'components/index/filter';
import { PokemonList } from 'components/index/pokemonList';
import { GET_POKEMONS } from 'src/api/queries';

export default function Home() {
    const { filter } = useAppContext();
    const { data, fetchMore } = useQuery(
        GET_POKEMONS,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                query: {
                    limit: 20,
                    offset: 0,
                    ...(filter.name ? { search: filter.name } : {}),
                    filter: {
                        ...(filter.type ? { type: filter.type } : {}),
                        ...(filter.isFavorite ? { isFavorite: filter.isFavorite } : {}),
                    },
                },
            },
        }
    );

    const fetchNext = () => fetchMore({
        variables: {
            query: {
                limit: 20,
                offset: data?.pokemons.edges.length,
                ...(filter.name ? { search: filter.name } : {}),
                filter: {
                    ...(filter.type ? { type: filter.type } : {}),
                    ...(filter.isFavorite ? { isFavorite: filter.isFavorite } : {}),
                },
            },
        },
    });

    return (
        <>
            <Head>
                <title>Pokedex</title>
            </Head>
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
