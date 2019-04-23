'use strict';

require('dotenv').config();
const { afterEach, beforeEach, describe, it } = require('mocha');
const { expect } = require('chai');

describe('#CardData Test Suite', function () {
  const iTransactCore = require('../../itransact-core');
  let cardData;

  beforeEach(function () {
    cardData = new iTransactCore.CardDataModel();
  });

  afterEach(function () {
  });

  describe('#CardData()', function () {
    it('class fields should be optional', function (done) {
      cardData.name = undefined;
      expect(cardData.name, 'Fields like name should not be required.').to.equal(undefined);
      done();
    });

    it('class fields should be able to change individually', function (done) {
      let testString = 'Joe';
      cardData.name = testString;
      expect(cardData.name, 'Fields like name should be mutable').to.equal(testString);
      done();
    });

    it('class fields should have the option to init values in the constructor rather than individually', function (done) {
      let testString = 'Joe';
      cardData = new iTransactCore.CardDataModel(testString);
      expect(cardData.name, 'Fields like name should be mutable').to.equal(testString);
      done();
    });
  });
});
