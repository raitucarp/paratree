import * as uuid from 'uuid';
import * as _ from 'lodash';
import Word from './Word';
import { IParaNode, ISentence, IParaNodeMethod } from './interfaces';
import Paragraph from './Paragraph';
import { findChildNodeByProps, nextNode, prevNode } from './Util';

class Sentence implements IParaNode, ISentence, IParaNodeMethod<Sentence, Word> {
    readonly id: string = uuid.v4();
    readonly index: number;
    readonly text: string;
    parent: Paragraph;
    words: Word[];

    constructor(parent: Paragraph, text: string, index: number = 0) {
        this.index = index;
        this.text = text;
        this.words = this.parseWord(text);
        this.parent = parent;
    }

    findWordById(id: string): Word | null {
        return this.findChildrenById(id);
    }

    findWordByIndex(index: number): Word | null {
        return this.findChildrenByIndex(index);
    }

    findChildrenById(id: string): Word | null {
        return findChildNodeByProps<Word>(this.words, "id", id);
    }

    findChildrenByIndex(index: number): Word | null {
        return findChildNodeByProps<Word>(this.words, "index", index);
    }

    next(onlyInParent?: boolean): Sentence | null {
        return nextNode<Paragraph, Sentence>(this.parent, onlyInParent);
    }

    prev(onlyInParent?: boolean): Sentence | null {
        return prevNode<Paragraph, Sentence>(this.parent, onlyInParent);
    }

    private parseWord(text: string): Word[] {
        return _.chain(text)
        .split(/\s{1,}/ig)
        .map((text, index) => new Word(this, text, index))
        .value();
    }
}

export default Sentence;