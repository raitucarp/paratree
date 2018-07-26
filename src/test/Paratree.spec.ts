import { expect } from "chai";
import "mocha";
import p from "./para";
import Paratree from "..";

describe("Paratree", () => {
  it("should create an instance", () =>
    expect(p).to.be.an.instanceof(Paratree));
  it("should be has 4 paragraphs", () =>
    expect(p.paragraphs.length).to.be.equal(4));
  it("should has 21 sentences", () =>
    expect(p.sentences.length).to.be.equal(21));
  it("should has 389 words", () => expect(p.words.length).to.be.equal(389));
  it("should has 2052 characters with no spaces", () =>
    expect(p.totalCharacterWithNoSpace()).to.be.equal(2052));
  it("should has 18.xx average words length per sentence", () =>
    expect(p.averageWordInSentences()).to.be.above(18));

  it("should has more than 100 average characters length per sentence", () =>
    expect(p.averageCharacterSentence()).to.be.above(100));

  it("should has more than 5 char average length in word", () =>
    expect(p.averageWordLength()).to.be.above(5));
  it("should capable to set and get data", () => {
    const bar = "bar";
    p.data.set("foo", bar);

    expect(p.data.get("foo")).to.be.equal(bar);
  });

  it("should implement Paranode", () => expect(p.id).to.be.a("string"));
  it("should has 2443 characters", () =>
    expect(p.totalCharacters()).to.be.equal(2443));
});
