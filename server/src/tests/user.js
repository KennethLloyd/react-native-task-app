'use strict';

import chai from 'chai';
import sinon from 'sinon';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import typeDefs from '../schemas/index.js';
import resolvers from '../resolvers/index.js';

const should = chai.should();

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password)
  }
`;

describe('User', function () {
  let sandbox, server, mutate;

  before(function () {
    sandbox = sinon.createSandbox();

    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => {},
    });

    mutate = createTestClient(server).mutate;
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('#login', function () {
    it('should return an error if user does not exist', async function () {
      sandbox.stub(server, 'context').returns({
        user: null,
        db: {
          User: {
            findByCredentials: () => null,
          },
        },
      });

      let exception, response;

      try {
        response = await mutate({
          mutation: LOGIN,
          variables: {
            username: 'ishouldnotexist',
            password: 'unknown',
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.errors.should.be.an('array');
        response.errors[0].should.have.property('message');
        response.errors[0].message.should.equal('Invalid credentials');
      }
    });

    it('should return token if user exists', async function () {
      sandbox.stub(server, 'context').returns({
        user: null,
        db: {
          User: {
            findByCredentials: () => {
              return {
                generateAuthToken: () => 'mytoken',
              };
            },
          },
        },
      });

      let exception, response;

      try {
        response = await mutate({
          mutation: LOGIN,
          variables: {
            username: 'my_username',
            password: 'my_password',
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.data.login.should.equal('mytoken');
      }
    });
  });

  describe('#signup', function () {
    it('should return an error if user already exists', async function () {
      sandbox.stub(server, 'context').returns({
        user: null,
        db: {
          User: {
            findOne: () => true,
          },
        },
      });

      let exception, response;

      try {
        response = await mutate({
          mutation: SIGNUP,
          variables: {
            username: 'my_username',
            password: 'my_password',
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.errors.should.be.an('array');
        response.errors[0].should.have.property('message');
        response.errors[0].message.should.equal('Username already exists');
      }
    });

    it('should return token if user is created', async function () {
      sandbox.stub(server, 'context').returns({
        user: null,
        db: {
          User: {
            findOne: () => false,
            create: () => {
              return {
                generateAuthToken: () => 'mytoken',
              };
            },
          },
        },
      });

      let exception, response;

      try {
        response = await mutate({
          mutation: SIGNUP,
          variables: {
            username: 'new_username',
            password: 'new_password',
          },
        });
      } catch (e) {
        exception = e;
      } finally {
        should.not.exist(exception);

        response.should.be.an('object');
        response.data.signup.should.equal('mytoken');
      }
    });
  });
});
