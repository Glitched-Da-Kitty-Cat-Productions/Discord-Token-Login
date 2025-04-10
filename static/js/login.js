document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const token = document.getElementById('token').value;
    if (token) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `token=${encodeURIComponent(token)}`,
        })
            .then((response) => {
                if (response.ok) {
                    alert('Logged in successfully!');
                    location.reload();
                } else {
                    alert('Invalid token. Please try again.');
                }
            })
            .catch((error) => console.error('Error:', error));
    }
});