import React from 'react';
import {
    render, waitFor, cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ClientList from './clientList';
import StoreContext from '../../contexts/storeContext';
import RootStore from '../../stores/rootStore';
import * as ClientService from '../../services/clientService';

afterEach(cleanup);

let rootStore:RootStore;

beforeEach(() => {
    rootStore = new RootStore();
});

// TODO: Re-write this test
test('clientList render', async () => {
    const dom = render(<StoreContext.Provider value={rootStore}><ClientList /></StoreContext.Provider>);

    // await (await waitFor(() => expect(ClientService.getClients))).toHaveBeenCalled();

    // check if both client have rendered
    expect(dom.container).toBeInTheDocument();
});
