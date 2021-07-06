export class AutomataState {
    public id: string | undefined;
    constructor(
        public name: string,
    ) { }
}

export class DfaState extends AutomataState {
    constructor(
        public nfaStates: AutomataState[],
    ) {
        super(nfaStates.map(x => x.name).join(','));
    }
}
