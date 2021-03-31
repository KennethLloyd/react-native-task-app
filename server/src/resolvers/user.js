const userResolvers = {
  Query: {},

  Mutation: {
    async signup(_, { username, password }, { db }) {
      const newUser = new db.User({
        username,
        password,
      });

      await newUser.save();
      const token = await newUser.generateAuthToken();

      return token;
    },

    async login(_, { username, password }, { db }) {
      const user = await db.User.findByCredentials(username, password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const token = await user.generateAuthToken();

      return token;
    },
  },
};

export default userResolvers;
