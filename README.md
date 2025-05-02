## 🎻 Room Reservation App 

This is a final project implemented for the [Full Stack Open course](https://fullstackopen.com/en/) at the [University of Helsinki](https://www.helsinki.fi/en).

This project is a full-stack application designed for music school students and teachers. It allows users to book different study facilities such as practice rooms, classrooms, and more.

This repository contains the backend part of the application, developed with TypeScript, Node.js, GraphQL, and PostgreSQL.

#### Links to other parts of the project:

- Frontend repo: https://github.com/DarjaElina/room-reservation-app
- Account activation page repo: https://github.com/DarjaElina/account-activation-page

#### ⏰ Work hours 

[Link to work hours listing](https://github.com/DarjaElina/room-reservation-app-backend/blob/main/workHours.md)

### ✨ Features

- [JWT](https://www.npmjs.com/package/jsonwebtoken) authentication (access and refresh tokens)
- Email account activation via [NodeMailer](https://www.nodemailer.com/)
- [Zod-based](https://zod.dev/) schema validation
- [Sequelize](https://sequelize.org/) + [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript) for PostgreSQL ORM
- Database migrations and seeders via [Umzug](https://www.npmjs.com/package/umzug/v/3.0.0-beta.6)
- CI/CD with [GitHub Actions](https://github.com/features/actions)
- Testing with [Jest](https://jestjs.io/)
- [Dockerized](https://www.docker.com/) development environment
- [Fly.io](https://fly.io/) for deployment

### 🏁 Getting Started

#### 🐳 Easiest: Run with Docker

``` bash
git clone https://github.com/DarjaElina/room-reservation-app-backend.git
cd room-reservation-app-backend
docker compose -f docker-compose.dev.yml up
```

#### 🧑‍💻 Option 2: Run locally (❗️ note that you will need a running PostgreSQL instance for that)

``` bash
git clone https://github.com/DarjaElina/room-reservation-app-backend.git
cd room-reservation-app-backend
npm install
DATABASE_URL=<your_database_url> npm run dev 
```
App will be available at: http://localhost:4000 (Apollo Sandbox 🌠)

### Deployment

- The deployed production backend lives at https://room-reservation-app.fly.dev/
- Staging backend: used for automated testing during CI — deployed separately to simplify testing setup in GitHub Actions

### 🧡 Acknoledgments

I would like to express my deepest appreciation to the creators of [Full Stack Open](https://fullstackopen.com/en/). Thank you for this incredibly valuable, practical, and inspiring course. It’s been a joy to learn through it! 🧡✨








