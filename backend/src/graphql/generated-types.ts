import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { CustomPageInfo } from '../types/pagination.types';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: Date; output: Date };
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
  user: User;
};

export enum BookingStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  CancelledLate = 'CANCELLED_LATE',
  Past = 'PAST',
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
  updateBooking?: Maybe<Booking>;
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
  startDate: Scalars['Date']['input'];
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
  allBookings: Array<Booking>;
  allDepartments: Array<Department>;
  allEquipment: Array<Equipment>;
  allFaculties: Array<Faculty>;
  allUsers: Array<User>;
  allVenues: Array<Venue>;
  bookingsByDateRange: Array<Booking>;
  bookingsByRoom: Array<Booking>;
  bookingsByRoomAndDate: Array<Booking>;
  bookingsByRoomAndUser: Array<Booking>;
  bookingsByUser: Array<Booking>;
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

export type QueryBookingsByDateRangeArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type QueryBookingsByRoomArgs = {
  roomId: Scalars['ID']['input'];
};

export type QueryBookingsByRoomAndDateArgs = {
  endDate: Scalars['Date']['input'];
  roomId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
};

export type QueryBookingsByRoomAndUserArgs = {
  roomId: Scalars['ID']['input'];
  status?: InputMaybe<BookingStatus>;
  userId: Scalars['ID']['input'];
};

export type QueryBookingsByUserArgs = {
  userId: Scalars['ID']['input'];
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
  Theater = 'THEATER',
}

export enum TokenType {
  Activation = 'ACTIVATION',
  PasswordReset = 'PASSWORD_RESET',
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
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Student = 'STUDENT',
  Teacher = 'TEACHER',
}

export enum UserStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Pending = 'PENDING',
}

export type Venue = {
  __typename?: 'Venue';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessToken: ResolverTypeWrapper<AccessToken>;
  Booking: ResolverTypeWrapper<Booking>;
  BookingStatus: BookingStatus;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Department: ResolverTypeWrapper<Department>;
  Equipment: ResolverTypeWrapper<Equipment>;
  Faculty: ResolverTypeWrapper<Faculty>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<CustomPageInfo>;
  Query: ResolverTypeWrapper<{}>;
  Room: ResolverTypeWrapper<Room>;
  RoomConnection: ResolverTypeWrapper<
    Omit<RoomConnection, 'pageInfo'> & { pageInfo: ResolversTypes['PageInfo'] }
  >;
  RoomEdge: ResolverTypeWrapper<RoomEdge>;
  RoomType: RoomType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TokenType: TokenType;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserRole: UserRole;
  UserStatus: UserStatus;
  Venue: ResolverTypeWrapper<Venue>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessToken: AccessToken;
  Booking: Booking;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Department: Department;
  Equipment: Equipment;
  Faculty: Faculty;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: CustomPageInfo;
  Query: {};
  Room: Room;
  RoomConnection: Omit<RoomConnection, 'pageInfo'> & {
    pageInfo: ResolversParentTypes['PageInfo'];
  };
  RoomEdge: RoomEdge;
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
  UserResponse: UserResponse;
  Venue: Venue;
};

