from flask import Flask, request, render_template, redirect, url_for, session
from scripts.discord_login import validate_token, switch_token, open_discord_with_token
import random

app = Flask(__name__)
app.secret_key = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=16))

driver = None



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    token = request.form.get('token')
    if validate_token(token):
        session['token'] = token
        open_discord_with_token(token)  
        return redirect(url_for('index'))
    return "Invalid token", 400

@app.route('/switch_token', methods=['POST'])
def switch():
    new_token = request.form.get('new_token')
    if switch_token(session.get('token'), new_token):
        session['token'] = new_token
        open_discord_with_token(new_token)
        return redirect(url_for('index'))
    return "Failed to switch token", 400

if __name__ == '__main__':
    app.run(debug=True)