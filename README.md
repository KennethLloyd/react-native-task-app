# react-native-graphql-starter

React Native App with Express GraphQL Boilerplate

Requirements:

1. MySQL 5.7+
2. Node 14+

To setup in a new local environment and open the web app:

1. Make sure you have the correct Node version

```sh
$ nvm use
```

2. Install dependencies

```sh
$ npm install
```

3. Go to `/server` and setup environment variables by adding an `.env` file based on `.env.example`

4. Go to the root directory to create the database and run the migration script

```sh
$ npm run db:migrate
```

5. (Optional) Seed the database with data

```sh
$ npm run db:seed
```

6. Start the dev server

```sh
$ npm run dev
```

To open in an Android or iOS emulator:

1. Make sure the dev server is already running
2. Make sure the emulator is already running
3. Go to http://localhost:19002 to open the Metro Bundler
4. Select run on Android or iOS simulator
