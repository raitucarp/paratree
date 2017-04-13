const uuidV4 = require('uuid/v4');
const Data = require('./data');

let parent = new WeakMap();

class Word {
  constructor(sentence, index, text) {
    parent.set(this, sentence);

    this.id = uuidV4();
    this.sentenceId = sentence.id;
    this.index = index;
    this.text = text;
    this.data = new Data();
    return this;
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
