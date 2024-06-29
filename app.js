const auth0 = new auth0.WebAuth({
    domain: 'dev-6khvis8rcqbs30ff.us.auth0.com',
    clientID: 'zCBNwhJZC2qTvtHUQ7K2X7hIMhrHuwgZ',
    redirectUri: 'https://pytermos.com/callback.html',
    responseType: 'token id_token',
    scope: 'openid profile'
});

function login() {
    auth0.authorize();
}

function logout() {
    auth0.logout();
}

