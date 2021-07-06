import { Letter } from './letter';
import { RegexTree } from './regex-tree';

export class Or extends RegexTree {
    private _next: Letter[] | undefined;
    constructor(
        public left: RegexTree,
        public right: RegexTree,
    ) { 
        super();
    }
    empty(): boolean {
        return this.left.empty() || this.right.empty();
    }
    first(): Letter[] {
        return [
            ...this.left.first(),
            ...this.right.first(),
        ];
    }
    setNext(next: Letter[]): void {
        this._next = next;
        this.left.setNext(next);
        this.right.setNext(next);
    }
    next(): Letter[] {
        return this._next!;
    }
    last(): Letter[] {
        return [
            ...this.left.last(),
            ...this.right.last(),
        ];
    }
    allLetters(): Letter[] {
        return [
            ...this.left.allLetters(),
            ...this.right.allLetters(),
        ];
    }
}
