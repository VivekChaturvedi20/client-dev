/* eslint-disable class-methods-use-this */
/* eslint-disable-next-line class-methods-use-this */
import { makeObservable, action } from 'mobx';
import history from '../utils/history';
import type RootStore from './rootStore';

class NavigationStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action gotoCreateClient() {
        const { loggingStore } = this.rootStore;
        try {
            history.push('/clients/create');
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action gotoHome() {
        const { loggingStore } = this.rootStore;
        try {
            history.push('/');
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action gotoUpdateClient(id: string) {
        const { loggingStore } = this.rootStore;
        try {
            this.rootStore.appStore.showAppLoader();
            history.push(`/clients/${id}/update`);
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action goBack() {
        const { loggingStore } = this.rootStore;
        try {
            history.goBack();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }
}

export default NavigationStore;
