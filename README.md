# Discord Token Login Tool

This project is a Flask-based web application that allows users to log in to their Discord accounts using a Discord token. It supports token switching and provides a simple interface for managing user sessions.

## Project Structure

```
discord-token-login-tool
├── scripts
│   ├── app.py              # Main entry point of the Flask application
│   ├── discord_login.py    # Functions for Discord login functionality
│   └── utils.py            # Utility functions for token management and session handling
├── static
│   ├── css
│   │   └── styles.css      # CSS styles for the web application
│   └── js
│       └── login.js        # JavaScript functions for logging in with a Discord token
├── templates
│   └── index.html          # Main HTML template for the web application
├── config.json             # Configuration settings for the application
├── requirements.txt        # Python dependencies required for the project
└── README.md               # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd discord-token-login-tool
   ```

2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

3. Configure the application by editing the `config.json` file as needed.

## Usage

1. Run the Flask application:
   ```
   python scripts/app.py
   ```

2. Open your web browser and navigate to `http://127.0.0.1:5000` to access the application.

3. Enter your Discord token to log in. You can switch tokens as needed.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.