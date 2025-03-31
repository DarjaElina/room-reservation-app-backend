export const BOOKINGS = `
  query Bookings {
    bookings {
      bookingTime {
        value
      }
      id
      room {
        code
      }
    }
  }
`;
