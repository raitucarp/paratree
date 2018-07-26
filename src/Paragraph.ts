import * as _ from "lodash";
import * as uuid from "uuid";
import { IParaNode, IParagraph, IParaNodeMethod } from "./interfaces";
import Sentence from "./Sentence";
import { findChildNodeByProps } from "./Util";
import Paratree from ".";

class Paragraph
  implements IParaNode, IParagraph, IParaNodeMethod<Paragraph, Sentence> {
  readonly id: string = uuid.v4();
  readonly index: number;
  readonly text: string;
  data: Map<string, any> = new Map();
  parent: Paratree;
  sentences: Sentence[];

  constructor(parent: Paratree, text: string, index: number = 0) {
    this.parent = parent;
    this.index = index;
    this.text = text;
    this.sentences = this.parseSentence(this.text);
  }

  private parseSentence(text: string): Sentence[] {
    return _
      .chain(text)
      .split(/[\.\?\!]\s{1,}/gi)
      .compact()
      .map((text, index) => new Sentence(this, text, index))
      .value();
  }

  findSentenceById(id: string): Sentence | null {
    return this.findChildrenById(id);
  }

  findSentenceByIndex(index: number): Sentence | null {
    return this.findChildrenByIndex(index);
  }

  findChildrenById(id: string): Sentence | null {
    return findChildNodeByProps<Sentence>(this.sentences, "id", id);
  }

  findChildrenByIndex(index: number): Sentence | null {
    return findChildNodeByProps<Sentence>(this.sentences, "index", index);
  }

  next(): Paragraph | null {
    return this.parent.findParagraphByIndex(this.index + 1);
  }

  prev(): Paragraph | null {
    return this.parent.findParagraphByIndex(this.index - 1);
  }
}

export default Paragraph;
