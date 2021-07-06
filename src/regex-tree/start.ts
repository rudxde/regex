import { Letter } from './letter';
import { RegexTree } from './regex-tree';

export class Star extends RegexTree {
    private _next: Letter[] | undefined;
    constructor(
        public r: RegexTree,
    ) {
        super();
    }
    empty(): boolean {
        return true;
    }
    first(): Letter[] {
        return this.r.first();
    }
    setNext(next: Letter[]): void {
        this._next = next;
        this.r.setNext([...this.r.first(), ...next]);
    }
    next(): Letter[] {
        return this._next!;
    }
    last(): Letter[] {
        return this.r.last();
    }
    allLetters(): Letter[] {
        return this.r.allLetters();
    }
}
