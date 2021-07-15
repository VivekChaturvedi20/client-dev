import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';
import { getContent } from '../../utils/contentUtils';
import UpdateClientDto from '../../dtos/updateClientDto';
import StoreContext from '../../contexts/storeContext';
import styles from './pairingToken.module.scss';

function PairingToken() {
    const { clientAdminStore } = useContext(StoreContext);

    if (clientAdminStore && clientAdminStore.updatingClient) {
        const client: UpdateClientDto = clientAdminStore.clientToUpdate;

        const clickUpdatePairingToken = async () => {
            await clientAdminStore.updatePairingToken();
        };

        const copyPairingToken = async () => {
            if (client.pairingToken) {
                await navigator.clipboard.writeText(client.pairingToken);
                toast.success(getContent('clientAdmin.alerts.pairingTokenCopied'));
            }
        };

        let label = null;
        let tokenDiv = null;
        let copyButton = null;
        if (client.pairingToken) {
            label = <label htmlFor="pairingToken" className="form-label">{getContent('clientAdmin.labels.pairingToken')}</label>;
            tokenDiv = <div id="pairingToken">{client.pairingToken}</div>;
            copyButton = <Button type="button" onClick={copyPairingToken}>{getContent('clientAdmin.labels.copyPairingTokenButton')}</Button>;
        }

        return (
            <>
                {label}
                <div>
                    {tokenDiv}
                    <div className={styles['buttons-container']}>
                        <Button type="button" onClick={clickUpdatePairingToken}>{getContent('clientAdmin.labels.updatePairingTokenButton')}</Button>
                        {copyButton}
                    </div>
                </div>
            </>
        );
    }

    return null;
}

export default observer(PairingToken);
