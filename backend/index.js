const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

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
    findUser(username: String!): User
  }
`

const resolvers = {
  Query: {
    allUsers: () => users,
    findUser: (root, args) =>
      users.find(user => user.username === args.name)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})