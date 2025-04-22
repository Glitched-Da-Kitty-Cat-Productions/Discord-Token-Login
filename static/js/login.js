document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const token = document.getElementById('token').value;
    if (!token) { showNotification('Token is required.', 'error'); return; }
    showNotification('Logging in...', 'info');
    login(token);
});
async function login(token) {
    if (token)
        {    
            fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `token=${encodeURIComponent(token)}`,
        })
            .then((response) => {
                if (response.ok) {
                    showNotification('Logged in successfully!', 'success');
                    location.reload();
                } else {
                    showNotification('Invalid token. Please try again.', 'error');
                }
            })
            .catch((error) => console.error('Error:', error));
        }
        else {
            
        }
}
document.getElementById('switchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const new_token = document.getElementById('new_token').value;
    if (!new_token) { showNotification('Token is required.', 'error'); return; }
    showNotification('Switch Token...', 'info');
    switch_token(new_token);
});
async function switch_token(new_token) {
    if (new_token)
        {    
            fetch('/switch_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `new_token=${encodeURIComponent(new_token)}`,
        })
            .then((response) => {
                if (response.ok) {
                    showNotification('Logged in successfully!', 'success');
                    location.reload();
                } else {
                    showNotification('Invalid token. Please try again.', 'error');
                }
            })
            .catch((error) => console.error('Error:', error));
        }
        else {
            
        }
}