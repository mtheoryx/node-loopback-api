'use strict';

const app = require('../server/server');
const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const request = supertest(app);

module.exports = {
  app,
  expect,
  request
}
