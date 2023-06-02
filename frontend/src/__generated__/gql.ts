/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation FavoritePokemon($id: ID!) {\n        favoritePokemon(id: $id) {\n            id\n            isFavorite\n        }\n    }\n": types.FavoritePokemonDocument,
    "\n    mutation UnFavoritePokemon($id: ID!) {\n        unFavoritePokemon(id: $id) {\n            id\n            isFavorite\n        }\n    }\n": types.UnFavoritePokemonDocument,
    "\n    query Pokemons($query: PokemonsQueryInput!) {\n        pokemons(query: $query) {\n            edges {\n                name\n                id\n                types\n                isFavorite\n                image\n                maxCP\n                maxHP\n            }\n        }\n    }\n": types.PokemonsDocument,
    "\n    query PokemonTypes {\n        pokemonTypes\n    }\n": types.PokemonTypesDocument,
    "\n    query PokemonByName($name: String!) {\n        pokemonByName(name: $name) {\n            name\n            id\n            types\n            isFavorite\n            image\n            weaknesses\n            resistant\n            maxCP\n            maxHP\n            evolutions {\n                name\n                id\n                isFavorite\n                image\n            }\n            height {\n                maximum\n                minimum\n            }\n            weight {\n                maximum\n                minimum\n            }\n            sound\n        }\n    }\n": types.PokemonByNameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation FavoritePokemon($id: ID!) {\n        favoritePokemon(id: $id) {\n            id\n            isFavorite\n        }\n    }\n"): (typeof documents)["\n    mutation FavoritePokemon($id: ID!) {\n        favoritePokemon(id: $id) {\n            id\n            isFavorite\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UnFavoritePokemon($id: ID!) {\n        unFavoritePokemon(id: $id) {\n            id\n            isFavorite\n        }\n    }\n"): (typeof documents)["\n    mutation UnFavoritePokemon($id: ID!) {\n        unFavoritePokemon(id: $id) {\n            id\n            isFavorite\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Pokemons($query: PokemonsQueryInput!) {\n        pokemons(query: $query) {\n            edges {\n                name\n                id\n                types\n                isFavorite\n                image\n                maxCP\n                maxHP\n            }\n        }\n    }\n"): (typeof documents)["\n    query Pokemons($query: PokemonsQueryInput!) {\n        pokemons(query: $query) {\n            edges {\n                name\n                id\n                types\n                isFavorite\n                image\n                maxCP\n                maxHP\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query PokemonTypes {\n        pokemonTypes\n    }\n"): (typeof documents)["\n    query PokemonTypes {\n        pokemonTypes\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query PokemonByName($name: String!) {\n        pokemonByName(name: $name) {\n            name\n            id\n            types\n            isFavorite\n            image\n            weaknesses\n            resistant\n            maxCP\n            maxHP\n            evolutions {\n                name\n                id\n                isFavorite\n                image\n            }\n            height {\n                maximum\n                minimum\n            }\n            weight {\n                maximum\n                minimum\n            }\n            sound\n        }\n    }\n"): (typeof documents)["\n    query PokemonByName($name: String!) {\n        pokemonByName(name: $name) {\n            name\n            id\n            types\n            isFavorite\n            image\n            weaknesses\n            resistant\n            maxCP\n            maxHP\n            evolutions {\n                name\n                id\n                isFavorite\n                image\n            }\n            height {\n                maximum\n                minimum\n            }\n            weight {\n                maximum\n                minimum\n            }\n            sound\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;