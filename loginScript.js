document.getElementById('register').addEventListener('click', function(event) {
    event.preventDefault();
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    const usernameNew = document.getElementById('username').value;
    const passwordNew = document.getElementById('password').value;

    const request = window.indexedDB.open("UserDB", 1);
    let db;

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        const objectStore = db.createObjectStore("users", { keyPath: "username" });
        // Create an index to search users by username
        objectStore.createIndex("username", "username", { unique: true });
    };

    request.onerror = function(event) {
        console.log("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        
        // Check if the username already exists
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");
        const index = objectStore.index("username");
        const request = index.get(usernameNew);

        request.onsuccess = function(event) {
            const existingUser = event.target.result;
            if (existingUser) {
                errorMessage.textContent = "Username already exists. Please choose a different one.";
            } else {
                // Username is available, add the new user
                const addUserTransaction = db.transaction(["users"], "readwrite");
                const userStore = addUserTransaction.objectStore("users");
                const newUser = { username: usernameNew, password: passwordNew };
                const addUserRequest = userStore.add(newUser);

                addUserRequest.onsuccess = function(event) {
                    console.log("New user added successfully!");
                    // Redirect to login page
                    location.href = "./loginPage.html";
                };

                addUserRequest.onerror = function(event) {
                    console.log("Error adding new user:", event.target.errorCode);
                };
            }
        };

        request.onerror = function(event) {
            console.log("Error checking existing user:", event.target.errorCode);
        };
    }; 
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const usernameNew = document.getElementById("username").value;
        const passwordNew = document.getElementById("password").value;
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = '';

        const request = window.indexedDB.open("UserDB", 1);
        let db;

        request.onerror = function(event) {
            console.log("Database error: " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            console.log('db success');

            const transaction = db.transaction(["users"], "readonly");
            const objectStore = transaction.objectStore("users");
            const index = objectStore.index("username");
            const request = index.get(usernameNew);

            request.onsuccess = function(event) {
                const user = event.target.result;
                if (user && user.password === passwordNew) {
                    errorMessage.textContent = "Login successful!";
                    // Redirect to main site after successful login
                    setTimeout(function() {
                        location.href = "./mainSite.html";
                    }, 100); // Add a slight delay to ensure transaction completion
                } else {
                    errorMessage.textContent = "Invalid username or password. Have you registered yet?";
                }
            };

            request.onerror = function(event) {
                console.log("Error retrieving user:", event.target.errorCode);
            };
        };
});