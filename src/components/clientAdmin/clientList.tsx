import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Nav } from 'react-bootstrap';
import _ from 'lodash';

// Msal imports
import { MsalAuthenticationTemplate, useMsal, AuthenticatedTemplate } from '@azure/msal-react';
import { InteractionStatus, InteractionType } from '@azure/msal-browser';
import config from '../../config/config';
import { AuthLoading } from '../authentication/authLoading';
import AuthError from '../authentication/authError';

import ClientListTable from './clientListTable';
import ClientListDto from '../../dtos/clientListDto';
import StoreContext from '../../contexts/storeContext';
import { getContent } from '../../utils/contentUtils';
import styles from './clientList.module.scss';

const ClientListContent = observer(() => {
    const { navigationStore, clientAdminStore } = useContext(StoreContext);
    const { inProgress } = useMsal();
    const dataArray: {
        id: string,
        name: string,
        contractStartDate: string,
        contractEndDate: string,
        active: string
    }[] = [];

    // on mount
    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            clientAdminStore.initClientList();
        }
    }, [clientAdminStore, inProgress]);

    const handleGotoCreateClient = () => {
        navigationStore.gotoCreateClient();
    };

    _.each(clientAdminStore.clients, (client: ClientListDto) => {
        dataArray.push(
            {
                id: client.id,
                name: client.name,
                contractStartDate: client.contractStartDateString,
                contractEndDate: client.contractEndDateString,
                active: `${client.active}`
            }
        );
    });

    const columns = React.useMemo(
        () => [
            {
                Header: getContent('clientAdmin.labels.clientName'),
                accessor: 'name',
                Cell: (data: any) => (
                    <span>
                        <Button variant="link" className="link-button" onClick={() => navigationStore.gotoUpdateClient(data.row.original.id)}>{data.row.values.name}</Button>
                    </span>
                )
            },
            {
                Header: getContent('clientAdmin.labels.contractStartDate'),
                accessor: 'contractStartDate'
            },
            {
                Header: getContent('clientAdmin.labels.contractEndDate'),
                accessor: 'contractEndDate'
            },
            {
                Header: getContent('clientAdmin.labels.active'),
                accessor: 'active',
                Cell: (data: any) => (
                    (data.row.original.active === 'true')
                        ? <FontAwesomeIcon icon={['fas', 'check-circle']} className={styles['status-active']} />
                        : <FontAwesomeIcon icon={['fas', 'times-circle']} className={styles['status-inactive']} />
                )
            }
        ],
        [navigationStore]
    );

    return (
        <div className="page">
            <h2 className="page-header">{getContent('clientAdmin.clientList.title')}</h2>
            <Nav className="justify-content-end">
                <Nav.Item>
                    <Button onClick={handleGotoCreateClient}>
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                            &nbsp;&nbsp;
                        {getContent('clientAdmin.clientList.buttons.createClient')}
                    </Button>
                </Nav.Item>
            </Nav>

            <div className={styles['data-table-container']}>
                <ClientListTable columns={columns} data={dataArray} />
            </div>
            <Nav className="justify-content-end">
                <Nav.Item>
                    <Button onClick={handleGotoCreateClient}>
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                            &nbsp;&nbsp;
                        {getContent('clientAdmin.clientList.buttons.createClient')}
                    </Button>
                </Nav.Item>
            </Nav>
        </div>
    );
});

function ClientList() {
    const authRequest = {
        ...config.auth.loginRequest
    };

    console.log('>>> Welcome to the Client List <<<<');

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
            errorComponent={AuthError}
            loadingComponent={AuthLoading}
        >
            <AuthenticatedTemplate>
                <ClientListContent />
            </AuthenticatedTemplate>
        </MsalAuthenticationTemplate>
    );
}

export default ClientList;
