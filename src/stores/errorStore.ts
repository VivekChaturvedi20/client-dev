/* eslint-disable class-methods-use-this */
/* eslint-disable-next-line class-methods-use-this */
import { makeObservable, action, observable } from 'mobx';
import type RootStore from './rootStore';

class ErrorStore {
    rootStore: RootStore;

    errors:Error[] = observable.array([]);

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action async addError(error:Error) {
        this.errors.push(error);
    }

    @action removeError(error:Error) {
        this.errors.remove(error);
    }

    @action getErrors() {
        return this.errors;
    }

    @action clearErrors() {
        this.errors.clear();
    }
}

export default ErrorStore;
