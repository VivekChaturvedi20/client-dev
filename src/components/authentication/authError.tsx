import React from 'react';
import { MsalAuthenticationResult } from '@azure/msal-react';
import { getContent } from '../../utils/contentUtils';

function AuthError(result:MsalAuthenticationResult) {
    // console.error(error);
    console.dir(result);
    return (
        <div>

            <b>{getContent('authorization.errorHeader')}</b>
            <br />
            <br />
            {result.error.name || getContent('authorization.unknownError')}
            <br />
            <br />
            <pre>
                {result.error.stack || getContent('authorization.unknownError')}
            </pre>
        </div>
    );
}

export default AuthError;
