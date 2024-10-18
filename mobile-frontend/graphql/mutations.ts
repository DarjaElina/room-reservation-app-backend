import { gql } from '../__generated__';

export const AUTHENTICATE = gql(`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      value
    }
  }
`);
