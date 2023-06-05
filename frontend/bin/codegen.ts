import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    debug: true,
    documents: ['./src/api/query.ts'],
    generates: {
        './src/__generated__/': {
            plugins: [],
            preset: 'client',
        },
    },
    ignoreNoDocuments: false,
    overwrite: true,
    schema: '../backend/src/schema.graphql',
    silent: false,
    verbose: true,
    // schema: 'http://localhost:4000/graphql',
};
export default config;
