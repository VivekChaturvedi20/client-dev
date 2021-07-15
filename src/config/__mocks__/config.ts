export default {
    apiUrl: 'testUrl',
    environment: 'unitTest',
    auth: {
        msalConfig: {
            clientId: 'xxxxx-xxxxx-xxxxx',
            authority: 'authority.xxxx',
            redirectUri: 'redirectUri.xxxx',
            postLogoutRedirectUri: 'postLogoutRedirectUri.xxxx'
        },
        loginRequest: {
            scopes: ['User.Read']
        }
    }
};
