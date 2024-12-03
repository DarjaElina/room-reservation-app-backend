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
    "\n  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!, $title: String) {\n    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate, title: $title) {\n      title\n      id\n      startDate\n      endDate\n      user {\n        familyName\n        givenName\n      }\n      room {\n        code\n      }\n    }\n  }\n": types.CreateBookingDocument,
    "\n  mutation CancelBooking($bookingId: ID!) {\n    cancelBooking(bookingId: $bookingId) {\n      id\n      message\n    }\n  }\n": types.CancelBookingDocument,
    "\n  mutation UpdateBooking($bookingId: ID!, $startDate: Date!, $endDate: Date!, $title: String, $roomId: ID!) {\n    updateBooking(bookingId: $bookingId, startDate: $startDate, endDate: $endDate, title: $title, roomId: $roomId) {\n      id\n      message\n    }\n  }\n": types.UpdateBookingDocument,
    "\n  query CurrentUser {\n    currentUser {\n      username\n      id\n    }\n  }\n": types.CurrentUserDocument,
    " \n  query Rooms($startsAt: Date, $endsAt: Date, $venueIds: [ID!], $roomTypes: [RoomType!], $equipmentIds: [ID!], $searchKeyword: String, $isBookable: Boolean, $after: String, $first: Int) {\n    rooms(startsAt: $startsAt, endsAt: $endsAt, venueIds: $venueIds, roomTypes: $roomTypes, equipmentIds: $equipmentIds, searchKeyword: $searchKeyword, isBookable: $isBookable, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          code\n          equipment {\n            name\n            id\n          }\n          id\n          isFree\n          pictureUrl\n          size\n          venue {\n            name\n          }\n          description\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        startCursor\n      }\n    }\n  }\n": types.RoomsDocument,
    "\n  query FindRoom($roomId: ID!) {\n    findRoom(roomId: $roomId) {\n      id\n      isFree\n      code\n      equipment {\n        name\n        id\n      }\n      pictureUrl\n      isBookable\n      size\n      venue {\n        name\n      }\n      description\n    }\n  }\n": types.FindRoomDocument,
    "\n  query AllVenues($searchKeyword: String) {\n    allVenues(searchKeyword: $searchKeyword) {\n      name\n      code\n      id\n    }\n  }\n": types.AllVenuesDocument,
    "\n  query AllEquipment($searchKeyword: String) {\n    allEquipment(searchKeyword: $searchKeyword) {\n      name\n      id\n    }\n  }\n": types.AllEquipmentDocument,
    "\n  query Bookings($roomId: ID, $userId: ID, $status: BookingStatus, $startDate: Date, $endDate: Date) {\n    bookings(roomId: $roomId, userId: $userId, status: $status, startDate: $startDate, endDate: $endDate) {\n      title\n      endDate\n      id\n      startDate\n      user {\n        familyName\n        givenName\n      }\n      room {\n        code\n        id\n      }\n    }\n  }\n": types.BookingsDocument,
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
export function gql(source: "\n  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!, $title: String) {\n    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate, title: $title) {\n      title\n      id\n      startDate\n      endDate\n      user {\n        familyName\n        givenName\n      }\n      room {\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBooking($roomId: ID!, $startDate: Date!, $endDate: Date!, $title: String) {\n    createBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate, title: $title) {\n      title\n      id\n      startDate\n      endDate\n      user {\n        familyName\n        givenName\n      }\n      room {\n        code\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CancelBooking($bookingId: ID!) {\n    cancelBooking(bookingId: $bookingId) {\n      id\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation CancelBooking($bookingId: ID!) {\n    cancelBooking(bookingId: $bookingId) {\n      id\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBooking($bookingId: ID!, $startDate: Date!, $endDate: Date!, $title: String, $roomId: ID!) {\n    updateBooking(bookingId: $bookingId, startDate: $startDate, endDate: $endDate, title: $title, roomId: $roomId) {\n      id\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBooking($bookingId: ID!, $startDate: Date!, $endDate: Date!, $title: String, $roomId: ID!) {\n    updateBooking(bookingId: $bookingId, startDate: $startDate, endDate: $endDate, title: $title, roomId: $roomId) {\n      id\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CurrentUser {\n    currentUser {\n      username\n      id\n    }\n  }\n"): (typeof documents)["\n  query CurrentUser {\n    currentUser {\n      username\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \n  query Rooms($startsAt: Date, $endsAt: Date, $venueIds: [ID!], $roomTypes: [RoomType!], $equipmentIds: [ID!], $searchKeyword: String, $isBookable: Boolean, $after: String, $first: Int) {\n    rooms(startsAt: $startsAt, endsAt: $endsAt, venueIds: $venueIds, roomTypes: $roomTypes, equipmentIds: $equipmentIds, searchKeyword: $searchKeyword, isBookable: $isBookable, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          code\n          equipment {\n            name\n            id\n          }\n          id\n          isFree\n          pictureUrl\n          size\n          venue {\n            name\n          }\n          description\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)[" \n  query Rooms($startsAt: Date, $endsAt: Date, $venueIds: [ID!], $roomTypes: [RoomType!], $equipmentIds: [ID!], $searchKeyword: String, $isBookable: Boolean, $after: String, $first: Int) {\n    rooms(startsAt: $startsAt, endsAt: $endsAt, venueIds: $venueIds, roomTypes: $roomTypes, equipmentIds: $equipmentIds, searchKeyword: $searchKeyword, isBookable: $isBookable, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          code\n          equipment {\n            name\n            id\n          }\n          id\n          isFree\n          pictureUrl\n          size\n          venue {\n            name\n          }\n          description\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindRoom($roomId: ID!) {\n    findRoom(roomId: $roomId) {\n      id\n      isFree\n      code\n      equipment {\n        name\n        id\n      }\n      pictureUrl\n      isBookable\n      size\n      venue {\n        name\n      }\n      description\n    }\n  }\n"): (typeof documents)["\n  query FindRoom($roomId: ID!) {\n    findRoom(roomId: $roomId) {\n      id\n      isFree\n      code\n      equipment {\n        name\n        id\n      }\n      pictureUrl\n      isBookable\n      size\n      venue {\n        name\n      }\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllVenues($searchKeyword: String) {\n    allVenues(searchKeyword: $searchKeyword) {\n      name\n      code\n      id\n    }\n  }\n"): (typeof documents)["\n  query AllVenues($searchKeyword: String) {\n    allVenues(searchKeyword: $searchKeyword) {\n      name\n      code\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllEquipment($searchKeyword: String) {\n    allEquipment(searchKeyword: $searchKeyword) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  query AllEquipment($searchKeyword: String) {\n    allEquipment(searchKeyword: $searchKeyword) {\n      name\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Bookings($roomId: ID, $userId: ID, $status: BookingStatus, $startDate: Date, $endDate: Date) {\n    bookings(roomId: $roomId, userId: $userId, status: $status, startDate: $startDate, endDate: $endDate) {\n      title\n      endDate\n      id\n      startDate\n      user {\n        familyName\n        givenName\n      }\n      room {\n        code\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Bookings($roomId: ID, $userId: ID, $status: BookingStatus, $startDate: Date, $endDate: Date) {\n    bookings(roomId: $roomId, userId: $userId, status: $status, startDate: $startDate, endDate: $endDate) {\n      title\n      endDate\n      id\n      startDate\n      user {\n        familyName\n        givenName\n      }\n      room {\n        code\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;