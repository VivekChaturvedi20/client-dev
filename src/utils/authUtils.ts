import { InteractionRequiredAuthError, PublicClientApplication } from '@azure/msal-browser';
import config from '../config/config';

let authInstance: PublicClientApplication;

export function setAuthInstance(msalInstance: PublicClientApplication) {
    authInstance = msalInstance;
}

export function getAuthInstance() {
    return authInstance;
}

export async function getAccessToken() {
    const instance = getAuthInstance();
    const accessTokenRequest = {
        account: instance.getActiveAccount() || undefined,
        scopes: [`${config.auth.msalConfig.auth.clientId}/.default`],
        forceRefresh: false
    };

    const tokenResponse = await instance.acquireTokenSilent(accessTokenRequest).catch(async (acquireTokenSilentError) => {
        if (acquireTokenSilentError instanceof InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            return instance.acquireTokenPopup(accessTokenRequest).catch((acquireTokenPopupError) => {
                console.error(acquireTokenPopupError);
            });
        }
        return null;
    });

    return tokenResponse;
}

export async function getDefaultHeaders() {
    const tokenResponse = await getAccessToken();
    const headers = {
        Authorization: `Bearer ${tokenResponse?.accessToken || 'ASSESS_TOKEN_NOT_AVAILABLE'}`
    };

    return headers;
}
