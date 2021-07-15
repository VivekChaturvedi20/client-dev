import React, { useState, useContext } from 'react';
import {
    Modal, Button, Accordion, AccordionContext, useAccordionToggle
} from 'react-bootstrap';
import styles from './errorModal.module.scss';
import { getContent } from '../../utils/contentUtils';
import StoreContext from '../../contexts/storeContext';
import Constants from '../../constants/appConstants';

interface ComponentProps {
    error: Error,
    type: string
}

interface DetailsToggleProps {
    eventKey: any,
    callback?: any
}

function ErrorModal(props: ComponentProps) {
    const { errorStore } = useContext(StoreContext);
    const [isModalOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        switch (props.type) {
        case Constants.error.types.ERROR_BOUNDRY:
            setIsOpen(false);
            errorStore.clearErrors();
            break;
        case Constants.error.types.ERROR_CATCHER:
            if (errorStore.getErrors().length === 0) {
                setIsOpen(false);
            } else {
                errorStore.removeError(props.error);
            }
            break;
        default:
            console.error(`This "${props.type}" type is not supported.`);
            break;
        }

        console.log('Errors count:', errorStore.getErrors().length);
    };

    const DetailsToggle = (detailsProps: DetailsToggleProps) => {
        const currentEventKey = useContext(AccordionContext);
        const decoratedOnClick = useAccordionToggle(
            detailsProps.eventKey,
            () => detailsProps.callback && detailsProps.callback(detailsProps.eventKey)
        );

        const isCurrentEventKey = currentEventKey === detailsProps.eventKey;
        const buttonLabel = (isCurrentEventKey)
            ? getContent('modals.errorModal.toggleDetails.showLessLabel')
            : getContent('modals.errorModal.toggleDetails.showMoreLabel');

        return (
            <Button
                variant="link"
                className={styles['error-details-toggle']}
                onClick={decoratedOnClick}
            >
                {buttonLabel}
            </Button>
        );
    };

    return (
        <Modal
            show={isModalOpen}
            contentClassName={styles['modal-content-override']}
            animation={false}
            backdrop="static"
        >
            <Modal.Header className={styles['modal-header-override']}>
                <Modal.Title>
                    {getContent('modals.errorModal.header')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.error.message}
                <Accordion className={styles['error-details-wrapper']}>
                    <DetailsToggle eventKey="0" />
                    <Accordion.Collapse eventKey="0">
                        <>
                            <div className={styles['error-details-stack-header']}>
                                Error cought by:
                                {' '}
                                {props.type}
                            </div>

                            <pre className={styles['error-details-stack-text']}>
                                {props.error.stack}
                            </pre>
                        </>
                    </Accordion.Collapse>
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal} variant="danger">
                    {getContent('modals.errorModal.buttons.ok')}
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ErrorModal;
