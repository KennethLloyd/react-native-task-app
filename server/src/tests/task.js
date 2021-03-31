import chai from 'chai';
import sinon from 'sinon';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import typeDefs from '../schemas/index.js';
import resolvers from '../resolvers/index.js';
import auth from '../middlewares/authenticate.js';

const should = chai.should();

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      datetime
      details
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      datetime
      details
      createdAt
      user {
        id
        username
      }
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($datetime: String!, $details: String!) {
    addTask(datetime: $datetime, details: $details) {
      id
      datetime
      details
      createdAt
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      datetime
      details
      createdAt
    }
  }
`;

describe('Task', function () {
  let sandbox, server, query, mutate, tasksData, sampleDate;

  before(function () {
    sandbox = sinon.createSandbox();

    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: auth,
    });

    mutate = createTestClient(server).mutate;
    query = createTestClient(server).query;

    sampleDate = '04-01-2021 14:15';
  });

  beforeEach(function () {
    tasksData = [
      {
        id: 'abc',
        datetime: sampleDate,
        details: 'my_task',
        createdAt: sampleDate,
        user: {
          id: 'bob',
          username: 'bob',
        },
      },
      {
        id: 'def',
        datetime: sampleDate,
        details: 'my_task2',
        createdAt: sampleDate,
        user: {
          id: 'bob',
          username: 'bob',
        },
      },
      {
        id: 'ghi',
        datetime: sampleDate,
        details: 'task_of_mine',
        createdAt: sampleDate,
        user: {
          id: 'joe',
          username: 'joe',
        },
      },
    ];
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('#getTasks', function () {
    it('should return an error if token is missing', async function () {
      let exception, response;

      try {
        response = await query({
          query: GET_TASKS,
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.errors.should.be.an('array');
        response.errors[0].should.have.property('message');
        response.errors[0].message.should.equal('Please authenticate');
      }
    });

    it('should return tasks if token is valid', async function () {
      const userId = 'bob';

      sandbox.stub(server, 'context').returns({
        user: {
          id: userId,
        },
        db: {
          Task: {
            findAll: () => tasksData.filter((task) => task.user.id === userId),
          },
        },
      });

      let exception, response;

      try {
        response = await query({
          query: GET_TASKS,
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.data.tasks.should.be.an('array');
        response.data.tasks.should.deep.equal([
          {
            id: 'abc',
            datetime: sampleDate,
            details: 'my_task',
            createdAt: sampleDate,
            user: {
              id: 'bob',
              username: 'bob',
            },
          },
          {
            id: 'def',
            datetime: sampleDate,
            details: 'my_task2',
            createdAt: sampleDate,
            user: {
              id: 'bob',
              username: 'bob',
            },
          },
        ]);
      }
    });
  });

  describe('#getTask', function () {
    it('should return an error if token is missing', async function () {
      let exception, response;

      try {
        response = await query({
          query: GET_TASK,
          variables: {
            id: 'abc',
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.errors.should.be.an('array');
        response.errors[0].should.have.property('message');
        response.errors[0].message.should.equal('Please authenticate');
      }
    });

    it('should return task if token is valid', async function () {
      const userId = 'bob';
      const taskId = 'abc';

      sandbox.stub(server, 'context').returns({
        user: {
          id: userId,
        },
        db: {
          Task: {
            findOne: () => tasksData.find((task) => task.id === taskId),
          },
        },
      });

      let exception, response;

      try {
        response = await query({
          query: GET_TASK,
          variables: {
            id: taskId,
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        const data = JSON.parse(JSON.stringify(response.data));
        data.task.should.be.an('object');
        data.task.should.deep.equal({
          id: 'abc',
          datetime: sampleDate,
          details: 'my_task',
          createdAt: sampleDate,
          user: {
            id: 'bob',
            username: 'bob',
          },
        });
      }
    });
  });

  describe('#addTask', function () {
    it('should return an error if token is missing', async function () {
      let exception, response;

      try {
        response = await mutate({
          mutation: ADD_TASK,
          variables: {
            datetime: '03-30-2021 14:15',
            details: 'water the plants',
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.errors.should.be.an('array');
        response.errors[0].should.have.property('message');
        response.errors[0].message.should.equal('Please authenticate');
      }
    });

    it('should add new task if token is valid', async function () {
      const userId = 'joe';
      const now = new Date();

      const prevTasks = tasksData.filter((task) => task.user.id === userId);
      let updatedTasks;

      sandbox.stub(server, 'context').returns({
        user: {
          id: userId,
        },
        db: {
          Task: {
            create: ({ datetime, details, userId }) => {
              const newTask = {
                id: 'jkl',
                datetime,
                details,
                createdAt: now,
                user: {
                  id: userId,
                  username: userId,
                },
              };

              tasksData.push(newTask);

              return newTask;
            },
          },
        },
      });

      let exception, response;

      try {
        response = await query({
          query: ADD_TASK,
          variables: {
            datetime: '03-30-2021 14:15',
            details: 'water the plants',
          },
        });

        updatedTasks = tasksData.filter((task) => task.user.id === userId);
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        const data = JSON.parse(JSON.stringify(response.data));
        data.addTask.should.be.an('object');
        data.addTask.should.deep.equal({
          id: 'jkl',
          datetime: '03-30-2021 14:15',
          details: 'water the plants',
          createdAt: now.getTime().toString(),
        });

        prevTasks.length.should.equal(1);
        updatedTasks.length.should.equal(2);
      }
    });
  });

  describe('#deleteTask', function () {
    it('should return an error if token is missing', async function () {
      let exception, response;

      try {
        response = await mutate({
          mutation: DELETE_TASK,
          variables: {
            id: 'ghi',
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.errors.should.be.an('array');
        response.errors[0].should.have.property('message');
        response.errors[0].message.should.equal('Please authenticate');
      }
    });

    it('should return an error if task does not exist', async function () {
      const userId = 'joe';
      const prevTasksLength = tasksData.length;

      let exception, response, updatedTasksLength;

      sandbox.stub(server, 'context').returns({
        user: {
          id: 'joe',
        },
        db: {
          Task: {
            findOne: ({ where }) => {
              const taskId = where.id;

              return tasksData.find(
                (task) => task.id === taskId && task.user.id === userId,
              );
            },
          },
        },
      });

      try {
        response = await mutate({
          mutation: DELETE_TASK,
          variables: {
            id: 'zzz',
          },
        });

        updatedTasksLength = tasksData.length;
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.errors.should.be.an('array');
        response.errors[0].should.have.property('message');
        response.errors[0].message.should.equal('Task does not exist');
        prevTasksLength.should.equal(updatedTasksLength);
      }
    });

    it('should delete task if token is valid', async function () {
      const userId = 'joe';

      const prevTasks = tasksData.filter((task) => task.user.id === userId);
      let updatedTasks;

      sandbox.stub(server, 'context').returns({
        user: {
          id: userId,
        },
        db: {
          Task: {
            findOne: ({ where }) => {
              const taskId = where.id;

              return {
                destroy: () => {
                  tasksData = tasksData.filter((task) => task.id !== taskId);
                },
              };
            },
          },
        },
      });

      let exception;

      try {
        await query({
          query: DELETE_TASK,
          variables: {
            id: 'ghi',
          },
        });

        updatedTasks = tasksData.filter((task) => task.user.id === userId);
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        prevTasks.length.should.equal(1);
        updatedTasks.length.should.equal(0);
      }
    });
  });
});
