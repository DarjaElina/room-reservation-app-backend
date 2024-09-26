const { users, locations, rooms, bookings } = require('./db/data')

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

  
}

module.exports = resolvers