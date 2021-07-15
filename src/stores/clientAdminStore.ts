import {
    observable, action, makeObservable, runInAction
} from 'mobx';
import { toast } from 'react-toastify';
import ClientListDto from '../dtos/clientListDto';
import CreateClientDto from '../dtos/createClientDto';
import UpdateClientDto from '../dtos/updateClientDto';
import ClientFormDto from '../dtos/clientFormDto';
import * as ClientService from '../services/clientService';
import type RootStore from './rootStore';
import { getContent } from '../utils/contentUtils';
import AppConstants from '../constants/appConstants';

class ClientAdminStore {
    rootStore: RootStore;

    @observable clientToUpdate!: UpdateClientDto;
    @observable clients: ClientListDto[] = [];
    @observable updatingClient: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action async initClientList() {
        const { appStore, loggingStore } = this.rootStore;

        try {
            appStore.showAppLoader();

            const clientsJson = await ClientService.getClients();
            const clients: ClientListDto[] = [];

            for (let i = 0; i < clientsJson.length; i++) {
                const clientJson = clientsJson[i];
                const client = new ClientListDto(
                    clientJson.id,
                    clientJson.name,
                    new Date(clientJson.contractStartDate),
                    new Date(clientJson.contractEndDate),
                    clientJson.active
                );
                client.id = clientJson.id;
                clients.push(client);
            }

            // setting values in async calls need this wrapper
            runInAction(() => {
                this.clients = clients;
            });

            appStore.hideAppLoader();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action async initClientCreate() {
        const { appStore } = this.rootStore;

        runInAction(() => {
            this.updatingClient = false;
        });

        appStore.hideAppLoader();
    }

    @action async initClientUpdate(id: string) {
        const { appStore, loggingStore } = this.rootStore;

        try {
            appStore.showAppLoader();

            const clientJson = await ClientService.getClientById(id);
            const client = new UpdateClientDto(
                clientJson.id,
                clientJson.name,
                clientJson.contractStart,
                clientJson.contractEnd,
                clientJson.active,
                clientJson.pairingToken
            );
            client.id = clientJson.id;

            // setting values in async calls need this wrapper
            runInAction(() => {
                this.updatingClient = true;
                this.clientToUpdate = client;
            });

            appStore.hideAppLoader();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action async updateClient(clientForm: ClientFormDto) {
        const {
            appStore, navigationStore, loggingStore, errorStore
        } = this.rootStore;

        try {
            const client: UpdateClientDto = new UpdateClientDto(
                clientForm.id!,
                clientForm.name,
                (clientForm.contractStart as Date).toISOString(),
                (clientForm.contractEnd as Date).toISOString(),
                clientForm.active,
                clientForm.pairingToken
            );

            client.userExtRef = AppConstants.user.userExtRef;

            appStore.showAppLoader();
            await ClientService.updateClient(client);
            appStore.hideAppLoader();

            if (errorStore.getErrors().length === 0) {
                toast.success(getContent('clientAdmin.alerts.clientUpdated'));
            }

            navigationStore.gotoHome();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action async updatePairingToken() {
        const {
            appStore, loggingStore, errorStore
        } = this.rootStore;

        try {
            const id = this.clientToUpdate.id;
            if (!id) {
                throw new Error('No client Id - unable to update pairing token');
            }

            appStore.showAppLoader();
            const newToken = await ClientService.updatePairingToken(id);
            appStore.hideAppLoader();

            // Check for errors and check that client hasn't changed since the update process began
            if (errorStore.getErrors().length === 0 && this.clientToUpdate.id === id) {
                // setting values in async calls need this wrapper
                runInAction(() => {
                    this.clientToUpdate.pairingToken = newToken;
                });

                toast.success(getContent('clientAdmin.alerts.pairingTokenUpdated'));
            }
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action async createClient(clientForm: ClientFormDto) {
        const { navigationStore, appStore, loggingStore } = this.rootStore;

        try {
            const client: CreateClientDto = new CreateClientDto(
                clientForm.name,
                (clientForm.contractStart as Date).toISOString(),
                (clientForm.contractEnd as Date).toISOString(),
                clientForm.active,
                AppConstants.user.userExtRef
            );
            appStore.showAppLoader();
            await ClientService.createClient(client);
            appStore.hideAppLoader();
            toast.success(getContent('clientAdmin.alerts.clientCreated'));

            navigationStore.gotoHome();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }
}

export default ClientAdminStore;
