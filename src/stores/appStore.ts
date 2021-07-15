import { observable, action, makeObservable } from 'mobx';
import type RootStore from './rootStore';

class AppStore {
    rootStore: RootStore;

    @observable loading: boolean = true;
    @observable content: any = {}

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action showAppLoader() {
        this.loading = true;
    }

    @action hideAppLoader() {
        this.loading = false;
    }
}

export default AppStore;
