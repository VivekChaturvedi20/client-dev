import { ValidationError } from 'yup';
import ClientAdminStore from './clientAdminStore';
import RootStore from './rootStore';
import AppConstants from '../constants/appConstants';
import ClientFormDto from '../dtos/clientFormDto';

let rootStore:RootStore;
let clientAdminStore:ClientAdminStore;

beforeEach(() => {
    rootStore = new RootStore();
    clientAdminStore = rootStore.clientAdminStore;
});

test('clientAdminStore initClientList', async () => {
    await clientAdminStore.initClientList();

    const { clients } = clientAdminStore;

    expect(clients.length).toBe(2);
    expect(clients[0].name).toBe('Client 1');
    expect(clients[0].active).toBe(true);
    expect(clients[0].contractStartDate).toStrictEqual(new Date('11/12/2020'));
    expect(clients[0].contractEndDate).toStrictEqual(new Date('11/12/2021'));

    expect(clients[1].name).toBe('Client 2');
    expect(clients[1].active).toBe(true);
    expect(clients[1].contractStartDate).toStrictEqual(new Date('12/12/2020'));
    expect(clients[1].contractEndDate).toStrictEqual(new Date('12/12/2021'));
});

test('clientAdminStore initClientCreate', async () => {
    await clientAdminStore.initClientCreate();

    const { updatingClient } = clientAdminStore;

    expect(updatingClient).toBe(false);
});

test('clientAdminStore initClientUpdate', async () => {
    await clientAdminStore.initClientUpdate('someId');

    const { clientToUpdate, updatingClient } = clientAdminStore;

    expect(clientToUpdate.name).toBe('Client 1 to update');
    expect(clientToUpdate.active).toBe(true);
    expect(new Date(clientToUpdate.contractStart)).toStrictEqual(new Date('11/12/2020'));
    expect(new Date(clientToUpdate.contractEnd)).toStrictEqual(new Date('11/12/2021'));
    expect(updatingClient).toBe(true);
});

test('clientAdminStore createClient validation fail', async () => {
    const client:ClientFormDto = new ClientFormDto();
    client.contractStart = new Date();
    client.contractEnd = new Date();
    await expect(clientAdminStore.createClient(client)).rejects.toThrow(ValidationError);
});

test('clientAdminStore createClient valid', async () => {
    const client:ClientFormDto = new ClientFormDto();
    client.name = 'Some client';
    client.contractStart = new Date();
    client.contractEnd = new Date();
    client.active = true;
    await expect(clientAdminStore.createClient(client)).rejects.not.toThrow(Error);
});

test('clientAdminStore updateClient validation fail', async () => {
    const client:ClientFormDto = new ClientFormDto();
    client.contractStart = new Date();
    client.contractEnd = new Date();
    await expect(clientAdminStore.updateClient(client)).rejects.toThrow(ValidationError);
});

test('clientAdminStore updateClient valid', async () => {
    const client:ClientFormDto = new ClientFormDto();
    client.id = 'someId';
    client.name = 'Some client';
    client.contractStart = new Date();
    client.contractEnd = new Date();
    client.active = true;
    await expect(clientAdminStore.updateClient(client)).rejects.not.toThrow(Error);
});
