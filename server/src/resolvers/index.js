import { User } from '../models/index.js';

const resolvers = {
  Query: {
    async current(_, args, { user }) {
      if (user) {
        return await User.findOne({ where: { id: user.id } });
      }
      throw new Error("Sorry, you're not an authenticated user!");
    },
  },

  Mutation: {
    async register(_, { username, password }) {
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
        throw new Error(
          "This user doesn't exist. Please, make sure to type the right login.",
        );
      }

      const token = await user.generateAuthToken();

      return token;
    },
  },
};

export default resolvers;
