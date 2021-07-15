import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import StoreContext from '../../contexts/storeContext';
import ErrorModal from './errorModal';
import Constants from '../../constants/appConstants';

function ErrorCatcher() {
    const { errorStore } = useContext(StoreContext);
    const errors = errorStore.getErrors();

    console.debug('[ErrorCatcher] Errors', errors);

    return (errors.length > 0) ? (
        <ErrorModal error={errors[0]} type={Constants.error.types.ERROR_CATCHER} />
    ) : null;
}

export default observer(ErrorCatcher);
