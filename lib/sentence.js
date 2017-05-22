const uuidV4 = require('uuid/v4');
const _ = require('lodash');
const Word = require('./word');
const Data = require('./data');


const words = new WeakMap();
const parent = new WeakMap();
const data = new WeakMap();

class Sentence {
  constructor(paragraph, text, index) {
    parent.set(this, paragraph);
    data.set(this, new Data());

    this.id = uuidV4();
    this.index = index;
    this.paragraphId = paragraph.id;
    this.text = text;
    this.parseWords();
  }
  
  get data() {
    return data.get(this);
  }

  parent() {
    return parent.get(this);
  }

  findWordById(id) {
    return _.find(this.wordsCollection, {id});
  }

  findWordByIndex(index) {
    return _.find(this.wordsCollection, {index});
  }

  next() {
    let index = this.index;
    return this.parent().findSentenceByIndex(index + 1);
  }

  prev() {
    let index = this.index;
    return this.parent().findSentenceByIndex(index - 1);
  }

  get words() {
    return _.map(words.get(this), 'id');
  }

  set words(w) {
    words.set(this, w);
  }

  get wordsCollection() {
    return words.get(this);
  }

  parseWords() {
    let sentence = this;
    let {text} = sentence;
    this.words = _.chain(text).split(/\s{1,}/ig)
      .map((text, index) => new Word(sentence, index, text)).value();
  }
}

module.exports = Sentence;
