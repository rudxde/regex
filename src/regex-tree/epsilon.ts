import { Letter } from './letter';
import { RegexTree } from './regex-tree';

export class Epsilon extends RegexTree {
    empty(): boolean {
        return true;
    }
    first(): Letter[] {
        return [];
    }
    setNext(next: Letter[]): void {
    }
    next(): Letter[] {
        return [];
    }
    last(): Letter[] {
        return [];
    }
    allLetters(): Letter[] {
        return [];
    }
}
