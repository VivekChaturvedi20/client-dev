import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// MSAL imports
import {
    PublicClientApplication, EventType, EventMessage, AuthenticationResult
} from '@azure/msal-browser';
import config from './config/config';

import App from './App';
import RootStore from './stores/rootStore';
import StoreContext from './contexts/storeContext';
import ContentEnUs from './content/en-US.json';
import * as contentUtils from './utils/contentUtils';
import * as authUtils from './utils/authUtils';

const rootStore = new RootStore();

library.add(fab, fas);

(window as any).global = window;

const { contentStore, loggingStore } = rootStore;

contentStore.content = ContentEnUs;
contentUtils.setContentStore(contentStore);

console.info('CONFIG:', config);

export const msalInstance = new PublicClientApplication(config.auth.msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback(async (event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        console.info('MSAL PAYLOAD:', payload);
        msalInstance.setActiveAccount(account);
        try {
            await loggingStore.userAudit();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }
});

authUtils.setAuthInstance(msalInstance);

ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={rootStore}>
            <App pca={msalInstance} />
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
