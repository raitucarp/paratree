import * as _ from "lodash";
import { IText, IParaNode, IParaNodeMethod } from './interfaces';
import Paragraph from './Paragraph';
import * as uuid from 'uuid';
import { findChildNodeByProps } from "./Util";
import Paratree from ".";

class Text implements IParaNode, IText, IParaNodeMethod<Text, Paragraph> {
    readonly id: string = uuid.v4();
    readonly text: string;
    readonly index: number;
    paragraphs: Paragraph[];
    parent: Paratree;

    constructor(parent: Paratree, text: string, index: number = 0) {
        this.paragraphs = this.parseParagraph(text);
        this.text = text;
        this.index = index;
        this.parent = parent;
    }

    private parseParagraph(text: string): Paragraph[] {
        return _.chain(text)
        .split('\n')
        .compact()
        .map((text, index) => new Paragraph(this, text, index))
        .value();
    }

    findParagraphById(id: string): Paragraph | null {
        return this.findChildrenById(id);
    }

    findParagraphByIndex(index: number): Paragraph | null {
        return this.findChildrenByIndex(index);
    }

    findChildrenById(id: string): Paragraph | null {
        return findChildNodeByProps<Paragraph>(this.paragraphs, "id", id);
    }

    findChildrenByIndex(index: number): Paragraph | null {
        return findChildNodeByProps<Paragraph>(this.paragraphs, "index", index);
    }

    next(): Text | null {
        return this.parent.findChildrenByIndex(this.index + 1)
    }

    prev(): Text | null {
        return this.parent.findChildrenByIndex(this.index - 1);
    }
}

export default Text;