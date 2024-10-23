import { gql } from '../__generated__';

export const CURRENT_USER = gql(`
  query CurrentUser {
    currentUser {
      username
      id
    }
  }
`);

export const ALL_ROOMS = gql(` 
  query AllRooms {
    allRooms {
      id
      isFree
      code
      equipment {
        name
      }
      pictureUrl
      isBookable
      size
      venue {
        name
      }
    }
  }
`);

export const FIND_ROOM = gql(`
  query FindRoom($roomId: ID!) {
    findRoom(roomId: $roomId) {
      id
      isFree
      code
      equipment {
        name
      }
      pictureUrl
      isBookable
      size
      venue {
        name
      }
      description
    }
  }
`);

export const BOOKINGS_BY_ROOM_AND_USER = gql(`
  query BookingsByRoomAndUser($roomId: ID!, $userId: ID!) {
    bookingsByRoomAndUser(roomId: $roomId, userId: $userId) {
      startDate
      endDate
      id
    }
  }
`);
