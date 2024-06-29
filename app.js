const auth0 = new auth0.WebAuth({
    domain: 'your-auth0-domain',
    clientID: 'your-auth0-client-id',
    redirectUri: 'https://yourusername.github.io/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
});

function login() {
    auth0.authorize();
}

function logout() {
    auth0.logout();
}

