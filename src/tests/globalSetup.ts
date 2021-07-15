import request from 'superagent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ContentEnUs from '../content/en-US.json';
import * as ContentUtils from '../utils/contentUtils';
import RootStore from '../stores/rootStore';
import * as ClientService from '../services/clientService';

library.add(fab, fas);
const rootStore = new RootStore();

rootStore.contentStore.content = ContentEnUs;
// TODO: not a good idea, would prefer to create and destory stores within the context
// of a test suite, but for now content remains static so setting store globably won't have side effects
ContentUtils.setContentStore(rootStore.contentStore);

jest.mock('../config/config');
jest.mock('../utils/authUtils', () => ({
    getAuthInstance: () => ({
        getActiveAccount: () => ({
            userName: 'User 1'
        })
    }),
    getAccessToken: () => ({
        accessToken: 'xxxxxx'
    }),
    getDefaultHeaders: () => ({
        Authorization: 'Bearer xxxxxx'
    })
}));
jest.mock('../stores/loggingStore', () => jest.fn().mockImplementation(() => ({
    logError: jest.fn()
})));
jest.mock('../stores/errorStore', () => jest.fn().mockImplementation(() => ({
    addError: jest.fn()
})));

mockSuperagent();
mockClientService();

function mockSuperagent() {
    request.send = jest.fn().mockResolvedValue({
        success: true
    });
}

function mockClientService() {
    ClientService.getClients = jest.fn().mockResolvedValue([
        {
            id: 'fb6a986f-fbdb-4f38-8268-8d0ff653724e',
            name: 'Client 1',
            contractStartDate: new Date('11/12/2020'),
            contractEndDate: new Date('11/12/2021'),
            active: true
        },
        {
            id: '14817091-7564-44d9-80c2-61aab72f2c8a',
            name: 'Client 2',
            contractStartDate: new Date('12/12/2020'),
            contractEndDate: new Date('12/12/2021'),
            active: true
        }
    ]);

    ClientService.getClientById = jest.fn().mockResolvedValue({
        id: 'fb6a986f-fbdb-4f38-8268-8d0ff653724a',
        name: 'Client 1 to update',
        contractStart: new Date('11/12/2020').toISOString(),
        contractEnd: new Date('11/12/2021').toISOString(),
        active: true
    });
}
