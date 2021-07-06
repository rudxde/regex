import type { Letter } from './letter';

export abstract class RegexTree {
    abstract empty(): boolean;
    abstract first(): Letter[];
    abstract setNext(next: Letter[]): void;
    abstract next(): Letter[];
    abstract last(): Letter[];
    abstract allLetters(): Letter[];
}
