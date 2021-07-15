import React from 'react';
import {
    render, cleanup, queryAllByAttribute, queryByAttribute
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RootStore from '../stores/rootStore';
import StoreContext from '../contexts/storeContext';
import AppLoader from './appLoader';

afterEach(cleanup);

let rootStore: RootStore;

beforeEach(() => {
    rootStore = new RootStore();
});

test('appLoader render loading', async () => {
    rootStore.appStore.loading = true;
    const dom = render(<StoreContext.Provider value={rootStore}><AppLoader /></StoreContext.Provider>);
    const container: HTMLElement = (dom.baseElement as HTMLElement);
    const appLoader = queryByAttribute('class', container, 'app-loader modal');
    expect(appLoader).not.toBeNull();
});

test('appLoader render not loading', async () => {
    rootStore.appStore.loading = false;
    const dom = render(<StoreContext.Provider value={rootStore}><AppLoader /></StoreContext.Provider>);
    const container: HTMLElement = (dom.baseElement as HTMLElement);
    const appLoader = queryByAttribute('class', container, 'app-loader modal');
    expect(appLoader).toBeNull();
});
