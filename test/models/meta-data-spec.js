'use strict';

require('dotenv').config();
const { afterEach, beforeEach, describe, it } = require('mocha');
const { expect } = require('chai');

describe('#MetaData() Test Suite', function () {
  const iTransactCore = require('../../itransact-core');
  let metaData;
  const testEmail = 'example@payroc.com';

  beforeEach(function () {
    metaData = new iTransactCore.MetaDataModel();
    metaData.email = testEmail;
  });

  afterEach(function () {
    metaData = new iTransactCore.MetaDataModel();
  });

  describe('#MetaData()', function () {
    it('email should be set', function (done) {
      expect(metaData.email, 'Email needs to be a string').to.equal(testEmail);
      done();
    });

    it('invalid emails should not set', function (done) {
      let testEmail2 = 'testtestcom';
      metaData.email = testEmail2;
      expect(metaData.email, 'Email needs to be properly formatted.').to.not.equal(testEmail2);
      done();
    });

    it('email should be optional', function (done) {
      metaData.email = undefined;
      expect(metaData.email, 'Email is optional, but needs to be a string.').to.equal(undefined);
      done();
    });
  });
});
