from flask import Flask, redirect, request, session, url_for
import requests

app = Flask(__name__)
app.secret_key = 'ee18dd5b087191f6ee15c1c5e75929bbffa83263'

CLIENT_ID = 'ee18dd5b087191f6ee15c1c5e75929bbffa83263'
CLIENT_SECRET = 'ee18dd5b087191f6ee15c1c5e75929bbffa83263'
REDIRECT_URI = 'https://pytermos.com/account'

@app.route('/')
def home():
    return '<a href="/login">Login with GitHub</a>'

@app.route('/login')
def login():
    github_login_url = (
        f'https://github.com/login/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=user'
    )
    return redirect(github_login_url)

@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_response = requests.post(
        'https://github.com/login/oauth/access_token',
        headers={'Accept': 'application/json'},
        data={'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET, 'code': code, 'redirect_uri': REDIRECT_URI},
    )
    token = token_response.json().get('access_token')

    user_response = requests.get(
        'https://api.github.com/user',
        headers={'Authorization': f'token {token}'},
    )
    user_info = user_response.json()

    session['username'] = user_info.get('login')
    return f'Hello, {session["username"]}!'

if __name__ == '__main__':
    app.run(debug=True)
