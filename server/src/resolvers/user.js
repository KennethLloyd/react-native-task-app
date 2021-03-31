const userResolvers = {
  Query: {},

  Mutation: {
    async signup(_, { username, password }, { db }) {
      const user = await db.User.findOne({ where: { username } });
      if (user) {
        throw new Error('Username already exists');
      }

      const newUser = await db.User.create({
        username,
        password,
      });

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
