// Initialize Auth0
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
    // Clear tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    // Redirect to Auth0 logout
    auth0.logout({
        returnTo: 'https://pytermos.com'
    });
}

function handleAuthentication() {
    auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Store tokens in local storage
            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('idToken', authResult.idToken);
            // Redirect to the main page after successful login
            window.location.href = 'https://pytermos.com';
        } else if (err) {
            console.error('Authentication error:', err);
        }
    });
}

function isAuthenticated() {
    // Check if tokens are present in local storage
    const accessToken = localStorage.getItem('accessToken');
    const idToken = localStorage.getItem('idToken');
    return accessToken && idToken;
}
