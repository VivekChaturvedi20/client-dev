import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { getContent } from '../../utils/contentUtils';
import ClientForm from './forms/clientForm';
import UpdateClientDto from '../../dtos/updateClientDto';
import ClientFormDto from '../../dtos/clientFormDto';
import StoreContext from '../../contexts/storeContext';
// import styles from './updateClient.module.scss';

function UpdateClient() {
    const { navigationStore, clientAdminStore, appStore } = useContext(StoreContext);
    const params:any = useParams();

    const handleCancel = () => {
        navigationStore.gotoHome();
    };

    const handleSave = (clientForm: ClientFormDto) => {
        clientAdminStore.updateClient(clientForm);
    };

    // on mount
    useEffect(() => {
        clientAdminStore.initClientUpdate(params.id);
    }, [clientAdminStore, params.id]);

    let formComponent;

    if (!appStore.loading) {
        const client: UpdateClientDto = clientAdminStore.clientToUpdate;

        formComponent = (
            <ClientForm
                initialValues={{
                    id: client.id,
                    name: client.name,
                    contractStart: new Date(client.contractStart),
                    contractEnd: new Date(client.contractEnd),
                    active: client.active,
                    pairingToken: client.pairingToken
                }}
                onCancel={handleCancel}
                onSave={handleSave}
            />
        );
    }

    return (
        <div>
            <h2 className="page-header">{getContent('clientAdmin.updateClient.title')}</h2>
            {formComponent}
        </div>
    );
}

export default observer(UpdateClient);
