/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  value: Scalars['String']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  endDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  room: Room;
  startDate: Scalars['Date']['output'];
  status: BookingStatus;
  title?: Maybe<Scalars['String']['output']>;
  user: User;
};

export enum BookingStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  CancelledLate = 'CANCELLED_LATE',
  Past = 'PAST'
}

export type Department = {
  __typename?: 'Department';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Faculty = {
  __typename?: 'Faculty';
  departments: Array<Department>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: UserResponse;
  addDepartmentToFaculty: Faculty;
  addEquipmentToRoom: Room;
  addUserToDepartment: Department;
  authenticate?: Maybe<AccessToken>;
  bulkCreateUsers?: Maybe<Array<Maybe<User>>>;
  cancelBooking: UserResponse;
  changePassword: UserResponse;
  createBooking: Booking;
  createDepartment: Department;
  createEquipment: Equipment;
  createFaculty: Faculty;
  createRoom: Room;
  createUser?: Maybe<User>;
  createVenue: Venue;
  deleteEquipment: Scalars['Boolean']['output'];
  deleteFaculty: Scalars['Boolean']['output'];
  deleteRoom: Scalars['Boolean']['output'];
  deleteUser: UserResponse;
  deleteVenue: Scalars['Boolean']['output'];
  removeDepartmentFromFaculty: Faculty;
  removeEquipmentFromRoom: Room;
  removeUserFromDepartment: Department;
  requestPasswordReset: UserResponse;
  resetPassword: UserResponse;
  setRoomBookableStatus: Room;
  updateBooking: UserResponse;
  updateDepartment: Department;
  updateEquipment: Equipment;
  updateFaculty: Faculty;
  updatePastBookings: UserResponse;
  updateRoom: Room;
  updateUser?: Maybe<User>;
  updateUserStatus?: Maybe<User>;
  updateVenue: Venue;
};


export type MutationActivateUserArgs = {
  activationToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationAddDepartmentToFacultyArgs = {
  departmentId: Scalars['ID']['input'];
  facultyId: Scalars['ID']['input'];
};


export type MutationAddEquipmentToRoomArgs = {
  equipmentIds: Array<Scalars['ID']['input']>;
  roomId: Scalars['ID']['input'];
};


export type MutationAddUserToDepartmentArgs = {
  departmentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAuthenticateArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationBulkCreateUsersArgs = {
  users: Array<UserInput>;
};


export type MutationCancelBookingArgs = {
  bookingId: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateBookingArgs = {
  endDate: Scalars['Date']['input'];
  roomId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateDepartmentArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateEquipmentArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateFacultyArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateRoomArgs = {
  code: Scalars['String']['input'];
  departmentId: Scalars['ID']['input'];
  equipmentIds: Array<Scalars['ID']['input']>;
  isBookable: Scalars['Boolean']['input'];
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  size: Scalars['Int']['input'];
  type: RoomType;
  venueId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationCreateVenueArgs = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteEquipmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFacultyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoomArgs = {
  roomId: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationDeleteVenueArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDepartmentFromFacultyArgs = {
  departmentId: Scalars['ID']['input'];
  facultyId: Scalars['ID']['input'];
};


export type MutationRemoveEquipmentFromRoomArgs = {
  equipmentIds: Array<Scalars['ID']['input']>;
  roomId: Scalars['ID']['input'];
};


export type MutationRemoveUserFromDepartmentArgs = {
  departmentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetRoomBookableStatusArgs = {
  isBookable: Scalars['Boolean']['input'];
  roomId: Scalars['ID']['input'];
};


export type MutationUpdateBookingArgs = {
  bookingId: Scalars['ID']['input'];
  endDate: Scalars['Date']['input'];
  roomId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDepartmentArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEquipmentArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateFacultyArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateRoomArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  equipmentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  isBookable?: InputMaybe<Scalars['Boolean']['input']>;
  pictureUrl?: InputMaybe<Scalars['String']['input']>;
  roomId: Scalars['ID']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<RoomType>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserStatusArgs = {
  status: UserStatus;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateVenueArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allDepartments: Array<Department>;
  allEquipment: Array<Equipment>;
  allFaculties: Array<Faculty>;
  allUsers: Array<User>;
  allVenues: Array<Venue>;
  bookings: Array<Booking>;
  currentUser?: Maybe<User>;
  findDepartment?: Maybe<Department>;
  findDepartmentByName: Array<Department>;
  findDepartmentsByFaculty: Array<Department>;
  findEquipment?: Maybe<Equipment>;
  findEquipmentByName: Array<Equipment>;
  findFaculty?: Maybe<Faculty>;
  findFacultyByName: Array<Faculty>;
  findRoom?: Maybe<Room>;
  findUser?: Maybe<User>;
  findUserByName?: Maybe<User>;
  findUsersByDepartment: Array<User>;
  findUsersByRole: Array<User>;
  findVenue?: Maybe<Venue>;
  findVenueByName: Array<Venue>;
  findVenuesByDepartment: Array<Venue>;
  rooms: RoomConnection;
};


export type QueryAllEquipmentArgs = {
  searchKeyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAllVenuesArgs = {
  searchKeyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBookingsArgs = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  roomId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<BookingStatus>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFindDepartmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindDepartmentByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindDepartmentsByFacultyArgs = {
  facultyId: Scalars['ID']['input'];
};


export type QueryFindEquipmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindEquipmentByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindFacultyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindFacultyByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindRoomArgs = {
  roomId: Scalars['ID']['input'];
};


export type QueryFindUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindUserByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindUsersByDepartmentArgs = {
  departmentId: Scalars['ID']['input'];
};


export type QueryFindUsersByRoleArgs = {
  role: UserRole;
};


export type QueryFindVenueArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindVenueByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryFindVenuesByDepartmentArgs = {
  departmentId: Scalars['ID']['input'];
};


export type QueryRoomsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['Date']['input']>;
  equipmentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isBookable?: InputMaybe<Scalars['Boolean']['input']>;
  roomTypes?: InputMaybe<Array<RoomType>>;
  searchKeyword?: InputMaybe<Scalars['String']['input']>;
  startsAt?: InputMaybe<Scalars['Date']['input']>;
  venueIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Room = {
  __typename?: 'Room';
  code: Scalars['String']['output'];
  department?: Maybe<Department>;
  description: Scalars['String']['output'];
  equipment?: Maybe<Array<Maybe<Equipment>>>;
  id: Scalars['ID']['output'];
  isBookable: Scalars['Boolean']['output'];
  isFree?: Maybe<Scalars['Boolean']['output']>;
  pictureUrl?: Maybe<Scalars['String']['output']>;
  size: Scalars['Int']['output'];
  type: RoomType;
  venue: Venue;
};

export type RoomConnection = {
  __typename?: 'RoomConnection';
  edges: Array<Maybe<RoomEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomEdge = {
  __typename?: 'RoomEdge';
  cursor: Scalars['String']['output'];
  node: Room;
};

export enum RoomType {
  AdministrativeSpace = 'ADMINISTRATIVE_SPACE',
  Classroom = 'CLASSROOM',
  ConcertHall = 'CONCERT_HALL',
  Library = 'LIBRARY',
  MeetingRoom = 'MEETING_ROOM',
  PracticeRoom = 'PRACTICE_ROOM',
  Studio = 'STUDIO',
  Theater = 'THEATER'
}

export enum TokenType {
  Activation = 'ACTIVATION',
  PasswordReset = 'PASSWORD_RESET'
}

export type User = {
  __typename?: 'User';
  department: Department;
  email: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  status: UserStatus;
  userNumber: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  departmentId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  role: UserRole;
  status: UserStatus;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Pending = 'PENDING'
}

export type Venue = {
  __typename?: 'Venue';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AuthenticateMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate?: { __typename?: 'AccessToken', value: string } | null };

export type CreateBookingMutationVariables = Exact<{
  roomId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', title?: string | null, id: string, startDate: any, endDate: any, user: { __typename?: 'User', familyName: string, givenName: string }, room: { __typename?: 'Room', code: string } } };

export type CancelBookingMutationVariables = Exact<{
  bookingId: Scalars['ID']['input'];
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', cancelBooking: { __typename?: 'UserResponse', id?: string | null, message?: string | null } };

export type UpdateBookingMutationVariables = Exact<{
  bookingId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
  endDate: Scalars['Date']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  roomId: Scalars['ID']['input'];
}>;


export type UpdateBookingMutation = { __typename?: 'Mutation', updateBooking: { __typename?: 'UserResponse', id?: string | null, message?: string | null } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', username: string, id: string } | null };

export type RoomsQueryVariables = Exact<{
  startsAt?: InputMaybe<Scalars['Date']['input']>;
  endsAt?: InputMaybe<Scalars['Date']['input']>;
  venueIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  roomTypes?: InputMaybe<Array<RoomType> | RoomType>;
  equipmentIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  searchKeyword?: InputMaybe<Scalars['String']['input']>;
  isBookable?: InputMaybe<Scalars['Boolean']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RoomsQuery = { __typename?: 'Query', rooms: { __typename?: 'RoomConnection', edges: Array<{ __typename?: 'RoomEdge', cursor: string, node: { __typename?: 'Room', code: string, id: string, isFree?: boolean | null, pictureUrl?: string | null, size: number, description: string, equipment?: Array<{ __typename?: 'Equipment', name: string, id: string } | null> | null, venue: { __typename?: 'Venue', name: string } } } | null>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, startCursor?: string | null } } };

export type FindRoomQueryVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type FindRoomQuery = { __typename?: 'Query', findRoom?: { __typename?: 'Room', id: string, isFree?: boolean | null, code: string, pictureUrl?: string | null, isBookable: boolean, size: number, description: string, equipment?: Array<{ __typename?: 'Equipment', name: string, id: string } | null> | null, venue: { __typename?: 'Venue', name: string } } | null };

export type AllVenuesQueryVariables = Exact<{
  searchKeyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type AllVenuesQuery = { __typename?: 'Query', allVenues: Array<{ __typename?: 'Venue', name: string, code: string, id: string }> };

export type AllEquipmentQueryVariables = Exact<{
  searchKeyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type AllEquipmentQuery = { __typename?: 'Query', allEquipment: Array<{ __typename?: 'Equipment', name: string, id: string }> };

export type BookingsQueryVariables = Exact<{
  roomId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<BookingStatus>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
}>;


export type BookingsQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', title?: string | null, endDate: any, id: string, startDate: any, user: { __typename?: 'User', familyName: string, givenName: string }, room: { __typename?: 'Room', code: string, id: string } }> };


export const AuthenticateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Authenticate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<AuthenticateMutation, AuthenticateMutationVariables>;
export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const CancelBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CancelBookingMutation, CancelBookingMutationVariables>;
export const UpdateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateBookingMutation, UpdateBookingMutationVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const RoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Rooms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startsAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endsAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"venueIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomTypes"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoomType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipmentIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isBookable"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rooms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startsAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startsAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"endsAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endsAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"venueIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"venueIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"roomTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"equipmentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipmentIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchKeyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"isBookable"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isBookable"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFree"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"venue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<RoomsQuery, RoomsQueryVariables>;
export const FindRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isFree"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isBookable"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"venue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<FindRoomQuery, FindRoomQueryVariables>;
export const AllVenuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllVenues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allVenues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchKeyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AllVenuesQuery, AllVenuesQueryVariables>;
export const AllEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchKeyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchKeyword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AllEquipmentQuery, AllEquipmentQueryVariables>;
export const BookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bookings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BookingStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<BookingsQuery, BookingsQueryVariables>;