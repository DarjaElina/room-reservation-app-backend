import { gql } from '../__generated__';

export const CURRENT_USER = gql(`
  query CurrentUser {
    currentUser {
      username
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
