const saveForm = document.getElementById('saveShit');
const tokenListTable = document.getElementById('List');
const loginForm = document.getElementById('loginForm');
const switchForm = document.getElementById('switchForm');

function saveToken(token, name, type) {
  const tokenInfo = {
    token: token,
    name: name
  };

  fetch('/getTokens')
    .then(response => response.json())
    .then(data => {
      data.push(tokenInfo);

      fetch('/saveTokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        updateTokenList(data);
      });
    });
}

function updateTokenList(tokenList) {
  tokenListTable.innerHTML = '';

  tokenList.forEach(token => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const tokenCell = document.createElement('td');
    const actionsCell = document.createElement('td');

    nameCell.textContent = token.name;
    tokenCell.textContent = token.token;

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.onclick = () => {
      document.getElementById('token').value = token.token;
    };

    const switchButton = document.createElement('button');
    switchButton.textContent = 'Switch';
    switchButton.onclick = () => {
      document.getElementById('new_token').value = token.token;
 };

    actionsCell.appendChild(loginButton);
    actionsCell.appendChild(switchButton);

    row.appendChild(nameCell);
    row.appendChild(tokenCell);
    row.appendChild(actionsCell);

    tokenListTable.appendChild(row);
  });
}

function getTokensOnLoad() {
  fetch('/getTokens')
    .then(response => response.json())
    .then(data => {
      updateTokenList(data);
    });
}

saveForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const token = document.getElementById('save_token').value;
  const name = document.getElementById('Name').value;
  saveToken(token, name);
  saveForm.reset();
});

document.addEventListener('DOMContentLoaded', getTokensOnLoad);