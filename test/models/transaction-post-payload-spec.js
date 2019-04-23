'use strict';

require('dotenv').config();
const { afterEach, beforeEach, describe, it } = require('mocha');
const { expect } = require('chai');

describe('#TransactionPostPayload() Test Suite', function () {
  const iTransactCore = require('../../itransact-core');
  let payload = new iTransactCore.TransactionPostPayloadModel();
  const SEND_MERCHANT_EMAIL_DEFAULT = true;
  const SEND_CUSTOMER_EMAIL_DEFAULT = false;

  beforeEach(function () {
    payload = new iTransactCore.TransactionPostPayloadModel();
  });

  afterEach(function () {
  });

  describe('#TransactionPostPayload()', function () {
    describe('#amount', function () {
      it('amount is required, not providing amount results in default 0', function (done) {
        payload = new iTransactCore.TransactionPostPayloadModel();
        expect(payload.amount, 'Amount is required').to.equal('0');
        done();
      });

      it('amount is required and cannot be undefined, defaults to 0', function (done) {
        payload.amount = undefined;
        expect(payload.amount, 'Amount is required').to.equal('0');
        done();
      });

      it('invalid amounts are not allowed.', function (done) {
        payload.amount = '$1.00';
        expect(payload.amount, 'Amount is required').to.equal('0');
        done();
      });
    });

    describe('#send_merchant_receipt', function () {
      it('send_merchant_receipt can be set', function (done) {
        payload.send_merchant_receipt = false;
        expect(payload.send_merchant_receipt, 'send_merchant_receipt is required').to.equal(false);
        done();
      });

      it('send_merchant_receipt is required and cannot be undefined, defaults to true', function (done) {
        payload.send_merchant_receipt = undefined;
        expect(payload.send_merchant_receipt, 'send_merchant_receipt is required, cannot be undefined').to.equal(SEND_MERCHANT_EMAIL_DEFAULT);
        done();
      });

      it('send_merchant_receipt defaults to true', function (done) {
        expect(payload.send_merchant_receipt, 'send_merchant_receipt is required as a boolean primitive').to.equal(SEND_MERCHANT_EMAIL_DEFAULT);
        done();
      });

      it('send_merchant_receipt defaults to true, even if incorrect value is supplied', function (done) {
        payload.send_merchant_receipt = { 'xyz': 0 };
        expect(payload.send_merchant_receipt, 'bad assignment will use default value').to.equal(SEND_MERCHANT_EMAIL_DEFAULT);
        done();
      });
    });
    describe('#send_customer_receipt', function () {
      it('send_customer_receipt can be set', function (done) {
        payload.send_customer_receipt = true;
        expect(payload.send_customer_receipt, 'send_merchant_receipt is required, and can be set to true or false').to.equal(true);
        done();
      });

      it('send_customer_receipt is required and cannot be undefined, defaults to true', function (done) {
        payload.send_customer_receipt = undefined;
        expect(payload.send_customer_receipt, 'send_merchant_receipt is required').to.equal(SEND_CUSTOMER_EMAIL_DEFAULT);
        done();
      });

      it('send_customer_receipt defaults to false', function (done) {
        expect(payload.send_customer_receipt, 'send_merchant_receipt is required as a boolean primitive').to.equal(SEND_CUSTOMER_EMAIL_DEFAULT);
        done();
      });

      it('send_customer_receipt defaults to false, even if incorrect value is supplied', function (done) {
        payload.send_customer_receipt = { 'xyz': 0 };
        expect(payload.send_customer_receipt, 'Bad assignment will use default value').to.equal(SEND_CUSTOMER_EMAIL_DEFAULT);
        done();
      });
    });
  });
});
