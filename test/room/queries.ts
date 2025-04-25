export const ROOMS = `
  query Rooms($startsAt: Date, $endsAt: Date, $venueIds: [ID!], $roomTypes: [RoomType!], $equipmentIds: [ID!], $searchKeyword: String, $isBookable: Boolean, $after: String, $first: Int, $showFavorites: Boolean) {
    rooms(startsAt: $startsAt, endsAt: $endsAt, venueIds: $venueIds, roomTypes: $roomTypes, equipmentIds: $equipmentIds, searchKeyword: $searchKeyword, isBookable: $isBookable, after: $after, first: $first, showFavorites: $showFavorites) {
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
          type
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
`;

export const FIND_ROOM = `
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
      type
      isFavorite
    }
  }
`;