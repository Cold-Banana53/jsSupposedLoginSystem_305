const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const message = document.getElementById('message');

loginForm.addEventListener('confirm', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (usernameList.includes(username)) {
        alert("Success! Redirecting to main...");
        window.location.href = './nice.html';
    } else {
        alert('This username already exists!');
    }
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (usernameList.includes(username) == false) {
        usernameList[usernameList.length] = username;
        passwordList[passwordList.length] = password;
            alert("Success! bringing you back to the login page...");
            window.location.href = './LoginPage.html';
    } else {
        alert('This username already exists!');
    }
});