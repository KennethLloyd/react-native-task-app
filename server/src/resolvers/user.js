import { User } from '../models/index.js';

const userResolvers = {
  Query: {},

  Mutation: {
    async signup(_, { username, password }) {
      const newUser = new User({
        username,
        password,
      });

      await newUser.save();
      const token = await newUser.generateAuthToken();

      return token;
    },

    async login(_, { username, password }) {
      const user = await User.findByCredentials(username, password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const token = await user.generateAuthToken();

      return token;
    },
  },
};

export default userResolvers;
