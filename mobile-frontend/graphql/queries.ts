import { gql } from '../__generated__';

export const CURRENT_USER = gql(`
  query CurrentUser {
    currentUser {
      username
    }
  }
`);
