# Kanban using React-DnD (Full Stack)

Features:

1. Full fledge full stack system.
2. Persistent storage made using PostgreSQL.
3. Persistent task order support.
4. Multiple column creation and deletion support. (➕ / ❌)
5. Multiple board creation and deletion support. (➕ / ❌)
6. Drag and drop support for column. (🔥)
7. Update the task, column name and board name support.

## A full demo of the application

https://youtu.be/bFNpX-Zy0p8

## How to run

Make sure you have the `NodeJS` and a package manager `(YARN or NPM)` before proceeding further.

There are two parts of the project.

1. client-side
2. server-side

- To install all the dependencies used for both the client and server, type;

  ```sh
  $ npm install
  $ npm
  ```

  ###### or

  ```sh
  $ yarn
  $ yarn
  ```

- The client does not necessarily need to do anything.

- The server side, however, since it is a full stack application and uses [PostgreSQL](https://www.postgresql.org/) as the database and [Prisma](https://www.prisma.io/) as ORM, you need to create a `.env` file in the root of the server folder and append the following environment variable to it.

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
