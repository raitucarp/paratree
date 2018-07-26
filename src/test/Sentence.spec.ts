import { expect } from "chai";
import "mocha";
import p from "./para";
import * as _ from "lodash";
import Sentence from "../Sentence";
import Paragraph from "../Paragraph";

describe("Sentence", () => {
  it("should has same parent with siblings.", () => {
    p.paragraphs.forEach(paragraph => {
      paragraph.sentences.forEach(sentence => {
        expect(sentence.parent).to.be.equal(paragraph);
      });
    });
  });

  it("should result of find sentence by id equals to sample data", () => {
    const sampleSentence = _.sample<Sentence>(p.sentences);
    if (sampleSentence) {
      const { id } = sampleSentence;

      expect(sampleSentence).to.be.equal(p.findSentenceById(id));
      expect(sampleSentence).to.be.equal(
        sampleSentence.parent.findSentenceById(id)
      );
    }
  });

  it("should result of find by index result equals to sample data", () => {
    const sampleSentence = _.sample<Sentence>(p.sentences);
    if (sampleSentence) {
      const { index } = sampleSentence;

      expect(sampleSentence).to.be.equal(
        sampleSentence.parent.findSentenceByIndex(index)
      );
    }
  });

  it("should has 44 words in longest sentences", () => {
    const longestSentence = p.longestSentence();
    if (longestSentence) {
      expect(longestSentence.words.length).to.be.equal(44);
    }
  });

  it("should has 6 words in shortest sentences", () => {
    const shortestSentence = p.shortestSentence();
    if (shortestSentence) {
      expect(shortestSentence.words.length).to.be.equal(6);
    }
  });

  it("should capable to navigate to the next or previous, strict in same parent", () => {
    const sampleParagraph = _.sample<Paragraph>(p.paragraphs);

    if (sampleParagraph) {
      const sampleSentence = _.sample<Sentence>(sampleParagraph.sentences);

      if (sampleSentence) {
        const { index } = sampleSentence;
        const nextSentence = sampleSentence.next(true);

        if (nextSentence) {
          const { index: nextSentenceIndex } = nextSentence;
          expect(nextSentenceIndex).to.be.equal(index + 1);
        }

        const prevSentence = sampleSentence.prev(true);
        if (prevSentence) {
          const { index: prevSentenceIndex } = prevSentence;
          expect(prevSentenceIndex).to.be.equal(index - 1);
        }
      }
    }
  });

  it("should capable to navigate to the next or previous, no strict", () => {});
  it("should capable of doing data operation", () => {
    const sampleParagraph = _.sample(p.paragraphs);

    if (sampleParagraph) {
      const sampleSentence = _.sample(sampleParagraph.sentences);

      if (sampleSentence) {
        const id = sampleSentence.id;

        expect(sampleSentence).to.be.equal(
          sampleParagraph.findSentenceById(id)
        );

        const label = "sentence label";
        const startTime = new Date();
        const randomData = [234, 341];

        sampleSentence.data.set("label", label);
        sampleSentence.data.set("start time", startTime);
        sampleSentence.data.set("random data", randomData);

        expect(sampleSentence.data.get("label")).to.be.equal(label);
        expect(sampleSentence.data.get("start time")).to.be.equal(startTime);
        expect(sampleSentence.data.get("random data")).to.be.equal(randomData);

        sampleSentence.data.delete("random data");
        expect(sampleSentence.data.get("random data")).to.be.undefined;
      }
    }
  });
});
