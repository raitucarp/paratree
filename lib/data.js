// const data = new WeakMap();

class Data {  
  add(key, value) {
    this[key] = value;
    return this;
  }
  
  set(key, value) {
    if(this[key]) {
      this[key] = value;
    }
    return this;
  }
  
  get(key) {
    return this[key];
  }
  
  delete(key) {
    if (this[key]) {
      delete this[key];
    }
    return this;
  }
  
  all() {
    return this;
  }
}

module.exports = Data;