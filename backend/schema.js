const typeDefs = `

  enum Role {
    ADMIN
    USER
    MANAGER
  }

  enum Responsibility {
    STUDENT
    TEACHER
    BOOKING_AGENT
  }
  
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: Role!
    responsibility: Responsibility!
    bookings: [Booking!]!
  }

  type Room {
    id: ID!
    location: Location!
    code: String!
    type: String!
    size: Int!
    equipment: [String!]!
  }

  type Location {
    id: ID!
    code: String!
    name: String!
    rooms: [Room!]!
  }

  scalar Date

  type Booking {
    id: ID!
    startDate: Date!
    endDate: Date!
    location: Location!
    room: Room!
    user: User!
  }

  type Query {
    allUsers: [User!]!
    findUser(id: ID!): User

    allLocations: [Location!]!
    findLocation(id: ID!): Location

    allRooms: [Room]!
    findRoom(id: ID!): Room!

    allBookings: [Booking]!
  }
`

module.exports = typeDefs