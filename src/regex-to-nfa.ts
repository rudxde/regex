import { Automata } from './automata/automata';
import { AutomataState } from './automata/automata-state';
import { AutomataTransitions } from './automata/automata-transitions';
import { RegexTree } from './regex-tree/regex-tree';

export function regexToNfa(regex: RegexTree): Automata<AutomataState> {
    const startState = new AutomataState('e');
    const nfa = new Automata(startState, true);
    regex.allLetters().forEach(letter => {
        const state = new AutomataState(`${letter.index}`);
        letter.dfaState = state;
        nfa.states.push(state);
    });
    if (regex.empty()) {
        nfa.finalStates.push(startState);
    }
    regex.last().forEach(x => nfa.finalStates.push(x.dfaState!));

    regex.first().forEach(letter => {
        nfa.transitions.push(new AutomataTransitions(startState, letter.letter, letter.dfaState!));
    });

    regex.allLetters().forEach(letter => {
        letter?.next().forEach(nextLetter => {
            nfa.transitions.push(new AutomataTransitions(letter.dfaState!, nextLetter.letter, nextLetter.dfaState!));
        });
    });
    return nfa;
}
