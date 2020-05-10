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

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyaXp6eV9kcmFrZTNAaG90bWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVicmV5MyIsImxhc3RfbmFtZSI6IkdyYWhhbTMiLCJwaG9uZV9udW1iZXIiOiIxOTA1NjY2NjY2MiIsImlhdCI6MTU4Njc1MjAwMX0.zHQSZ-8ALp2j1IVu_D7WHoWRUEfv7oJAUEamFCeu3zo';

const ordersMockData = {
  token: mockToken,
  ids: '1,2',
  create_body: {
    user_id: 7,
    requester_latitude: '45.4204002',
    requester_longitude: '-75.6936368',
    list: 'TestMilk, TestEggs, TestBread',
  },
  assign_body: {
    user_id: 7,
    job_id: 3,
    order_id: 1,
  },
};

const runnerJobsMockData = {
  token: mockToken,
  create_body: {
    user_id: 7,
    runner_latitude: '45.4204002',
    runner_longitude: '-75.6936368',
    radius: 1,
    store_name: 'Mock Grocery Store',
  },
};


module.exports = {
  chai: chai,
  expect: expect,
  authMockUserData: authMockUserData,
  ordersMockData: ordersMockData,
  runnerJobsMockData: runnerJobsMockData,
  hostname: config.HOSTNAME,
  port: config.PORT,
};
