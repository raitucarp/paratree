const _ = require('lodash');
const { Text } = require('./lib/paragraph');
const Data = require('./lib/data');
const uuidV4 = require('uuid/v4');

const data = new WeakMap();

class Paratree {
  constructor(text) {
    // add private data
    data.set(this, new Data());
    
    this.id = uuidV4();
    this.text = text;
    this.paragraphs= new Text(this, this.text);
    return this;
  }
  
  method(name, func) {
    this[name] = func.bind(this);
  }
  
  get data() {
    return data.get(this);
  }
  
  get sentences() {
    return _.chain(this.paragraphs)
      .map(paragraph => paragraph.sentencesCollection)
      .flatten().value();
  }
  
  get words() {
    return _.chain(this.sentences)
      .map(sentence => sentence.wordsCollection)
      .flatten().value();
  }

  findParagraphById(id) {
    return _.find(this.paragraphs, {id});
  }

  findParagraphByIndex(index) {
    return _.find(this.paragraphs, {index});
  }

  findSentenceById(id) {
    return _.find(this.sentences, {id});
  }

  findWordById(id) {
    return _.find(this.words, {id});
  }

  uniqueWords() {
    return _.chain(this.words)
      .map(word => word.clean)
      .map(_.lowerCase).sort().uniq().compact().value();
  }

  charactersLength() {
    return this.text.length;
  }

  charactersNoSpaceLength() {
    return this.text.replace(/\s/ig, '').length;
  }

  longestSentence() {
    return _.chain(this.sentences)
      .orderBy([sentence => sentence.words.length], ['desc']).first().value();
  }

  shortestSentence() {
    return _.chain(this.sentences)
      .orderBy([sentence => sentence.words.length], ['asc']).first().value();
  }

  averageWordSentence() {
    return _.chain(this.sentences)
      .meanBy(o => o.words.length)
      .value();
  }

  averageCharacterSentence() {
    return _.chain(this.sentences)
      .meanBy(o => o.text.length)
      .value();
  }

  averageWordLength() {
    return _.chain(this.words)
      .meanBy(o => o.text.length)
      .value();
  }

  wordOccurences() {
    return _.chain(this.words)
      .map(word => word.clean)
      .map(_.lowerCase).compact().groupBy(o => o)
      .map((v, k) => new Object({word: k, occurence: v.length}))
      .sortBy('occurence')
      .reverse()
      .keyBy('word')
      .mapValues('occurence')
      .value();
  }
}

module.exports = Paratree;
