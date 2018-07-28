import { expect } from "chai";
import "mocha";
import p from "./para";
import * as _ from "lodash";
import Paratree from "..";
import Word from "../Word";
import Paragraph from "../Paragraph";
import Sentence from "../Sentence";

describe("Word", () => {
  it("should has 389 words", () => {
    expect(p.words.length).to.be.equal(389);
  });

  it("should has parent and equals with its parent's siblings", () => {
    p.paragraphs.forEach(paragraph =>
      paragraph.sentences.forEach(sentence =>
        sentence.words.forEach(word =>
          expect(word.parent).to.be.equal(sentence)
        )
      )
    );
  });

  it("should result of find by id equals to sample data", () => {
    const sampleWord = _.sample<Word>(p.words);
    if (sampleWord) {
      const { id } = sampleWord;

      expect(sampleWord).to.be.equal(p.findWordById(id));
      expect(sampleWord).to.be.equal(sampleWord.parent.findWordById(id));
    }
  });

  it("should result of find by index equals to sample data", () => {
    const sampleParagraph = _.sample<Paragraph>(p.paragraphs);
    if (sampleParagraph) {
      const sampleSentence = _.sample<Sentence>(sampleParagraph.sentences);

      if (sampleSentence) {
        const sampleWord = _.sample(sampleSentence.words);

        if (sampleWord) {
          const { index } = sampleWord;

          expect(sampleWord).to.be.equal(sampleSentence.findWordByIndex(index));
        }
      }
    }
  });

  it("should has 223 unique words", () =>
    expect(p.uniqueWords().length).to.be.equal(223));

  it("should capable to navigate to the next or previous, strict in same parent", () => {
    const sampleParagraph = _.sample<Paragraph>(p.paragraphs);

    if (sampleParagraph) {
      const sampleSentence = _.sample<Sentence>(sampleParagraph.sentences);

      if (sampleSentence) {
        const sampleWord = _.sample(sampleSentence.words);

        if (sampleWord) {
          const { index } = sampleWord;
          const nextWord = sampleWord.next(true);

          if (nextWord) {
            const { index: nextWordIndex } = nextWord;
            expect(nextWordIndex).to.be.equal(index + 1);
          }

          const prevWord = sampleWord.prev(true);
          if (prevWord) {
            let { index: prevWordIndex } = prevWord;
            expect(prevWordIndex).to.be.equal(index - 1);
          }
        }
      }
    }
  });

  it("should capable to navigate to the next or previous, with no strict", () => {});
  it("should capable of doing data operation", () => {
    const sampleParagraph = _.sample(p.paragraphs);

    if (sampleParagraph) {
      const sampleSentence = _.sample(sampleParagraph.sentences);

      if (sampleSentence) {
        const sampleWord = _.sample(sampleSentence.words);

        if (sampleWord) {
          const id = sampleWord.id;

          expect(sampleWord).to.be.equal(sampleSentence.findWordById(id));

          const label = "word label";
          const startTime = new Date();
          const randomData = [234, 341];

          sampleWord.data.set("label", label);
          sampleWord.data.set("start time", startTime);
          sampleWord.data.set("random data", randomData);

          expect(sampleWord.data.get("label")).to.be.equal(label);
          expect(sampleWord.data.get("start time")).to.be.equal(startTime);
          expect(sampleWord.data.get("random data")).to.be.equal(randomData);

          sampleWord.data.delete("random data");
          expect(sampleWord.data.get("random data")).to.be.undefined;
        }
      }
    }
  });
});
