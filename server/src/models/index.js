import User from './user.js';
import Task from './task.js';

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Task, {
  as: 'tasks',
  foreignKey: 'userId',
  constraints: false,
  allowNull: true,
  defaultValue: null,
});

const Models = {
  User,
  Task,
};

export default Models;
