import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/**/*.graphql',
  generates: {
    './src/graphql/generated-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        maybeValue: 'T',
        scalars: {
          Date: 'Date',
        },
        mappers: {
          PageInfo: '../types/pagination.types#CustomPageInfo'
        },
      },
    },
  },
};

export default config;
