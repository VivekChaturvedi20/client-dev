import { Configuration, PopupRequest } from '@azure/msal-browser';

// Config object to be passed to Msal on creation
const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        authority: import.meta.env.VITE_AUTHORITY_URI,
        redirectUri: import.meta.env.VITE_REDIRECT_URI,
        postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
const loginRequest: PopupRequest = {
    scopes: ['User.Read']
};

const config = {
    clientApiUrl: import.meta.env.VITE_CLIENT_API_URL,
    logApiUrl: import.meta.env.VITE_LOG_API_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    auth: {
        msalConfig,
        loginRequest

    }
};

export default config;
