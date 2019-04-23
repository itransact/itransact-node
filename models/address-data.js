'use strict';

class AddressData {
  constructor (line1 = null, line2 = null, city = null, state = null, postal = null) {
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.state = state;
    this.postal_code = postal;
  }

  toJson () {
    return {
      'line1': this.line1,
      'line2': this.line2,
      'city': this.city,
      'state': this.state,
      'postal_code': this.postal_code
    };
  }
}

module.exports = AddressData;
