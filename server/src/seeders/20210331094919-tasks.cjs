'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Tasks', [
        {
          id: 'cee3f89a-18a2-4041-906b-f8f3f8ed6fb0',
          datetime: '2021-05-22 08:24',
          details: 'do homework',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '0bd61925-6a5f-468a-b1e5-8eb2f295c4be',
        },
        {
          id: 'fe7784a2-5964-486a-9bdf-da5bd6a0696f',
          datetime: '2021-05-19 09:47',
          details: 'eat with friends',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '0bd61925-6a5f-468a-b1e5-8eb2f295c4be',
        },
        {
          id: 'fe82a889-d600-470a-9b36-e636f94ebf90',
          datetime: '2021-12-17 22:03',
          details: 'buy gifts',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '0bd61925-6a5f-468a-b1e5-8eb2f295c4be',
        },
        {
          id: 'c2ab2959-51b6-4390-a2eb-d414787f4944',
          datetime: '2021-10-28 22:32',
          details: 'jog around the house',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '0bd61925-6a5f-468a-b1e5-8eb2f295c4be',
        },
        {
          id: '8ad43f90-18df-4887-93e1-e5d2b16b779b',
          datetime: '2021-06-24 16:29',
          details: 'attend party',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '0bd61925-6a5f-468a-b1e5-8eb2f295c4be',
        },

        {
          id: 'b53297b7-257a-4e64-b75d-1de0c3f3695f',
          datetime: '2021-10-25 05:23',
          details: 'go swimming',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '14d23e5c-8619-45f1-8576-71b669a980fa',
        },
        {
          id: 'fc655874-9f32-45b3-b475-e49eb0a74eb6',
          datetime: '2021-07-23 19:06',
          details: 'hike with friends',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '14d23e5c-8619-45f1-8576-71b669a980fa',
        },
        {
          id: '1cb72724-2837-45ee-90fe-292fda796217',
          datetime: '2021-06-10 20:38',
          details: 'read a new book',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '14d23e5c-8619-45f1-8576-71b669a980fa',
        },

        {
          id: '63600b0c-ef9e-40d9-b572-deee10a5e9ac',
          datetime: '2021-10-25 14:42',
          details: 'study entrepreneurship',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '604fff58-1ad4-4cf3-bf86-621f7efdcbd8',
        },
        {
          id: '09b33d95-bab3-409a-8d01-3ea903e46d35',
          datetime: '2021-06-02 05:33',
          details: 'play a new video game',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '604fff58-1ad4-4cf3-bf86-621f7efdcbd8',
        },
        {
          id: 'a1742f17-dbdb-46a6-aada-0db34c169044',
          datetime: '2021-11-16 21:58',
          details: 'learn piano',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '604fff58-1ad4-4cf3-bf86-621f7efdcbd8',
        },
        {
          id: '315d4b2e-ff03-4fe8-ad24-96606f0c9398',
          datetime: '2021-12-12 21:42',
          details: 'go to the gym',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: '604fff58-1ad4-4cf3-bf86-621f7efdcbd8',
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Tasks', null, {});
    } catch (error) {
      console.log(error);
    }
  },
};
