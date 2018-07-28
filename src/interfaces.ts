import Sentence from "./Sentence";
import Paragraph from "./Paragraph";
import Word from "./Word";
import Character from "./Character";
import Paratree from ".";

export interface IParaNode {
  id: string;
  index: number;
  text: string;
  data: Map<string, any>;
}

export interface IParaNodeMethod<T extends IParaNode, C extends IParaNode> {
  findChildrenById(id: string): C | null;
  findChildrenByIndex(index: number): C | null;
  next(onlyInParent?: boolean): T | null;
  prev(onlyInParent?: boolean): T | null;
}

// export interface IText {
//     paragraphs: Paragraph[];
//     findParagraphById(id: string): Paragraph | null;
//     findParagraphByIndex(index: number): Paragraph | null;
// }

export interface IParagraph {
  sentences: Sentence[];
  parent: Paratree;
  findSentenceById(id: string): Sentence | null;
  findSentenceByIndex(index: number): Sentence | null;
}

export interface ISentence {
  parent: Paragraph;
  words: Word[];
  findWordById(id: string): Word | null;
  findWordByIndex(index: number): Word | null;
}

export interface IWord {
  parent: Sentence;
  chars: Character[];
  clean: string;
  charCount(): number;
}

export interface ICharacter {
  parent: Word;
}
