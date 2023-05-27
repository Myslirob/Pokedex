import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { graphql } from 'src/__generated__';
import { useAppContext } from 'src/appContext';
import { Filter } from 'components/index/filter';
import { PokemonList } from 'components/index/pokemonList';

const GET_LOCATIONS = graphql(/* GraphQL */ `
  query Pokemons($query: PokemonsQueryInput!) { 
    pokemons(query: $query) {
        edges {
            name
            id
            types
            isFavorite
            image
        }
    }
  }
`);

export default function Home() {
    const { filter } = useAppContext();
    const { data, fetchMore } = useQuery(
        GET_LOCATIONS,
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
