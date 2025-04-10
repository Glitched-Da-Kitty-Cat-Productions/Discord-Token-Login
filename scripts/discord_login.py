import requests
import time
from selenium import webdriver

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