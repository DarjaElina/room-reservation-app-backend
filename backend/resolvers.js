const resolvers = {
  Query: {
    allUsers: () => users,
    findUser: (root, args) =>
      users.find(user => user.id === args.id),

    allLocations: () => locations,
    findLocation: (root, args) =>
      locations.find(location => location.id === args.id),

    allRooms: () => rooms,
    findRoom: (root, args) =>
      rooms.find(room => room.id === args.id),

    allBookings: () => bookings,
  },

  User: {
    bookings: (root) => bookings.filter(booking => booking.user.id === root.id)
  },

  Location: {
    rooms: (root) => rooms.filter(room => room.location.id === root.id)
  },
  

  Mutation: {
    createUser: (root, args) => {
      const id = +users[users.length - 1].id + 1
      const user = { ...args, id }
      users.push(user)
      return user
    }

  }
}


module.exports = resolvers