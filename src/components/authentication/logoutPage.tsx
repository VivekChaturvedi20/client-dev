import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StoreContext from '../../contexts/storeContext';
import { getContent } from '../../utils/contentUtils';
import styles from './logoutPage.module.scss';

function LogoutPage() {
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
            bg="success"
            border="success"
            text="light"
            className={styles['logout-card']}
        >
            <Card.Header>
                <FontAwesomeIcon icon={['fas', 'check']} className={styles['logout-card-icon']} />
                { getContent('logoutPage.header') }
            </Card.Header>
            <Card.Body>
                <Card.Title as="h4">
                    { getContent('logoutPage.title') }
                </Card.Title>
                <Card.Text>
                    <small>{ getContent('logoutPage.text') }</small>
                </Card.Text>
                <hr />
                <Button variant="dark" onClick={onLogin} className={styles['logout-card-action-button']}>
                    { getContent('logoutPage.buttons.retry') }
                </Button>
            </Card.Body>
        </Card>

    );
}

export default LogoutPage;
