const _ = require('lodash');

class Data {
  set(key, value) {
    _.set(this, key, value);
  }
  
  get(key) {
    return _.get(this, key);
  }
  
  unset(key) {
    _.unset(this, key);
  }
  
  all() {
    return this;
  }
}

module.exports = Data;