import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Modal, Spinner } from 'react-bootstrap';
import StoreContext from '../contexts/storeContext';
import styles from './appLoader.module.scss';
import { getContent } from '../utils/contentUtils';

export default observer(() => {
    const { appStore } = useContext(StoreContext);

    return (
        <Modal
            show={appStore.loading}
            centered
            animation={false}
            className="app-loader"
            dialogClassName={styles['app-loader-dialog']}
            contentClassName={styles['app-loader-content']}
        >
            <Modal.Body>
                <Spinner animation="border" role="status" variant="primary" />
                <div className={styles['app-loader-content-text']}>
                    {getContent('clientAdmin.loading')}
                </div>
            </Modal.Body>
        </Modal>
    );
});
