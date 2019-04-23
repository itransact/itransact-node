'use strict';

class MetaData {
  constructor (email = null) {
    this._email = email; // Customer email used if payload send_customer_receipt == true
  }

  get email () {
    return this._email;
  }

  set email (value) {
    if (value === undefined) {
      this._email = value;
      return;
    }

    let hasAt = value.includes('@');
    let hasPeriod = value.includes('.');

    if (hasAt && hasPeriod) {
      this._email = value;
    } else {
      console.log('Email needs to have at least one @ and one .');
    }
  }

  toJson () {
    return {
      'email': this._email
    };
  }
}

module.exports = MetaData;
