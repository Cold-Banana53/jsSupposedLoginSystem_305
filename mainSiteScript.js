document.addEventListener("DOMContentLoaded", function() {
    // Extract query parameter from URL
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");

    // Use the extracted username
    document.getElementById("welcome-message").textContent = "Welcome, " + username + "!";
});

document.getElementById("signinButton").addEventListener("click", function(event) {
    event.preventDefault();
    location.href = "./loginPage.html";
});

document.getElementById("logoutButton").addEventListener("click", function(event) {
    event.preventDefault();
    if (event.submitter.id === "logoutButton") {
        localStorage.clear();
        location.href = "./mainSite.html";
    }
});