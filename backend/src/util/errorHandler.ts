import { GraphQLError } from 'graphql';
import {
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
  ConnectionError,
  AggregateError,
} from 'sequelize';

export const handleResolverErrors = (error: unknown) => {
  console.log(error);
  if (error instanceof UniqueConstraintError) {
    const violatedFields = error.errors.map((e) => e.path);
    throw new GraphQLError(
      `The following fields must be unique: ${violatedFields.join(', ')}`,
      {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: violatedFields,
          details: error.errors.map((e) => ({
            message: e.message,
            path: e.path,
          })),
        },
      }
    );
  }

  if (error instanceof ValidationError) {
    throw new GraphQLError('Validation error', {
      extensions: {
        code: 'BAD_USER_INPUT',
        details: error.errors.map((e) => ({
          message: e.message,
          path: e.path,
        })),
      },
    });
  }

  if (error instanceof ForeignKeyConstraintError) {
    throw new GraphQLError('Invalid reference to related data', {
      extensions: {
        code: 'BAD_USER_INPUT',
        details: error.message,
      },
    });
  }

  if (error instanceof ConnectionError) {
    throw new GraphQLError('Database connection error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        details: 'Could not connect to the database. Please try again later.',
      },
    });
  }

  if (error instanceof AggregateError) {
    const errors = error.errors.map((err) => {
      return {
        message: err.message,
      };
    });
    throw new GraphQLError('Validation errors occurred', {
      extensions: {
        code: 'BAD_USER_INPUT',
        details: errors,
      },
    });
  }

  if (error instanceof GraphQLError && error.extensions?.code === 'BAD_USER_INPUT') {
    throw new GraphQLError(error.message, {
      extensions: {
        code: error.extensions.code,
        details: error.extensions.details,
      },
    });
  }

  throw new GraphQLError('An internal server error occurred', {
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
    },
  });
};
