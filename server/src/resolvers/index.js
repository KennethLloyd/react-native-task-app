import { User, Task } from '../models/index.js';

const resolvers = {
  Query: {
    async task(_, { id }, { user }) {
      if (user) {
        const task = await Task.findOne({ where: { id } });

        return task;
      }
      throw new Error("Sorry, you're not an authenticated user!");
    },

    async tasks(_, {}, { user }) {
      if (user) {
        const tasks = await Task.findAll({ where: { userId: user.id } });

        return tasks;
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

    async addTask(_, { datetime, details }, { user }) {
      if (user) {
        const newTask = new Task({
          datetime,
          details,
          userId: user.id,
        });

        await newTask.save();

        return newTask;
      }
      throw new Error("Sorry, you're not an authenticated user!");
    },

    async deleteTask(_, { id }, { user }) {
      if (user) {
        const task = await Task.findOne({ where: { id, userId: user.id } });

        if (!task) {
          throw new Error('Task does not exist');
        }

        await task.destroy();

        return task;
      }
      throw new Error("Sorry, you're not an authenticated user!");
    },
  },
};

export default resolvers;
