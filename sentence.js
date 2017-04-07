const uuidV4 = require('uuid/v4');
const _ = require('lodash');
const Word = require('./word');


let words = new WeakMap();
class Sentence {
  constructor(paragraphId, text, index) {
    this.id = uuidV4();
    this.index = index;
    this.paragraphId = paragraphId;
    this.text = text;
    this.parseWords();
    return this;
  }

  get words() {
    return _.map(words.get(this), 'id');
  }

  set words(w) {
    words.set(this, w);
  }

  get wordsObject() {
    return words.get(this);
  }

  parseWords() {
    let {id: sentenceId, text} = this;
    this.words = _.chain(text).split(/\s{1,}/ig)
      .map((text, index) => new Word(sentenceId, index, text)).value();
  }
}

module.exports = Sentence;
