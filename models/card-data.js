'use strict';

class CardData {
  constructor (name = null, number = null, cvv = null, expMonth = null, expYear = null) {
    this.name = name;
    this.number = number;
    this.cvv = cvv;
    this.exp_month = expMonth;
    this.exp_year = expYear;
  }

  toJson () {
    return {
      'name': this.name,
      'number': this.number,
      'cvv': this.cvv,
      'exp_month': this.exp_month,
      'exp_year': this.exp_year
    };
  }
  // TODO: Add expiration date validation
}

module.exports = CardData;
