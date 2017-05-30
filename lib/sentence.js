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

  next(limitInParent = false) {
    const index = this.index;
    const nextSentence = this.parent().findSentenceByIndex(index + 1);
    if (nextSentence) {
      return nextSentence;
    }
    
    if (limitInParent) {
      return;
    }
    
    const nextParagraph = this.parent().next();
    if (nextParagraph) {
      const $nextSentence = nextParagraph.findSentenceByIndex(0);
      return $nextSentence;
    }
    return;
  }

  prev(limitInParent = false) {
    const index = this.index;
    const prevSentence = this.parent().findSentenceByIndex(index - 1);
    if (prevSentence) {
      return prevSentence;
    }
    
    if (limitInParent) {
      return;
    }
    
    const prevParagraph = this.parent().prev();
    if (prevParagraph) {
      const lastIndex = prevParagraph.sentences.length - 1;
      const $prevSentence = prevParagraph.findSentenceByIndex(lastIndex);
      return $prevSentence;
    }
    return;
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
