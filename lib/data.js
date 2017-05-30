const _ = require('lodash');
let _data = {};

class Data {
  set(key, value) {
    _.set(_data, key, value);
  }
  
  get(key) {
    return _.get(_data, key);
  }
  
  unset(key) {
    _.unset(_data, key);
  }
  
  all() {
    return _data;
  }
}

module.exports = Data;