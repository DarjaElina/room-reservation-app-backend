/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password) {\n      value\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!) {\n    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate) {\n      room {\n        code\n      }\n    }\n  }\n": types.CreateBookingDocument,
    "\n  query CurrentUser {\n    currentUser {\n      username\n      id\n    }\n  }\n": types.CurrentUserDocument,
    " \n  query Rooms($startsAt: Date, $endsAt: Date, $venueId: ID, $roomType: RoomType, $accessoriesIds: [ID!], $isBookable: Boolean, $searchKeyword: String, $after: String, $first: Int) {\n    rooms(startsAt: $startsAt, endsAt: $endsAt, venueId: $venueId, roomType: $roomType, accessoriesIds: $accessoriesIds, isBookable: $isBookable, searchKeyword: $searchKeyword, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          isFree\n          code\n          equipment {\n            name\n          }\n          pictureUrl\n          size\n          venue {\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        startCursor\n      }\n    }\n  }\n": types.RoomsDocument,
    "\n  query FindRoom($roomId: ID!) {\n    findRoom(roomId: $roomId) {\n      id\n      isFree\n      code\n      equipment {\n        name\n      }\n      pictureUrl\n      isBookable\n      size\n      venue {\n        name\n      }\n      description\n    }\n  }\n": types.FindRoomDocument,
    "\n  query BookingsByRoomAndUser($roomId: ID!, $userId: ID!, $status: BookingStatus) {\n    bookingsByRoomAndUser(roomId: $roomId, userId: $userId, status: $status) {\n      startDate\n      endDate\n      id\n    }\n  }\n": types.BookingsByRoomAndUserDocument,
    "\n  query BookingsByRoomAndDate($roomId: ID!, $startDate: Date!, $endDate: Date!) {\n    bookingsByRoomAndDate(roomId: $roomId, startDate: $startDate, endDate: $endDate) {\n      id\n      user {\n        familyName\n        givenName\n      }\n      endDate\n      startDate\n    }\n  }\n": types.BookingsByRoomAndDateDocument,
    "\n  query AllVenues {\n    allVenues {\n      name\n      code\n    }\n  }\n": types.AllVenuesDocument,
    "\n  query AllEquipment {\n    allEquipment {\n      name\n    }\n  }\n": types.AllEquipmentDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password) {\n      value\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password) {\n      value\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!) {\n    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate) {\n      room {\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!) {\n    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate) {\n      room {\n        code\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CurrentUser {\n    currentUser {\n      username\n      id\n    }\n  }\n"): (typeof documents)["\n  query CurrentUser {\n    currentUser {\n      username\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \n  query Rooms($startsAt: Date, $endsAt: Date, $venueId: ID, $roomType: RoomType, $accessoriesIds: [ID!], $isBookable: Boolean, $searchKeyword: String, $after: String, $first: Int) {\n    rooms(startsAt: $startsAt, endsAt: $endsAt, venueId: $venueId, roomType: $roomType, accessoriesIds: $accessoriesIds, isBookable: $isBookable, searchKeyword: $searchKeyword, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          isFree\n          code\n          equipment {\n            name\n          }\n          pictureUrl\n          size\n          venue {\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)[" \n  query Rooms($startsAt: Date, $endsAt: Date, $venueId: ID, $roomType: RoomType, $accessoriesIds: [ID!], $isBookable: Boolean, $searchKeyword: String, $after: String, $first: Int) {\n    rooms(startsAt: $startsAt, endsAt: $endsAt, venueId: $venueId, roomType: $roomType, accessoriesIds: $accessoriesIds, isBookable: $isBookable, searchKeyword: $searchKeyword, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          isFree\n          code\n          equipment {\n            name\n          }\n          pictureUrl\n          size\n          venue {\n            name\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindRoom($roomId: ID!) {\n    findRoom(roomId: $roomId) {\n      id\n      isFree\n      code\n      equipment {\n        name\n      }\n      pictureUrl\n      isBookable\n      size\n      venue {\n        name\n      }\n      description\n    }\n  }\n"): (typeof documents)["\n  query FindRoom($roomId: ID!) {\n    findRoom(roomId: $roomId) {\n      id\n      isFree\n      code\n      equipment {\n        name\n      }\n      pictureUrl\n      isBookable\n      size\n      venue {\n        name\n      }\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BookingsByRoomAndUser($roomId: ID!, $userId: ID!, $status: BookingStatus) {\n    bookingsByRoomAndUser(roomId: $roomId, userId: $userId, status: $status) {\n      startDate\n      endDate\n      id\n    }\n  }\n"): (typeof documents)["\n  query BookingsByRoomAndUser($roomId: ID!, $userId: ID!, $status: BookingStatus) {\n    bookingsByRoomAndUser(roomId: $roomId, userId: $userId, status: $status) {\n      startDate\n      endDate\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BookingsByRoomAndDate($roomId: ID!, $startDate: Date!, $endDate: Date!) {\n    bookingsByRoomAndDate(roomId: $roomId, startDate: $startDate, endDate: $endDate) {\n      id\n      user {\n        familyName\n        givenName\n      }\n      endDate\n      startDate\n    }\n  }\n"): (typeof documents)["\n  query BookingsByRoomAndDate($roomId: ID!, $startDate: Date!, $endDate: Date!) {\n    bookingsByRoomAndDate(roomId: $roomId, startDate: $startDate, endDate: $endDate) {\n      id\n      user {\n        familyName\n        givenName\n      }\n      endDate\n      startDate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllVenues {\n    allVenues {\n      name\n      code\n    }\n  }\n"): (typeof documents)["\n  query AllVenues {\n    allVenues {\n      name\n      code\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllEquipment {\n    allEquipment {\n      name\n    }\n  }\n"): (typeof documents)["\n  query AllEquipment {\n    allEquipment {\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;