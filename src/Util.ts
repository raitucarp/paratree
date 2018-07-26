import Sentence from "./Sentence";
import Word from "./Word";
import _ from "lodash";
import { IParaNode, IParaNodeMethod } from "./interfaces";

export function findChildNodeByProps<T extends IParaNode>(
  child: T[],
  props: keyof IParaNode,
  value: T[keyof IParaNode]
): T | null {
  return _.find(child, (o: T) => o[props] == value) || null;
}

export function nextNode<
  P extends IParaNode & IParaNodeMethod<P, T>,
  T extends IParaNode
>(parent: P, currentIndex: number, onlyInParent?: boolean): T | null {
  if (onlyInParent) {
    const nextNode = parent.findChildrenByIndex(currentIndex + 1);
    if (nextNode) return nextNode;
    return null;
  }

  const nextParent = parent.next();
  if (nextParent) {
    const nextNode = nextParent.findChildrenByIndex(0);
    return nextNode;
  }

  return null;
}

export function prevNode<
  P extends IParaNode & IParaNodeMethod<P, T>,
  T extends IParaNode
>(parent: P, currentIndex: number, onlyInParent?: boolean): T | null {
  if (onlyInParent) {
    const prevNode = parent.findChildrenByIndex(currentIndex - 1);
    if (prevNode) return prevNode;
    return null;
  }

  const prevParent = parent.prev();
  if (prevParent) {
    const lastIndexOfSentence = 1;
    const prevNode = prevParent.findChildrenByIndex(lastIndexOfSentence);
    return prevNode;
  }

  return null;
}

// export function findNextNode<T>(only): T {

// }
