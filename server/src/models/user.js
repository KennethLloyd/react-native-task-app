import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import sequelize from '../db/sequelize.js';

const { DataTypes } = Sequelize;

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt for each new entry
  },
);

User.prototype.generateAuthToken = async function () {
  const user = this;
  const { id } = user;

  const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

User.findByCredentials = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return null;
  }

  const hashedPassword = crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT, 1000, 64, 'sha512')
    .toString('hex');

  const isMatch = hashedPassword === user.password;

  if (!isMatch) {
    return null;
  }
  return user;
};

User.beforeSave((userInstance) => {
  if (userInstance.changed('password')) {
    userInstance.password = crypto
      .pbkdf2Sync(
        userInstance.password,
        process.env.PASSWORD_SALT,
        1000,
        64,
        'sha512',
      )
      .toString('hex');
  }
});

export default User;
