## Booking App

This is a final project implemented for Full Stack Open Course at Helsinki University.

This application is a booking platform designed for conservatory students and teachers, allowing to book different study facilities, such as practice rooms, classrooms etc.

This repo contains backend part of the application, developed with Typescript, Node.js, GraphQL and PostgreSQL

Technologies used:
Umzug for seeders and migrations
Fly.io for deployment
JWT authentication
Zod for validation
Dockerized development environment
Sequelize-typescript for managing Postgres stuff
GitHub actions for CI/CD
NodeMailer for sending acount activation emails
- Deployment to prod
- Deployment to staging

Steps to open the project:
### Using Docker
1) Clone the repo
2) Navigate to project dir
3) docker compose -f docker-compose.dev.yml up
4) open the localhost:4000

### Using local dev environment

1) Clone the repo
2) Navigate to project dir
3) npm install
4) open the localhost:4000