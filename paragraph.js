const _ = require('lodash');
const uuidV4 = require('uuid/v4');
const Sentence = require('./sentence');

class Text {
  constructor(parent, text) {
    let paragraphs = _.chain(text).split('\n').compact()
      .map((text, index) => new Paragraph(parent, text, index))
      .value();

    return paragraphs;
  }
}

let sentences = new WeakMap();
let parent = new WeakMap();
class Paragraph {
  constructor($parent, text, index = 0) {
    parent.set(this, $parent);
    this.id = uuidV4();
    this.index = index;
    this.text = text;
    this.parseSentence();
    return this;
  }

  parent() {
    return parent.get(this);
  }

  findSentenceById(id) {
    return _.find(this.sentencesCollection, {id});
  }

  findSentenceByIndex(index) {
    return _.find(this.sentencesCollection, {index});
  }

  next() {
    let index = this.index;
    return this.parent().findParagraphByIndex(index + 1);
  }

  prev() {
    let index = this.index;
    return this.parent().findParagraphByIndex(index - 1);
  }

  get sentencesCollection() {
    return sentences.get(this);
  }

  get sentences() {
    return _.map(sentences.get(this), 'id');
  }

  set sentences(s) {
    sentences.set(this, s);
  }

  parseSentence() {
    let paragraph = this;
    let {text} = paragraph;
    this.sentences = _.chain(text).split('. ').compact()
      .map((text, index) =>
        new Sentence(paragraph, text, index)
      ).value();
  }
}

module.exports = {Text, Paragraph};
