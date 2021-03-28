import Sequelize from 'sequelize';

import sequelize from '../db/sequelize.js';
import User from './user.js';

const { DataTypes } = Sequelize;

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt for each new entry
  },
);

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default Task;
