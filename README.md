# Kanban using React-DnD (Full Stack)

This is a sample of the Kanban board with drag and drop functionality and full backend support to save the data
persistently.

The design of the board is taking from the [Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB).

Features:

1. Full fledge full stack system.
2. Persistent storage using PostgreSQL.
3. Persistent task order support.
4. Multiple column creation and deletion support.
5. Multiple board creation and deletion support.
6. Drag and drop support for column.
7. Update the task, column name and board name support.

## Demo / walk-through of the application

https://youtu.be/bFNpX-Zy0p8

## Tech stack used

1. [NodeJS](https://nodejs.org/en) - an open-source, cross-platform JavaScript runtime environment.
2. [React](https://react.dev/) - The library for web and native user interfaces.
3. [TypeScript](https://www.typescriptlang.org/) - A typed JavaScript.
4. [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database.
5. [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.

## How to run

Make sure you have the `NodeJS` and a package manager `(YARN or NPM)` before proceeding further.

There are two parts of the project.

1. client-side
2. server-side

- To install all the dependencies used for both the client and server, type;

  ```sh
  $ npm install
  # or
  $ npm
  ```

  ###### or

  ```sh
  $ yarn
  # or
  $ yarn
  ```

- The client does not necessarily need to do anything.

- The server side, however, since it is a full stack application and uses PostgreSQL as the database and [Prisma](https://www.prisma.io/) as ORM, you need to create a `.env` file in the root of the server folder and append the following environment variable to it.

  `.env`

  ```js
  DATABASE_URL = YOUR_DATABASE_CONNECTION_URL;
  ```

  To get more info on how environment variables work with Prisma and setup your own, please click [here](https://www.prisma.io/docs/guides/development-environment/environment-variables).

- Now split your terminal into two parts, one for the client and one for the server.
  In the server terminal type: -

  ```
  sh $ npm run devStart
  ```

  In the client terminal type: -

  ```
  sh $ npm run dev
  ```

- This should start the server on `port 3000` and for the client it should start on `port 5173`.

- Open http://localhost:5173/ with your browser to see the result.

## Future work

1. Use type frequently in the client.
2. Make code as efficient as possible.
3. Update task is still buggy.
4. Host on the cloud.
5. Add multiple user support.
6. Add authentication.
7. Make mobile responsive.
8. Add dark and light mode support.
