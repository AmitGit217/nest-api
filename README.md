# Nest-api 📝

## Project overview 🚀

I wanted to get better at back-end development so I created a CRUD application using nest.js framework

## User overview 🧑

- Controllers: Get current user `/users/me`, Edit specific user by JWT authentication `/users`
- Services: Edit the user with `prisma.update({})` using SQL query and async method.

## Bookmark overview 📚

**Note that all those actions are guarded using a nest JWT decorator**

- Controllers:
  - POST a bookmark
  - GET all bookmarks
  - GET a bookmark by id
  - PATCH a bookmark by id
  - DELETE a book mark by id

**Services**

- The services are in charge of the application buissness logic and ORM communicication with the PostgreSQL database

## Auth overview 🔐

- Controllers:
  - Signup
  - Login

The services of our auth has created the JWT guard decorator for our next protected routes actions.

## Implementations and technologies

- Test-Driven-Development with E2E automatic tests.
- Docker, NestJS, Prisma, PostgreSQL, AWS, and Linux Ubuntu 20.04.

## How to run on your machine as production

- Git clone the repository
- Make sure you have .env file with those parameters:
  - `DATABASE_URL = "postgresql://postgres:postgres@db:5432/nest?schema=public"`
  - `JWT_SECRET = "your-secret"`
- In the folder run `docker-compose build`
- Then run `docker-compose up` this will start the app and the database at once.
- Then we need to migrate our prisma with the database so we are getting into the container shell with `docker -it <container-name> sh`
- In the shell run `npx prisma migrate deploy` then `pm2 save` and `exit` to get out from the shell.
- That's it your container is running !

## How to test on your machine

- After you clone the repo just run `npm run db:test:restart` that will clean your temporery database and start running it.
- Then run `npm run db:test:prisma` that will connect you prisma to the database using the `.env.tst` file so you will have a different database.
- After all this run `npm run test:e2e` and you will see all the E2E tests running.

The api is hosted in AWS as a docker container using Ubuntu 20.04 VM.
http://3.112.60.224:3000
