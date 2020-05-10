const common = require('./common.js');

const chai = common.chai;
const expect = common.expect;
const authMockUserData = common.authMockUserData;
const ordersMockData = common.ordersMockData;
const runnerJobsMockData = common.runnerJobsMockData;
const hostname = common.hostname;
const port = common.port;

function importTest(name, path, data) {
  describe(name, () => {
    require(path)(chai, expect, hostname, port, data);
  });
}

describe('Errand Integration Tests', () => {
  let app;

  beforeEach(async () => {
    app = await require('./server.js');
  });

  // TODO: figure out how to pass data created from one test into another
  // eg the user created in sign up, can be the user_id in create order
  // TODO: Make a middleware JWT verify test

  importTest('Auth - Sign Up Test', './auth/signup.test.js', authMockUserData);

  importTest('Auth - Sign In Test', './auth/signin.test.js', authMockUserData);

  importTest('Orders - Create Orders Test', './orders/create.test.js', ordersMockData);

  importTest('Orders - Retrieve Orders Test', './orders/retrieve.test.js', ordersMockData);

  importTest('Orders - Assign Orders Test', './orders/assign.test.js', ordersMockData);

  importTest('RunnerJobs - Create Orders Test', './runnerJobs/create.test.js', runnerJobsMockData);

  importTest('RunnerJobs - Retrieve Orders Test', './runnerJobs/retrieve.test.js', runnerJobsMockData);

  importTest('RunnerJobs - Assign Orders Test', './runnerJobs/nearme.test.js', runnerJobsMockData);

  afterEach(async () => {
    await app.close;
  });
});
