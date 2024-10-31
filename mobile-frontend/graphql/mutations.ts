import { gql } from '../__generated__';

export const AUTHENTICATE = gql(`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      value
    }
  }
`);

export const CREATE_BOOKING = gql(`
  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!) {
    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate) {
      room {
        code
      }
    }
  }
`);
