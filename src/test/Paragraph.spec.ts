import { expect } from "chai";
import "mocha";
import p from "./para";
import * as _ from "lodash";
import Paragraph from "../Paragraph";
import { IParaNode } from "../interfaces";

describe("Paragraph", () => {
  it("should has same parent with its siblings", () => {
    p.paragraphs.forEach(paragraph => {
      const parent = paragraph.parent;
      expect(parent).to.eql(p);
    });
  });

  it("should has 4 paragraphs", () =>
    expect(p.paragraphs.length).to.be.equal(4));

  it("should result of find by paragraph id equals to sample data", () => {
    const sampleParagraph = _.sample<Paragraph>(p.paragraphs);
    if (sampleParagraph) {
      const { id } = sampleParagraph;
      expect(sampleParagraph).to.be.equal(p.findParagraphById(id));
    }
  });

  it("should result of find by paragraph index equals to sample data", () => {
    const sampleParagraph = _.sample<Paragraph>(p.paragraphs);
    if (sampleParagraph) {
      const { index } = sampleParagraph;
      expect(sampleParagraph).to.be.equal(p.findParagraphByIndex(index));
    }
  });

  it("should capable to navigate to the next or previous", () => {
    const sampleParagraph = _.sample<Paragraph>(p.paragraphs);

    if (sampleParagraph) {
      const { index } = sampleParagraph;
      const nextParagraph = sampleParagraph.next();

      if (nextParagraph) {
        const { index: nextParagraphIndex } = nextParagraph;
        expect(nextParagraphIndex).to.be.equal(index + 1);
      }

      const prevParagraph = sampleParagraph.prev();
      if (prevParagraph) {
        const { index: prevParagraphIndex } = prevParagraph;
        expect(prevParagraphIndex).to.be.equal(index - 1);
      }
    }
  });

  it("should capable doing data operation", () => {
    const sampleParagraph = _.sample(p.paragraphs);

    if (sampleParagraph) {
      const id = sampleParagraph.id;

      expect(sampleParagraph).to.be.equal(p.findParagraphById(id));

      const label = "Paragraph label";
      const startTime = new Date();
      const randomData = [234, 341];

      sampleParagraph.data.set("label", label);
      sampleParagraph.data.set("start time", startTime);
      sampleParagraph.data.set("random data", randomData);

      expect(sampleParagraph.data.get("label")).to.be.equal(label);
      expect(sampleParagraph.data.get("start time")).to.be.equal(startTime);
      expect(sampleParagraph.data.get("random data")).to.be.equal(randomData);

      sampleParagraph.data.delete("random data");

      expect(sampleParagraph.data.get("random data")).to.be.undefined;
    }
  });
});
