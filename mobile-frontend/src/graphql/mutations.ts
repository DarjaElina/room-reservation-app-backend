import { gql } from '@/__generated__';

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
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      id
      message
    }
  }
`);

export const UPDATE_BOOKING = gql(`
  mutation UpdateBooking($bookingId: ID!, $startDate: Date!, $endDate: Date!, $title: String, $roomId: ID!) {
    updateBooking(bookingId: $bookingId, startDate: $startDate, endDate: $endDate, title: $title, roomId: $roomId) {
      id
      message
    }
  }
`);
