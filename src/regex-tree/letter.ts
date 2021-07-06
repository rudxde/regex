import { AutomataState } from '../automata/automata-state';
import { RegexTree } from './regex-tree';

export class Letter extends RegexTree {
    private static indexCounter = 1;
    public index: number;
    public dfaState: AutomataState | undefined;
    private _next: Letter[] | undefined;
    constructor(
        public letter: string,
    ) {
        super();
        this.index = Letter.indexCounter++;
    }
    empty(): boolean {
        return false;
    }
    first(): Letter[] {
        return [this];
    }
    setNext(next: Letter[]): void {
        this._next = next;
    }
    next(): Letter[] {
        return this._next!;
    }
    last(): Letter[] {
        return [this];
    }
    allLetters(): Letter[] {
        return [this];
    }
}
