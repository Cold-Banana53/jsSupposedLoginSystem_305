document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const errorMessage = document.getElementById('error-message');
    
    // Clear previous error message
    errorMessage.textContent = '';

    // Open (or create) the IndexedDB database
    const request = indexedDB.open('userDatabase', 1);

    request.onerror = function(event) {
        console.log('Database error: ' + event.target.errorCode);
        errorMessage.textContent = 'Database error';
    };

    request.onsuccess = function(event) {
        const db = event.target.result;

        const userData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };
        
        // Perform database operations
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        const putRequest = objectStore.put(userData);
      
        putRequest.onerror = function(event) {
          console.log('Transaction error: ' + event.target.errorCode);
          errorMessage.textContent = 'Transaction error';
        };
      
        putRequest.onsuccess = function(event) {
          console.log('Data stored successfully');
          // Handle the success of storing data
        };
    };
      
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'username' });
        }
    };


});
