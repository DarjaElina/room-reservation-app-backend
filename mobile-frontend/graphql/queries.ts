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
  query Rooms($startsAt: Date, $endsAt: Date, $venueIds: [ID!], $roomTypes: [RoomType!], $equipmentIds: [ID!], $searchKeyword: String, $isBookable: Boolean, $after: String, $first: Int) {
    rooms(startsAt: $startsAt, endsAt: $endsAt, venueIds: $venueIds, roomTypes: $roomTypes, equipmentIds: $equipmentIds, searchKeyword: $searchKeyword, isBookable: $isBookable, after: $after, first: $first) {
      edges {
        cursor
        node {
          code
          equipment {
            name
            id
          }
          id
          isFree
          pictureUrl
          size
          venue {
            name
          }
          description
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
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
        id
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

export const ALL_VENUES = gql(`
  query AllVenues($searchKeyword: String) {
    allVenues(searchKeyword: $searchKeyword) {
      name
      code
      id
    }
  }
`);

export const ALL_EQUIPMENT = gql(`
  query AllEquipment($searchKeyword: String) {
    allEquipment(searchKeyword: $searchKeyword) {
      name
      id
    }
  }
`);

export const BOOKINGS = gql(`
  query Bookings($roomId: ID, $userId: ID, $status: BookingStatus, $startDate: Date, $endDate: Date) {
    bookings(roomId: $roomId, userId: $userId, status: $status, startDate: $startDate, endDate: $endDate) {
      title
      endDate
      id
      startDate
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
`);
