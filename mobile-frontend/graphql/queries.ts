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
  query BookingsByRoomAndUser($roomId: ID!, $userId: ID!, $status: BookingStatus) {
    bookingsByRoomAndUser(roomId: $roomId, userId: $userId, status: $status) {
      startDate
      endDate
      id
    }
  }
`);

export const BOOKINGS_BY_ROOM_AND_DATE = gql(`
  query BookingsByRoomAndDate($roomId: ID!, $startDate: Date!, $endDate: Date!) {
    bookingsByRoomAndDate(roomId: $roomId, startDate: $startDate, endDate: $endDate) {
      id
      user {
        familyName
        givenName
      }
      endDate
      startDate
    }
  }
`);

export const ALL_VENUES = gql(`
  query AllVenues {
    allVenues {
      name
      code
    }
  }
`);

export const ALL_EQUIPMENT = gql(`
  query AllEquipment {
    allEquipment {
      name
    }
  }
`);
