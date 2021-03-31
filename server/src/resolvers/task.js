const taskResolvers = {
  Query: {
    async task(_, { id }, { user, db }) {
      if (user) {
        const task = await db.Task.findOne({
          where: {
            id,
          },
          include: [
            {
              model: db.User,
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

    async tasks(_, args, { user, db }) {
      if (user) {
        const tasks = await db.Task.findAll({
          include: [
            {
              model: db.User,
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
    async addTask(_, { datetime, details }, { user, db }) {
      if (user) {
        const newTask = await db.Task.create({
          datetime,
          details,
          userId: user.id,
        });

        return newTask;
      }
      throw new Error('Please authenticate');
    },

    async deleteTask(_, { id }, { user, db }) {
      if (user) {
        const task = await db.Task.findOne({
          where: { id, userId: user.id },
        });

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
