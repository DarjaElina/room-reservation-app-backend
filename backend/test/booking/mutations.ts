export const CREATE_BOOKING = `
    mutation CreateBooking($roomId: ID!, $bookingTime: [Date!]!, $title: String) {
      createBooking(roomId: $roomId, bookingTime: $bookingTime, title: $title) {
        title
        id
        bookingTime {
          value
        }
        user {
          familyName
          givenName
        }
        room {
          code
        }
      }
    }
`;