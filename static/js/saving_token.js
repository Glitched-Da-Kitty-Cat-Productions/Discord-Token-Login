document.getElementById('saveShit').addEventListener('submit', function (e) {
    e.preventDefault();
    const token = document.getElementById('save_token').value;
    const name = document.getElementById('Name').value;
    if (!token) { showNotification('Token is required.', 'error'); return; }
    if (!name) { showNotification('Token Name is required.', 'error'); return; }
    showNotification('Saving Informtion...', 'info');
    saveTokenInformation(token, name)
});
/*
async function saveTokenInformation(token, name) {
    if (token)
        {    
            fetch('/save-token', {
            method: 'POST',
            body: `data="{ "name": "${name}", "token": "${token}"},"`,
        })
            .then((response) => {
                if (response.ok) {
                    showNotification('Data Added!', 'success');
                } else {
                    showNotification('Error', 'error');                }
            })
            .catch((error) => console.error('Error:', error));
        }
        else {
            
        }
}
*/
async function loadSaved() {
    
}
function allStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }

    console.log(archive)
}
allStorage()