export type AccessTokenResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AccessToken'] = ResolversParentTypes['AccessToken'],
> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Booking'] = ResolversParentTypes['Booking'],
> = {
  endDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['BookingStatus'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DepartmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Department'] = ResolversParentTypes['Department'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FacultyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Faculty'] = ResolversParentTypes['Faculty'],
> = {
  departments?: Resolver<
    Array<ResolversTypes['Department']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  activateUser?: Resolver<
    ResolversTypes['UserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationActivateUserArgs, 'activationToken' | 'newPassword'>
  >;
  addDepartmentToFaculty?: Resolver<
    ResolversTypes['Faculty'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddDepartmentToFacultyArgs,
      'departmentId' | 'facultyId'
    >
  >;
  addEquipmentToRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<MutationAddEquipmentToRoomArgs, 'equipmentIds' | 'roomId'>
  >;
  addUserToDepartment?: Resolver<
    ResolversTypes['Department'],
    ParentType,
    ContextType,
    RequireFields<MutationAddUserToDepartmentArgs, 'departmentId' | 'userId'>
  >;
  authenticate?: Resolver<
    Maybe<ResolversTypes['AccessToken']>,
    ParentType,
    ContextType,
    RequireFields<MutationAuthenticateArgs, 'password' | 'username'>
  >;
  bulkCreateUsers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    RequireFields<MutationBulkCreateUsersArgs, 'users'>
  >;
  cancelBooking?: Resolver<
    ResolversTypes['UserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCancelBookingArgs, 'bookingId'>
  >;
  changePassword?: Resolver<
    ResolversTypes['UserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationChangePasswordArgs, 'newPassword' | 'oldPassword'>
  >;
  createBooking?: Resolver<
    ResolversTypes['Booking'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBookingArgs, 'endDate' | 'roomId' | 'startDate'>
  >;
  createDepartment?: Resolver<
    ResolversTypes['Department'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateDepartmentArgs, 'name'>
  >;
  createEquipment?: Resolver<
    ResolversTypes['Equipment'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEquipmentArgs, 'name'>
  >;
  createFaculty?: Resolver<
    ResolversTypes['Faculty'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateFacultyArgs, 'name'>
  >;
  createRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateRoomArgs,
      | 'code'
      | 'departmentId'
      | 'equipmentIds'
      | 'isBookable'
      | 'size'
      | 'type'
      | 'venueId'
    >
  >;
  createUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'userInput'>
  >;
  createVenue?: Resolver<
    ResolversTypes['Venue'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateVenueArgs, 'code' | 'name'>
  >;
  deleteEquipment?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteEquipmentArgs, 'id'>
  >;
  deleteFaculty?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFacultyArgs, 'id'>
  >;
  deleteRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRoomArgs, 'roomId'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['UserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'userId'>
  >;
  deleteVenue?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteVenueArgs, 'id'>
  >;
  removeDepartmentFromFaculty?: Resolver<
    ResolversTypes['Faculty'],
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveDepartmentFromFacultyArgs,
      'departmentId' | 'facultyId'
    >
  >;
  removeEquipmentFromRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveEquipmentFromRoomArgs,
      'equipmentIds' | 'roomId'
    >
  >;
  removeUserFromDepartment?: Resolver<
    ResolversTypes['Department'],
    ParentType,
    ContextType,
    RequireFields<
      MutationRemoveUserFromDepartmentArgs,
      'departmentId' | 'userId'
    >
  >;
  requestPasswordReset?: Resolver<
    ResolversTypes['UserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRequestPasswordResetArgs, 'email'>
  >;
  resetPassword?: Resolver<
    ResolversTypes['UserResponse'],
    ParentType,
    ContextType,
    RequireFields<
      MutationResetPasswordArgs,
      'newPassword' | 'oldPassword' | 'token'
    >
  >;
  setRoomBookableStatus?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<MutationSetRoomBookableStatusArgs, 'isBookable' | 'roomId'>
  >;
  updateBooking?: Resolver<
    Maybe<ResolversTypes['Booking']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateBookingArgs,
      'bookingId' | 'endDate' | 'startDate'
    >
  >;
  updateDepartment?: Resolver<
    ResolversTypes['Department'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDepartmentArgs, 'id'>
  >;
  updateEquipment?: Resolver<
    ResolversTypes['Equipment'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEquipmentArgs, 'id' | 'name'>
  >;
  updateFaculty?: Resolver<
    ResolversTypes['Faculty'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateFacultyArgs, 'id' | 'name'>
  >;
  updatePastBookings?: Resolver<
    ResolversTypes['UserResponse'],
    ParentType,
    ContextType
  >;
  updateRoom?: Resolver<
    ResolversTypes['Room'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoomArgs, 'roomId'>
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'userId'>
  >;
  updateUserStatus?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserStatusArgs, 'status' | 'userId'>
  >;
  updateVenue?: Resolver<
    ResolversTypes['Venue'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateVenueArgs, 'id'>
  >;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo'],
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  allBookings?: Resolver<
    Array<ResolversTypes['Booking']>,
    ParentType,
    ContextType
  >;
  allDepartments?: Resolver<
    Array<ResolversTypes['Department']>,
    ParentType,
    ContextType
  >;
  allEquipment?: Resolver<
    Array<ResolversTypes['Equipment']>,
    ParentType,
    ContextType,
    Partial<QueryAllEquipmentArgs>
  >;
  allFaculties?: Resolver<
    Array<ResolversTypes['Faculty']>,
    ParentType,
    ContextType
  >;
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  allVenues?: Resolver<
    Array<ResolversTypes['Venue']>,
    ParentType,
    ContextType,
    Partial<QueryAllVenuesArgs>
  >;
  bookingsByDateRange?: Resolver<
    Array<ResolversTypes['Booking']>,
    ParentType,
    ContextType,
    RequireFields<QueryBookingsByDateRangeArgs, 'endDate' | 'startDate'>
  >;
  bookingsByRoom?: Resolver<
    Array<ResolversTypes['Booking']>,
    ParentType,
    ContextType,
    RequireFields<QueryBookingsByRoomArgs, 'roomId'>
  >;
  bookingsByRoomAndDate?: Resolver<
    Array<ResolversTypes['Booking']>,
    ParentType,
    ContextType,
    RequireFields<
      QueryBookingsByRoomAndDateArgs,
      'endDate' | 'roomId' | 'startDate'
    >
  >;
  bookingsByRoomAndUser?: Resolver<
    Array<ResolversTypes['Booking']>,
    ParentType,
    ContextType,
    RequireFields<QueryBookingsByRoomAndUserArgs, 'roomId' | 'userId'>
  >;
  bookingsByUser?: Resolver<
    Array<ResolversTypes['Booking']>,
    ParentType,
    ContextType,
    RequireFields<QueryBookingsByUserArgs, 'userId'>
  >;
  currentUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  findDepartment?: Resolver<
    Maybe<ResolversTypes['Department']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindDepartmentArgs, 'id'>
  >;
  findDepartmentByName?: Resolver<
    Array<ResolversTypes['Department']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindDepartmentByNameArgs, 'name'>
  >;
  findDepartmentsByFaculty?: Resolver<
    Array<ResolversTypes['Department']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindDepartmentsByFacultyArgs, 'facultyId'>
  >;
  findEquipment?: Resolver<
    Maybe<ResolversTypes['Equipment']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindEquipmentArgs, 'id'>
  >;
  findEquipmentByName?: Resolver<
    Array<ResolversTypes['Equipment']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindEquipmentByNameArgs, 'name'>
  >;
  findFaculty?: Resolver<
    Maybe<ResolversTypes['Faculty']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindFacultyArgs, 'id'>
  >;
  findFacultyByName?: Resolver<
    Array<ResolversTypes['Faculty']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindFacultyByNameArgs, 'name'>
  >;
  findRoom?: Resolver<
    Maybe<ResolversTypes['Room']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindRoomArgs, 'roomId'>
  >;
  findUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindUserArgs, 'id'>
  >;
  findUserByName?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindUserByNameArgs, 'name'>
  >;
  findUsersByDepartment?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindUsersByDepartmentArgs, 'departmentId'>
  >;
  findUsersByRole?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindUsersByRoleArgs, 'role'>
  >;
  findVenue?: Resolver<
    Maybe<ResolversTypes['Venue']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindVenueArgs, 'id'>
  >;
  findVenueByName?: Resolver<
    Array<ResolversTypes['Venue']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindVenueByNameArgs, 'name'>
  >;
  findVenuesByDepartment?: Resolver<
    Array<ResolversTypes['Venue']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindVenuesByDepartmentArgs, 'departmentId'>
  >;
  rooms?: Resolver<
    ResolversTypes['RoomConnection'],
    ParentType,
    ContextType,
    Partial<QueryRoomsArgs>
  >;
};

export type RoomResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Room'] = ResolversParentTypes['Room'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  department?: Resolver<
    Maybe<ResolversTypes['Department']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  equipment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Equipment']>>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isBookable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFree?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pictureUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RoomType'], ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['Venue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomConnectionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['RoomConnection'] = ResolversParentTypes['RoomConnection'],
> = {
  edges?: Resolver<
    Array<Maybe<ResolversTypes['RoomEdge']>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomEdgeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['RoomEdge'] = ResolversParentTypes['RoomEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  department?: Resolver<ResolversTypes['Department'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  middleName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  userNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse'],
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VenueResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Venue'] = ResolversParentTypes['Venue'],
> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccessToken?: AccessTokenResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Department?: DepartmentResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  Faculty?: FacultyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomConnection?: RoomConnectionResolvers<ContextType>;
  RoomEdge?: RoomEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  Venue?: VenueResolvers<ContextType>;
};
