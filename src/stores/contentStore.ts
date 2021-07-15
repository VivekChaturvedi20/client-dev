import { observable, makeObservable } from 'mobx';
import type RootStore from './rootStore';

class ContentStore {
    rootStore: RootStore;

    @observable content: object;

    constructor(rootStore:RootStore) {
        this.rootStore = rootStore;
        this.content = {};
        makeObservable(this);
    }
}

export default ContentStore;
