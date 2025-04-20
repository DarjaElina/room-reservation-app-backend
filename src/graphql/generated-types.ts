import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { CustomPageInfo } from '../types/pagination.types';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  bookingTime: Array<BookingTimeItem>;
  id: Scalars['ID']['output'];
  room: Room;
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

export type BookingTimeItem = {
  __typename?: 'BookingTimeItem';
  inclusive?: Maybe<Scalars['Boolean']['output']>;
  value: Scalars['Date']['output'];
};

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

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: UserResponse;
  authenticate: AuthResponse;
  cancelBooking: UserResponse;
  createBooking: Booking;
  refreshToken: RefreshTokenResponse;
  signupRequest: UserResponse;
  updateBooking: Booking;
  updatePastBookings: UserResponse;
};


export type MutationActivateUserArgs = {
  activationToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationAuthenticateArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCancelBookingArgs = {
  bookingId: Scalars['ID']['input'];
};


export type MutationCreateBookingArgs = {
  bookingTime: Array<Scalars['Date']['input']>;
  roomId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationSignupRequestArgs = {
  userInput: UserInput;
};


export type MutationUpdateBookingArgs = {
  bookingId: Scalars['ID']['input'];
  bookingTime: Array<Scalars['Date']['input']>;
  roomId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
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
  allEquipment: Array<Equipment>;
  allVenues: Array<Venue>;
  bookings: Array<Booking>;
  checkActivationToken: Scalars['Boolean']['output'];
  currentUser?: Maybe<User>;
  findRoom?: Maybe<Room>;
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


export type QueryCheckActivationTokenArgs = {
  activationToken: Scalars['String']['input'];
};


export type QueryFindRoomArgs = {
  roomId: Scalars['ID']['input'];
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

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type Room = {
  __typename?: 'Room';
  code: Scalars['String']['output'];
  department?: Maybe<Department>;
  description: Scalars['String']['output'];
  equipment: Array<Equipment>;
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
  edges: Array<RoomEdge>;
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
  message: Scalars['String']['output'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Booking: ResolverTypeWrapper<Booking>;
  BookingStatus: BookingStatus;
  BookingTimeItem: ResolverTypeWrapper<BookingTimeItem>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Department: ResolverTypeWrapper<Department>;
  Equipment: ResolverTypeWrapper<Equipment>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<CustomPageInfo>;
  Query: ResolverTypeWrapper<{}>;
  RefreshTokenResponse: ResolverTypeWrapper<RefreshTokenResponse>;
  Room: ResolverTypeWrapper<Room>;
  RoomConnection: ResolverTypeWrapper<Omit<RoomConnection, 'pageInfo'> & { pageInfo: ResolversTypes['PageInfo'] }>;
  RoomEdge: ResolverTypeWrapper<RoomEdge>;
  RoomType: RoomType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserRole: UserRole;
  UserStatus: UserStatus;
  Venue: ResolverTypeWrapper<Venue>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthResponse: AuthResponse;
  Booking: Booking;
  BookingTimeItem: BookingTimeItem;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Department: Department;
  Equipment: Equipment;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: CustomPageInfo;
  Query: {};
  RefreshTokenResponse: RefreshTokenResponse;
  Room: Room;
  RoomConnection: Omit<RoomConnection, 'pageInfo'> & { pageInfo: ResolversParentTypes['PageInfo'] };
  RoomEdge: RoomEdge;
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
  UserResponse: UserResponse;
  Venue: Venue;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  bookingTime?: Resolver<Array<ResolversTypes['BookingTimeItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['BookingStatus'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingTimeItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookingTimeItem'] = ResolversParentTypes['BookingTimeItem']> = {
  inclusive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DepartmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Department'] = ResolversParentTypes['Department']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  activateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationActivateUserArgs, 'activationToken' | 'newPassword'>>;
  authenticate?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationAuthenticateArgs, 'password' | 'username'>>;
  cancelBooking?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationCancelBookingArgs, 'bookingId'>>;
  createBooking?: Resolver<ResolversTypes['Booking'], ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'bookingTime' | 'roomId'>>;
  refreshToken?: Resolver<ResolversTypes['RefreshTokenResponse'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'token'>>;
  signupRequest?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationSignupRequestArgs, 'userInput'>>;
  updateBooking?: Resolver<ResolversTypes['Booking'], ParentType, ContextType, RequireFields<MutationUpdateBookingArgs, 'bookingId' | 'bookingTime' | 'roomId'>>;
  updatePastBookings?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allEquipment?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType, Partial<QueryAllEquipmentArgs>>;
  allVenues?: Resolver<Array<ResolversTypes['Venue']>, ParentType, ContextType, Partial<QueryAllVenuesArgs>>;
  bookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType, Partial<QueryBookingsArgs>>;
  checkActivationToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckActivationTokenArgs, 'activationToken'>>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  findRoom?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryFindRoomArgs, 'roomId'>>;
  rooms?: Resolver<ResolversTypes['RoomConnection'], ParentType, ContextType, Partial<QueryRoomsArgs>>;
};

export type RefreshTokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RefreshTokenResponse'] = ResolversParentTypes['RefreshTokenResponse']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['Department']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  equipment?: Resolver<Array<ResolversTypes['Equipment']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isBookable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFree?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RoomType'], ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['Venue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoomConnection'] = ResolversParentTypes['RoomConnection']> = {
  edges?: Resolver<Array<ResolversTypes['RoomEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoomEdge'] = ResolversParentTypes['RoomEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  department?: Resolver<ResolversTypes['Department'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  middleName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  userNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VenueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Venue'] = ResolversParentTypes['Venue']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  BookingTimeItem?: BookingTimeItemResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Department?: DepartmentResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RefreshTokenResponse?: RefreshTokenResponseResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomConnection?: RoomConnectionResolvers<ContextType>;
  RoomEdge?: RoomEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  Venue?: VenueResolvers<ContextType>;
};

