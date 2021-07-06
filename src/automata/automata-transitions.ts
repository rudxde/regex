import { AutomataState } from './automata-state';

export class AutomataTransitions<stateT extends AutomataState> {
    constructor(
        public fromState: stateT,
        public symbol: string,
        public toState: stateT,
    ) { }
}
