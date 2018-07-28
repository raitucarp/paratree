import * as uuid from "uuid";
import * as _ from "lodash";
import { IParaNode, IParaNodeMethod } from "./interfaces";
import Paragraph from "./Paragraph";
import { findChildNodeByProps } from "./Util";
import Sentence from "./Sentence";
import Word from "./Word";

class Paratree implements IParaNode {
  readonly id: string = uuid.v4();
  readonly text: string;
  readonly index = 0;
  paragraphs: Paragraph[];
  sentences: Sentence[];
  words: Word[];
  data: Map<string, any> = new Map();

  constructor(text: string) {
    this.text = text;

    this.paragraphs = this.parseParagraph(text);
    this.sentences = this.parseSentence(this.paragraphs);
    this.words = this.parseWord(this.sentences);
  }

  private parseParagraph(text: string): Paragraph[] {
    return _
      .chain(text)
      .split("\n")
      .compact()
      .map((text, index) => new Paragraph(this, text, index))
      .value();
  }

  findParagraphById(id: string): Paragraph | null {
    return findChildNodeByProps<Paragraph>(this.paragraphs, "id", id);
  }

  findParagraphByIndex(index: number): Paragraph | null {
    return findChildNodeByProps<Paragraph>(this.paragraphs, "index", index);
  }

  findSentenceById(id: string): Sentence | null {
    return findChildNodeByProps<Sentence>(this.sentences, "id", id);
  }

  findSentenceByIndex(index: number): Sentence | null {
    return findChildNodeByProps<Sentence>(this.sentences, "index", index);
  }

  findWordById(id: string): Word | null {
    return findChildNodeByProps<Word>(this.words, "id", id);
  }

  findWordByIndex(index: number): Word | null {
    return findChildNodeByProps<Word>(this.words, "index", index);
  }

  uniqueWords() {
    return _
      .chain(this.words)
      .map(word => word.clean)
      .map(_.lowerCase)
      .sort()
      .uniq()
      .compact()
      .value();
  }

  totalCharacters(): number {
    return this.text.length;
  }

  longestSentence(): Sentence | null {
    return (
      _
        .chain(this.sentences)
        .orderBy([sentence => sentence.words.length], ["desc"])
        .first()
        .value() || null
    );
  }

  shortestSentence(): Sentence | null {
    return (
      _
        .chain(this.sentences)
        .orderBy([sentence => sentence.words.length], ["asc"])
        .first()
        .value() || null
    );
  }

  totalCharacterWithNoSpace(): number {
    return this.text.replace(/\s/gi, "").length;
  }

  averageCharacterSentence(): number {
    return _
      .chain(this.sentences)
      .meanBy(o => o.text.length)
      .value();
  }

  averageWordLength(): number {
    return _
      .chain(this.words)
      .meanBy(o => o.text.length)
      .value();
  }

  averageWordInSentences(): number {
    return _
      .chain(this.sentences)
      .meanBy(o => o.words.length)
      .value();
  }

  private parseSentence(paragraphs: Paragraph[]): Sentence[] {
    return _
      .chain<Paragraph[]>(paragraphs)
      .map(paragraph => paragraph.sentences)
      .flatten()
      .value();
  }

  private parseWord(sentences: Sentence[]): Word[] {
    return _
      .chain<Sentence[]>(sentences)
      .map(sentence => sentence.words)
      .flatten()
      .value();
  }
}

export default Paratree;
