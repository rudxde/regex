import { parse } from './parse';
import { regexToNfa } from './regex-to-nfa';
import { nfaToDfa } from './nfa-to-dfa';

const regex = parse('(foo|bar)*|ba*z');
const nfa = regexToNfa(regex);
const dfa = nfaToDfa(nfa);
console.log(dfa.toDot());
