import { ValidationError } from 'yup';
import * as ClientService from './clientService';
import CreateClientDto from '../dtos/createClientDto';
import UpdateClientDto from '../dtos/updateClientDto';
import AppConstants from '../constants/appConstants';

test('clientService createClient validation fail', async () => {
    const client:CreateClientDto = new CreateClientDto('Client name', new Date().toISOString(), new Date().toISOString(), true, 'extRef');
    client.name = '';
    await expect(ClientService.createClient(client)).rejects.toThrow(ValidationError);
});

test('clientService createClient valid', async () => {
    const client:CreateClientDto = new CreateClientDto('Client name', new Date().toISOString(), new Date().toISOString(), true, 'extRef');
    client.userExtRef = AppConstants.user.userExtRef;
    await expect(ClientService.createClient(client)).rejects.not.toThrow(Error);
});

test('clientService updateClient validation fail', async () => {
    const client:UpdateClientDto = new UpdateClientDto('someId', 'Client name', new Date().toISOString(), new Date().toISOString(), true);
    client.userExtRef = AppConstants.user.userExtRef;
    client.id = '';
    client.name = '';
    await expect(ClientService.updateClient(client)).rejects.toThrow(ValidationError);
});

test('clientService updateClient valid', async () => {
    const client:UpdateClientDto = new UpdateClientDto('someId', 'Client name', new Date().toISOString(), new Date().toISOString(), true);
    client.userExtRef = AppConstants.user.userExtRef;
    await expect(ClientService.updateClient(client)).rejects.not.toThrow(Error);
});
