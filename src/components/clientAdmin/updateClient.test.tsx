import React from 'react';
import {
    render, waitFor, cleanup, queryByAttribute
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    Router
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import UpdateClient from './updateClient';
import StoreContext from '../../contexts/storeContext';
import RootStore from '../../stores/rootStore';
import * as ClientService from '../../services/clientService';

afterEach(cleanup);

let rootStore:RootStore;

beforeEach(() => {
    rootStore = new RootStore();
});

test('updateClient render', async () => {
    const history = createMemoryHistory();
    history.push('/clients/testClient');

    const dom = render(<StoreContext.Provider value={rootStore}><Router history={history}><UpdateClient /></Router></StoreContext.Provider>);
    await (await waitFor(() => expect(ClientService.getClientById))).toHaveBeenCalled();

    // check if input values match mock API
    const nameInput = dom.getByTestId('name');
    expect(nameInput.value).toBe('Client 1 to update');
    const activeInput = dom.getByTestId('active');
    expect(activeInput.checked).toBe(true);
    const contractStartInput = queryByAttribute('name', dom.container, 'contractStart');
    expect(contractStartInput.value).toBe('11/12/2020');
    const contractEndInput = queryByAttribute('name', dom.container, 'contractEnd');
    expect(contractEndInput.value).toBe('11/12/2021');
});
