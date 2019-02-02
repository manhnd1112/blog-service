/* eslint-env jest */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// process.env.LOG_LEVEL = 'debug';

const request = require('supertest');
const Server = require('../Server');
const { dependencyInjection } = require('../../config');

const initDB = async (container) => {
  const account = container.resolve('account');
  await account.deleteMany({});
};

describe('Routes /accounts', () => {
  let container = null;
  let app = null;
  let connection = null;

  beforeAll(async (done) => {
    try {
      container = dependencyInjection.init().getContainer();
      const database = container.resolve('database');
      const dbSettings = container.resolve('settings').database;
      connection = await database.connect(dbSettings);

      initDB(container);
      done();
    } catch (e) {
      throw e;
    }
  });

  beforeEach(async (done) => {
    try {
      app = await Server.start(container);
      done();
    } catch (e) {
      throw e;
    }
  });

  afterAll(() => {
    connection.close();
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  describe('Create account', () => {
    test('It should response 201 after create account success', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'validatePassword@',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(201);
      }));

    test('It should response 409 when email exist', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'validatePassword',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(409);
      }));

    test('It should response 403 when email has one domain atom', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail',
        password: 'validatePassword',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when email does not have @', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen.gmail.com',
        password: 'validatePassword',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when name too short', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'validatePassword',
        name: 'L',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when name too long', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'validatePassword',
        name: 'Ljsfiekfksljdhjfewifk ewfjkeifj',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when password too short', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'valid',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when password too long', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'validrgrbregjksdgjkergjekrjgkrekjgrehjuy76fdcserity',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when password have non ascii visible or space character', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'validrgrbregjksdgjロン',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when missing email', () => request(app)
      .post('/api/v1/accounts')
      .send({
        password: 'validatePassword',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when missing password', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        name: 'Long Nguyen',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));

    test('It should response 403 when missing name', () => request(app)
      .post('/api/v1/accounts')
      .send({
        email: 'reallongnguyen@gmail.com',
        password: 'validatePassword',
      })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403);
      }));
  });
});
