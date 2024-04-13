const loginForm = document.getElementById('login-form');
const message = document.getElementById('message');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameList = [];
    const passwordList = []; //don't search here until username check
    if (usernameList.includes(username) == false) {
        usernameList[usernameList.length] = username;
        passwordList[passwordList.length] = password;
            alert("success! bringing you back to the login page...");
            window.location.href = './LoginPage.html';
    } else {
        alert('This username already exists!');
    }
});