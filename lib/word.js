const uuidV4 = require('uuid/v4');
const Data = require('./data');
const _ = require('lodash');

const parent = new WeakMap();
const data = new WeakMap();

class Word {
  constructor(sentence, index, text) {
    parent.set(this, sentence);
    data.set(this, new Data());

    this.id = uuidV4();
    this.sentenceId = sentence.id;
    this.index = index;
    this.text = text;
    this.clean = _.replace(this.text, /((?![0-9a-zA-Z\'\-]).)/ig, '');
  }
  
  get data() {
    return data.get(this);
  }

  parent() {
    return parent.get(this);
  }

  next() {
    let index = this.index;
    return this.parent().findWordByIndex(index + 1);
  }

  prev() {
    let index = this.index;
    return this.parent().findWordByIndex(index - 1);
  }
}

module.exports = Word;
