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
        const truncatedToken = token.token.substring(0, 10) + "...";
        tokenCell.textContent = truncatedToken;

        const loginIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        loginIcon.classList.add('actions', 'icon');
        loginIcon.title = 'Login with Token';
        loginIcon.innerHTML = `
    <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 110.395 122.88" enable-background="new 0 0 110.395 122.88">
  <g>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0,79.239v-34.54h35.025V13.631l47.004,48.305L35.025,110.31v-31.07H0L0,79.239z M93.359,17.16L75.68,9.377L75.99,0h34.404v61.439v61.44H75.99l-0.311-6.835l17.68-10.946V17.16L93.359,17.16z"></path>
  </g>
</svg>


    `;
        loginIcon.onclick = () => {
            document.getElementById('token').value = token.token;
        };

        const switchIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        switchIcon.classList.add('actions', 'icon');
        switchIcon.title = 'Switch Token';
        switchIcon.innerHTML =
            `
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
          <title>switch</title>
          <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.23,61.23,0,0,1,61.44,0ZM72.91,41.27a5.47,5.47,0,1,1,7.3-8.16L93.72,45.23A5.48,5.48,0,0,1,94.15,53l-.35.35h0l-13,12.12a5.48,5.48,0,0,1-7.47-8L76.1,54.8H62.39a5.5,5.5,0,0,1,0-11H75.75l-2.84-2.54Zm-30.5,16.1a5.47,5.47,0,1,1,7.3,8.16l-2.83,2.54H61.15a5.5,5.5,0,0,1,0,11H46.53l2.8,2.6a5.48,5.48,0,1,1-7.47,8l-13-12.11h0l-.35-.36a5.47,5.47,0,0,1,.42-7.73L42.41,57.37ZM96.86,26a50.08,50.08,0,1,0,14.68,35.43A49.95,49.95,0,0,0,96.86,26Z"/>
        </svg>
            `;
        switchIcon.onclick = () => {
            document.getElementById('new_token').value = token.token;
        };

        const viewIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        viewIcon.classList.add('actions', 'icon');
        viewIcon.title = 'View Full Token';
        viewIcon.innerHTML = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 122.88 83.78" style="enable-background:new 0 0 122.88 83.78" xml:space="preserve">
        <g>
        <path d="M95.73,10.81c10.53,7.09,19.6,17.37,26.48,29.86l0.67,1.22l-0.67,1.21c-6.88,12.49-15.96,22.77-26.48,29.86 C85.46,79.88,73.8,83.78,61.44,83.78c-12.36,0-24.02-3.9-34.28-10.81C16.62,65.87,7.55,55.59,0.67,43.1L0,41.89l0.67-1.22 c6.88-12.49,15.95-22.77,26.48-29.86C37.42,3.9,49.08,0,61.44,0C73.8,0,85.45,3.9,95.73,10.81L95.73,10.81z M60.79,22.17l4.08,0.39 c-1.45,2.18-2.31,4.82-2.31,7.67c0,7.48,5.86,13.54,13.1,13.54c2.32,0,4.5-0.62,6.39-1.72c0.03,0.47,0.05,0.94,0.05,1.42 c0,11.77-9.54,21.31-21.31,21.31c-11.77,0-21.31-9.54-21.31-21.31C39.48,31.71,49.02,22.17,60.79,22.17L60.79,22.17L60.79,22.17z M109,41.89c-5.5-9.66-12.61-17.6-20.79-23.11c-8.05-5.42-17.15-8.48-26.77-8.48c-9.61,0-18.71,3.06-26.76,8.48 c-8.18,5.51-15.29,13.45-20.8,23.11c5.5,9.66,12.62,17.6,20.8,23.1c8.05,5.42,17.15,8.48,26.76,8.48c9.62,0,18.71-3.06,26.77-8.48 C96.39,59.49,103.5,51.55,109,41.89L109,41.89z"/>
        </g>
      </svg>
    `;
        viewIcon.onclick = () => {
            alert(`Full Token: ${token.token}`);
        };

        actionsCell.appendChild(loginIcon);
        actionsCell.appendChild(switchIcon);
        actionsCell.appendChild(viewIcon);

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