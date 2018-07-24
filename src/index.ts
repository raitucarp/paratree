import * as uuid from "uuid";
import * as _ from "lodash";
import { IParaNode, IParaNodeMethod } from "./interfaces";
import Text from "./Text";
import Paragraph from "./Paragraph";
import { findChildNodeByProps } from "./Util";

class Paratree implements IParaNode, IParaNodeMethod<Paratree, Text> {
    readonly id: string = uuid.v4();
    readonly text: string;
    readonly index = 0;
    texts: Text[];
    paragraphs: Paragraph[];

    constructor(...texts: string[]) {
        this.texts = this.parseText(texts);

        this.paragraphs = this.getAllParagraph(this.texts);
        this.text = this.texts.join('\n\n');
    }

    private parseText(texts: string[]): Text[] {
        return _.chain(texts)
        .map((text, index) => new Text(this, text, index))
        .value();
    }

    private getAllParagraph(texts: Text[]): Paragraph[] {
        return _.chain(texts)
            .map(text => text.paragraphs)
            .flatten()
            .value();
    }

    findChildrenById(id: string): Text | null {
        return findChildNodeByProps<Text>(this.texts, "id", id);
    }

    findChildrenByIndex(index: number): Text | null {
        return findChildNodeByProps<Text>(this.texts, "index", index);
    }

    next(): null {
        return null;
    }


    prev(): null {
        return null
    }

}

export default Paratree;