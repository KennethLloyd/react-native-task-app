'use strict';

const crypto = require('crypto');

const tempPassword = crypto
  .pbkdf2Sync('12345aA!', process.env.PASSWORD_SALT, 1000, 64, 'sha512')
  .toString('hex');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Users', [
        {
          id: '0bd61925-6a5f-468a-b1e5-8eb2f295c4be',
          username: 'user1',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '14d23e5c-8619-45f1-8576-71b669a980fa',
          username: 'user2',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '604fff58-1ad4-4cf3-bf86-621f7efdcbd8',
          username: 'user3',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', null, {});
    } catch (error) {
      console.log(error);
    }
  },
};
