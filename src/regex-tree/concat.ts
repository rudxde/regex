import { Letter } from './letter';
import { RegexTree } from './regex-tree';

export class Concat extends RegexTree {
    private _next: Letter[] | undefined;
    constructor(
        public left: RegexTree,
        public right: RegexTree,
    ) {
        super();
    }
    empty(): boolean {
        return this.left.empty() && this.right.empty();
    }
    first(): Letter[] {
        return [
            ...this.left.first(),
            ...(this.left.empty() ? this.right.first() : []),
        ];
    }
    setNext(next: Letter[]): void {
        this._next = next;
        this.left.setNext([...this.right.first(), ...(this.right.empty() ? next : [])]);
        this.right.setNext(next);
    }
    next(): Letter[] {
        return this._next!;
    }
    last(): Letter[] {
        if (this.right.empty()) {
            return [...this.left.last(), ...this.left.last()];
        } else {
            return this.right.last();
        }
    }
    allLetters(): Letter[] {
        return [
            ...this.left.allLetters(),
            ...this.right.allLetters(),
        ];
    }
}
