import React, { useEffect, useContext } from 'react';
import ClientForm from './forms/clientForm';
import StoreContext from '../../contexts/storeContext';
import { getContent } from '../../utils/contentUtils';
import ClientFormDto from '../../dtos/clientFormDto';

function CreateClient() {
    const { navigationStore, clientAdminStore } = useContext(StoreContext);

    const handleCancel = () => {
        navigationStore.gotoHome();
    };

    const handleSave = (clientForm: ClientFormDto) => {
        clientAdminStore.createClient(clientForm);
    };

    // on mount
    useEffect(() => {
        clientAdminStore.initClientCreate();
    }, [clientAdminStore]);

    return (
        <div>
            <h2 className="page-header">{getContent('clientAdmin.createClient.title')}</h2>
            <ClientForm
                initialValues={{
                    name: '',
                    active: true,
                    contractStart: null,
                    contractEnd: null
                }}
                onCancel={handleCancel}
                onSave={handleSave}
            />
        </div>
    );
}

export default CreateClient;
