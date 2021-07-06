import { Concat } from './regex-tree/concat';
import { Epsilon } from './regex-tree/epsilon';
import { Letter } from './regex-tree/letter';
import { Or } from './regex-tree/or';
import { RegexTree } from './regex-tree/regex-tree';
import { Star } from './regex-tree/start';

export function epsilon(): Epsilon {
    return new Epsilon();
}
export function letter(l: string): Letter {
    return new Letter(l);
}
export function concat(l: RegexTree, r: RegexTree): Concat {
    return new Concat(l,r);
}
export function or(l: RegexTree, r: RegexTree): Or {
    return new Or(l,r);
}
export function star(r: RegexTree): Star {
    return new Star(r);
}
