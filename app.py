from flask import Flask, request, render_template, redirect, url_for, session, jsonify
import random
import requests
import time
from selenium import webdriver
import json

app = Flask(__name__)
app.secret_key = ''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=16))
driver = None
def add_to_json(file_path, new_data):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {} 
    
    if isinstance(data, dict):
      data.update(new_data)
    elif isinstance(data, list):
      data.append(new_data)
    else:
      raise TypeError("JSON data is not a dictionary or a list.")
      
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
def open_discord_with_token(token):
    global driver
    try:
        if driver is None: 
            chrome_options = webdriver.ChromeOptions()
            chrome_options.add_argument("--app=https://discord.com/login")
            chrome_options.add_argument("--start-maximized") 
            chrome_options.add_argument("--disable-infobars") 
            chrome_options.add_argument("--disable-extensions")  
            chrome_options.add_argument("--disable-notifications") 
            chrome_options.add_argument("--disable-popup-blocking") 
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option("useAutomationExtension", False)
            
            driver = webdriver.Chrome(options=chrome_options)

        script = """
        function login(token) {
            setInterval(() => {
                document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token = `"${token}"`;
            }, 50);
            setTimeout(() => {
                location.reload();
            }, 2500);
        }
        """
        driver.execute_script(script + f'\nlogin("{token}")')
        time.sleep(4)
    except Exception as e:
        print(f"Error opening browser: {e}")
def load_tokens():
  try:
    with open('static/information/savedTokens.json', 'r') as f:
      return json.load(f)
  except FileNotFoundError:
    return []

def save_tokens(token_list):
    try:
        with open('static/information/savedTokens.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    for token in token_list:
        new_token = {
            "id": len(data) + 1,
            "token": token,
            "timestamp": int(time.time())
        }
        data.append(new_token)

    with open('static/information/savedTokens.json', 'w') as f:
        json.dump(data, f, indent=4)


def validate_token(token):
    url = "https://discord.com/api/v10/users/@me"
    headers = {
        "Authorization": token
    }
    response = requests.get(url, headers=headers)
    return response.status_code == 200

def switch_token(old_token, new_token):
    if validate_token(new_token):
        return True
    return False

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

@app.route('/getTokens', methods=['GET'])
def get_tokens():
  return jsonify(load_tokens())

@app.route('/saveTokens', methods=['POST'])
def save_tokens_route():
  token_list = request.get_json()
  save_tokens(token_list)
  return jsonify(token_list)
if __name__ == '__main__':
    app.run(debug=True)