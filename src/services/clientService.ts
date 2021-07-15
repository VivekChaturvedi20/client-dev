import request from 'superagent';
import config from '../config/config';
import CreateClientDto from '../dtos/createClientDto';
import UpdateClientDto from '../dtos/updateClientDto';
import UpdateClientSchema from '../validation/schemas/updateClient';
import CreateClientSchema from '../validation/schemas/createClient';
import * as authUtils from '../utils/authUtils';

const apiUrl = config.clientApiUrl;

export async function getClients() {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    const clients = await request
        .get(`${apiUrl}/v1/Clients?pageNumber=1&pageSize=100`)
        .set(defaultHeaders);

    return clients.body;
}

export async function getClientById(id: string) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    const client = await request
        .get(`${apiUrl}/v1/Clients/${id}`)
        .set(defaultHeaders);

    return client.body;
}

export async function createClient(client: CreateClientDto) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    await CreateClientSchema().validate(client);
    await request
        .put(`${apiUrl}/v1/Clients`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .send(client);
}

export async function updateClient(client: UpdateClientDto) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    await UpdateClientSchema().validate(client);
    await request
        .post(`${apiUrl}/v1/Clients`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .send(client);
}

export async function updatePairingToken(id: string): Promise<string> {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    const response = await request
        .post(`${apiUrl}/v1/ClientPairing`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .send({ clientId: id });

    if (!response.ok) {
        throw Error('Error retrieving new pairing token');
    }

    return response.body.newPairingToken;
}
