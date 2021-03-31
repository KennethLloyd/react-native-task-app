import { Task, User } from '../models/index.js';

const taskResolvers = {
  Query: {
    async task(_, { id }, { user }) {
      if (user) {
        const task = await Task.findOne({
          where: {
            id,
          },
          include: [
            {
              model: User,
              as: 'user',
              where: {
                id: user.id,
              },
            },
          ],
        });

        return task;
      }
      throw new Error('Please authenticate');
    },

    async tasks(_, {}, { user }) {
      if (user) {
        const tasks = await Task.findAll({
          include: [
            {
              model: User,
              as: 'user',
              where: {
                id: user.id,
              },
            },
          ],
          order: [['datetime']],
        });

        return tasks;
      }
      throw new Error('Please authenticate');
    },
  },

  Mutation: {
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
      throw new Error('Please authenticate');
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
      throw new Error('Please authenticate');
    },
  },
};

export default taskResolvers;
