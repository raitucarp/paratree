import { IParaNode, IWord, IParaNodeMethod } from "./interfaces";
import * as uuid from "uuid";
import * as _ from "lodash";
import Sentence from "./Sentence";
import { prevNode, nextNode, findChildNodeByProps } from "./Util";
import Character from "./Character";

class Word implements IParaNode, IWord, IParaNodeMethod<Word, Character> {
  readonly id: string = uuid.v4();
  readonly index: number;
  readonly text: string;
  data: Map<string, any> = new Map();
  parent: Sentence;
  chars: Character[];
  clean: string;

  constructor(parent: Sentence, text: string, index: number) {
    this.index = index;
    this.text = text;
    this.parent = parent;
    this.chars = this.parseCharacter(text);
    this.clean = _.replace(this.text, /((?![0-9a-zA-Z\'\-]).)/gi, "");
  }

  next(onlyInParent?: boolean): Word | null {
    return nextNode<Sentence, Word>(this.parent, this.index, onlyInParent);
  }

  prev(onlyInParent?: boolean): Word | null {
    return prevNode<Sentence, Word>(this.parent, this.index, onlyInParent);
  }

  findChildrenById(id: string): Character | null {
    return findChildNodeByProps<Character>(this.chars, "id", id);
  }

  findChildrenByIndex(index: number): Character | null {
    return findChildNodeByProps<Character>(this.chars, "index", index);
  }

  charCount(): number {
    return this.text.length;
  }

  private parseCharacter(text: string): Character[] {
    return _
      .chain(text)
      .split("")
      .map((text, index) => new Character(this, text, index))
      .value();
  }
}

export default Word;
