import { Automata } from './automata/automata';
import { AutomataState, DfaState } from './automata/automata-state';
import { AutomataTransitions } from './automata/automata-transitions';



export function nfaToDfa(nfa: Automata<AutomataState>): Automata<DfaState> {
    const startState = new DfaState([nfa.startState]);
    const dfa = new Automata(startState, false);
    if (nfa.finalStates.includes(nfa.startState)) {
        dfa.finalStates.push(startState);
    }
    const newStates = [startState];


    while (newStates.length > 0) {
        const fromState = newStates.pop()!;
        const nfaTransitions = transitionsOfStates(fromState.nfaStates, nfa.transitions);
        const nfaTransitionsGrouped = groupTransitions(nfaTransitions);


        for (let [key, transitions] of nfaTransitionsGrouped.entries()) {
            let dfaToState = new DfaState(transitions.map(x => x.toState));
            const final = nfa.finalStates.some(x => dfaToState.nfaStates.includes(x));
            const equalState = dfaHasEqualState(dfa, dfaToState, final);
            if (equalState) {
                dfaToState = equalState;
            } else {
                newStates.push(dfaToState);
                dfa.states.push(dfaToState);
                dfa.finalStates.push(...(final ? [dfaToState] : []));
            }
            dfa.transitions.push(new AutomataTransitions(fromState, key, dfaToState));
        }
    }



    return dfa;
}

function dfaHasEqualState(dfa: Automata<DfaState>, state: DfaState, final: boolean): DfaState | undefined {
    return dfa.states.find(x => {
        if (x.nfaStates.length !== state.nfaStates.length) return false;
        for (let nfaState of state.nfaStates) {
            if (!x.nfaStates.includes(nfaState)) {
                return false;
            }
        }
        if (dfa.finalStates.includes(x) ? !final : final) {
            return false;
        }
        return true;
    });
}

function groupTransitions<stateT extends AutomataState>(transitions: AutomataTransitions<stateT>[]): Map<string, AutomataTransitions<stateT>[]> {
    const res = new Map<string, AutomataTransitions<stateT>[]>();
    for (let transition of transitions) {
        if (!res.has(transition.symbol)) {
            res.set(transition.symbol, []);
        }
        res.get(transition.symbol)!.push(transition);
    }
    return res;
}

function transitionsOfStates<stateT extends AutomataState>(state: stateT[], allTransitions: AutomataTransitions<stateT>[]): AutomataTransitions<stateT>[] {
    return state.reduce<AutomataTransitions<stateT>[]>((acc, val) => [...acc, ...transitionsOfState(val, allTransitions)], []);
}

function transitionsOfState<stateT extends AutomataState>(state: stateT, allTransitions: AutomataTransitions<stateT>[]): AutomataTransitions<stateT>[] {
    return allTransitions.filter(x => x.fromState === state);
}
