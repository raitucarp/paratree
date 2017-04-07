const uuidV4 = require('uuid/v4');

class Word {
  constructor(sentenceId, index, text) {
    this.id = uuidV4();
    this.sentenceId = sentenceId;
    this.index = index;
    this.text = text;
    return this;
  }


}

module.exports = Word;
