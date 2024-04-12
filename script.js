const loginForm = document.getElementById('login-form');
const message = document.getElementById('message');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const 
    if (username === 'hi' && password === 'hihi') {
        alert("yippee");
        window.location.href = './nice.html';
    } else {
        message.textContent = 'Invalid username or password.';
    }
});