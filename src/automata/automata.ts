import { AutomataState } from './automata-state';
import { AutomataTransitions } from './automata-transitions';

export class Automata<stateT extends AutomataState> {
    finalStates: stateT[] = [];
    states: stateT[] = [];
    transitions: AutomataTransitions<stateT>[] = [];
    constructor(
        public startState: stateT,
        public isNfa: boolean,
    ) {
        this.states.push(startState);
    }
    toDot(): string {
        this.states.forEach((x, i) => x.id = i.toString());
        return `
digraph ${this.isNfa ? 'nfa' : 'dfa'} {
    rankdir=LR;
    size="8,5"
    node [shape=none,width=0,height=0,margin=0];
    start [label=""];
${this.states.map(x => `    ${x.id} [label="${x.name}",shape=${this.finalStates.includes(x) ? 'doublecircle' : 'circle'}];`).join('\n')}
${this.transitions.map(x => `    ${x.fromState.id} -> ${x.toState.id} [label="${x.symbol}"]`).join('\n')}
    start -> ${this.startState.id};
}`;
    }
}
