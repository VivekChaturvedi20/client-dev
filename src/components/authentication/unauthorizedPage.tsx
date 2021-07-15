import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StoreContext from '../../contexts/storeContext';
import { getContent } from '../../utils/contentUtils';
import styles from './unauthorizedPage.module.scss';

function UnauthorizedPage() {
    const { appStore, navigationStore } = useContext(StoreContext);

    useEffect(() => {
        appStore.hideAppLoader();
    }, [appStore]);

    const onLogin = () => {
        console.log('Handle re-login here ...');
        navigationStore.gotoHome();
    };

    return (

        <Card
            bg="danger"
            border="danger"
            text="light"
            className={styles['unauthorized-card']}
        >
            <Card.Header>
                <FontAwesomeIcon icon={['fas', 'user-slash']} className={styles['unauthorized-card-icon']} />
                { getContent('authorization.unauthorizedPage.header') }
            </Card.Header>
            <Card.Body>
                <Card.Title as="h1">
                    { getContent('authorization.unauthorizedPage.title') }
                </Card.Title>
                <Card.Text>
                    { getContent('authorization.unauthorizedPage.text') }
                </Card.Text>
                <hr />
                <Button variant="dark" onClick={onLogin} className={styles['unauthorized-card-action-button']}>
                    { getContent('authorization.unauthorizedPage.buttons.retry') }
                </Button>
            </Card.Body>
        </Card>

    );
}

export default UnauthorizedPage;
