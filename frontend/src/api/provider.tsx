import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    pokemons: {
                        ...offsetLimitPagination([
                            'query',
                            ['search', 'filter', ['type', 'isFavorite']],
                        ]),
                        merge: (existing, incoming, { args }) => {
                            const merged = existing && args !== null && args.query.offset > 0 ? existing.edges : [];
                            return { __typename: incoming.__typename, edges: [...merged, ...incoming.edges] };
                        },
                    },
                },
            },
        },
    }),
    uri: 'http://localhost:4000/graphql',
});

export const ApiProvider = ({ children }: Props) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
};
