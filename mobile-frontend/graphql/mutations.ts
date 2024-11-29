import { gql } from '../__generated__';

export const AUTHENTICATE = gql(`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password) {
      value
    }
  }
`);

export const CREATE_BOOKING = gql(`
  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!, $title: String) {
    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate, title: $title) {
      title
      id
      startDate
      endDate
      user {
        familyName
        givenName
      }
      room {
        code
      }
    }
  }
`);

export const CANCEL_BOOKING = gql(`
  mutation Mutation($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      id
      message
    }
  }
`);
