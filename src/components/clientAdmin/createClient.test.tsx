import React from 'react';
import {
    render, cleanup, queryByAttribute
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    Router
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateClient from './createClient';
import StoreContext from '../../contexts/storeContext';
import RootStore from '../../stores/rootStore';

afterEach(cleanup);

let rootStore:RootStore;

beforeEach(() => {
    rootStore = new RootStore();
});

test('createClient render', async () => {
    const history = createMemoryHistory();
    history.push('/clients/create');

    const dom = render(<StoreContext.Provider value={rootStore}><Router history={history}><CreateClient /></Router></StoreContext.Provider>);

    // check if input values are defaults
    const nameInput = dom.getByTestId('name');
    expect(nameInput.value).toBe('');
    const activeInput = dom.getByTestId('active');
    expect(activeInput.checked).toBe(true);
    const contractStartInput = queryByAttribute('name', dom.container, 'contractStart');
    expect(contractStartInput.value).toBe('');
    const contractEndInput = queryByAttribute('name', dom.container, 'contractEnd');
    expect(contractEndInput.value).toBe('');
});
