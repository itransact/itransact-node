'use strict';

require('dotenv').config();
const { afterEach, beforeEach, describe, it } = require('mocha');
const { expect } = require('chai');

describe('#AddressData Test Suite', function () {
  const iTransactCore = require('../../itransact-core');
  let addressData = new iTransactCore.AddressDataModel();
  const line1Test = 'PO Box 999';

  beforeEach(function () {
    addressData = new iTransactCore.AddressDataModel();
  });

  afterEach(function () {
  });

  describe('#AddressData()', function () {
    it('should be able to set properties individually', function (done) {
      addressData.line1 = line1Test;
      expect(addressData.line1, 'Model properties should not be immutable').to.equal(line1Test);
      done();
    });

    it('should be able to set properties inline', function (done) {
      const TEST_STRING = '123 S. 456 W.';
      addressData = new iTransactCore.AddressDataModel(TEST_STRING);
      expect(addressData.line1, 'Model properties should not be immutable').to.equal(TEST_STRING);
      done();
    });

    it('should accept undefined values for optional fields', function (done) {
      addressData.line1 = undefined;
      expect(addressData.line1, 'Postal code should not be required').to.equal(undefined);
      done();
    });
  });
});
