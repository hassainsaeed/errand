const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../src/config');

const expect = chai.expect;
chai.use(chaiHttp);

const authMockUserData = {
  first_name: 'Test',
  last_name: 'User',
  email: `${Math.random().toString(36).substring(7)}@gmail.com`,
  phone_number: '19056666662',
  password: 'testpassword',
};


module.exports = {
  chai: chai,
  expect: expect,
  authMockUserData: authMockUserData,
  hostname: config.HOSTNAME,
  port: config.PORT,
};
