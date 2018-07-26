import { IParaNode } from "./interfaces";
import * as uuid from "uuid";
import Word from "./Word";

class Character implements IParaNode {
  readonly id: string = uuid.v4();
  readonly index: number;
  readonly text: string;
  data: Map<string, any> = new Map();
  parent: Word;

  constructor(parent: Word, text: string, index: number) {
    this.parent = parent;
    this.text = text;
    this.index = index;
  }
}

export default Character;
