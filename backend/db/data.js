const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@example.com',
    role: 'USER',
    responsibility: 'STUDENT'
  },
  {
    id: '2',
    name: 'Bob Smith',
    username: 'bobsmith',
    email: 'bob@example.com',
    role: 'MANAGER',
    responsibility: 'BOOKING_AGENT'
  },
  {
    id: '3',
    name: 'Clara Davis',
    username: 'clarad',
    email: 'clara@example.com',
    role: 'ADMIN',
    responsibility: 'TEACHER'
  }
]

const locations = [
  {
    id: '1',
    code: 'LOC001',
    name: 'Main Building',
    rooms: []
  },
  {
    id: '2',
    code: 'LOC002',
    name: 'West Wing',
    rooms: []
  }
]

const rooms = [
  {
    id: '101',
    location: locations[0],
    code: 'ROOM001',
    type: 'Classroom',
    size: 30,
    equipment: ['Projector', 'Whiteboard']
  },
  {
    id: '102',
    location: locations[1],
    code: 'ROOM002',
    type: 'Practice Room',
    size: 10,
    equipment: ['Piano', 'Music Stand']
  }
]

const bookings = [
  {
    id: 'B001',
    startDate: new Date('2024-09-25T10:00:00'),
    endDate: new Date('2024-09-25T12:00:00'),
    location: locations[0],
    room: rooms[0],
    user: users[0]
  },
  {
    id: 'B002',
    startDate: new Date('2024-09-26T14:00:00'),
    endDate: new Date('2024-09-26T16:00:00'),
    location: locations[1],
    room: rooms[1],
    user: users[1]
  }
]

module.exports = {
  users,
  locations,
  rooms,
  bookings
}
