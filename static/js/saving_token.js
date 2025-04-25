const saveForm = document.getElementById('saveShit');
const tokenListTable = document.getElementById('List');

function saveToken(token, name) {
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

    nameCell.textContent = token.name;
    tokenCell.textContent = token.token;

    row.appendChild(nameCell);
    row.appendChild(tokenCell);

    tokenListTable.appendChild(row);
  });
}

saveForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const token = document.getElementById('save_token').value;
  const name = document.getElementById('Name').value;

  saveToken(token, name);
});

fetch('/getTokens')
  .then(response => response.json())
  .then(data => {
    updateTokenList(data);
  });