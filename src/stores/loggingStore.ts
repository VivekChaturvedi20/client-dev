/* eslint-disable class-methods-use-this */
/* eslint-disable-next-line class-methods-use-this */
import { makeObservable, action } from 'mobx';
import type RootStore from './rootStore';
import * as LoggingService from '../services/loggingService';

class LoggingStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action async logError(error: Error) {
        const { appStore, errorStore } = this.rootStore;

        // Logging error which will trigger error modal
        errorStore.addError(error);

        // Hiding App Loader if it was open.
        appStore.hideAppLoader();

        try {
            await LoggingService.logError(error);
        } catch (err) {
            errorStore.addError(err);
            throw error;
        }
    }

    @action async userAudit() {
        try {
            await LoggingService.userAudit();
        } catch (error) {
            this.logError(error);
            throw error;
        }
    }
}

export default LoggingStore;
