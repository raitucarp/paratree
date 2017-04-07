const _ = require('lodash');
const uuidV4 = require('uuid/v4');
const Sentence = require('./sentence');

class Text {
  constructor(text) {
    let paragraphs = _.chain(text).split('\n').compact()
      .map((text, index) => new Paragraph(text, index))
      .value();

    return paragraphs;
  }
}

let sentences = new WeakMap();

class Paragraph {
  constructor(text, index = 0) {
    this.id = uuidV4();
    this.index = index;
    this.text = text;
    this.parseSentence();
    return this;
  }

  get sentencesObject() {
    return sentences.get(this);
  }

  get sentences() {
    return _.map(sentences.get(this), 'id');
  }

  set sentences(s) {
    sentences.set(this, s);
  }

  parseSentence() {
    let {id: paragraphId, text} = this;
    this.sentences = _.chain(text).split('. ').compact()
      .map((text, index) =>
        new Sentence(paragraphId, text, index)
      ).value();
  }
}

module.exports = {Text, Paragraph};
