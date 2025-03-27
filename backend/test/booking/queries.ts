export const BOOKINGS = `
    query Bookings($roomId: ID, $userId: ID, $status: BookingStatus, $startDate: Date, $endDate: Date) {
      bookings(roomId: $roomId, userId: $userId, status: $status, startDate: $startDate, endDate: $endDate) {
        title
        bookingTime {
          value
        }
        id
        user {
          familyName
          givenName
        }
        room {
          code
          id
        }
      }
    }
`;