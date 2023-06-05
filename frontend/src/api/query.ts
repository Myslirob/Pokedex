import { graphql } from 'src/__generated__';

export const FAVORITE_POKEMON = graphql(/* GraphQL */ `
    mutation FavoritePokemon($id: ID!) {
        favoritePokemon(id: $id) {
            id
            isFavorite
        }
    }
`);

export const UNFAVORITE_POKEMON = graphql(/* GraphQL */ `
    mutation UnFavoritePokemon($id: ID!) {
        unFavoritePokemon(id: $id) {
            id
            isFavorite
        }
    }
`);

export const GET_POKEMONS = graphql(/* GraphQL */ `
    query Pokemons($query: PokemonsQueryInput!) {
        pokemons(query: $query) {
            edges {
                name
                id
                types
                isFavorite
                image
                maxCP
                maxHP
            }
        }
    }
`);

export const GET_POKEMON_TYPES = graphql(/* GraphQL */ `
    query PokemonTypes {
        pokemonTypes
    }
`);

export const GET_POKEMON_BY_NAME = graphql(/* GraphQL */ `
    query PokemonByName($name: String!) {
        pokemonByName(name: $name) {
            name
            id
            types
            isFavorite
            image
            weaknesses
            resistant
            maxCP
            maxHP
            evolutions {
                name
                id
                isFavorite
                image
            }
            height {
                maximum
                minimum
            }
            weight {
                maximum
                minimum
            }
            sound
        }
    }
`);
