'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('Tasks', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        datetime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        details: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.dropTable('Tasks');
    } catch (error) {
      console.log(error);
    }
  },
};
