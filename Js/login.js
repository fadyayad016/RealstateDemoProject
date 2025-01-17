document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Regular Expressions for validation
    var usernameRegex = /^[a-zA-Z0-9_]{3,15}$/; // Username must be alphanumeric and 3-15 characters
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password with letters, numbers, and special characters

    let isValid = true;

    // Validate Username
    if (!usernameRegex.test(username)) {
        document.getElementById('usernameError').classList.add('show-error');
        isValid = false;
    } else {
        document.getElementById('usernameError').classList.remove('show-error');
    }

    // Validate Password
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').classList.add('show-error');
        isValid = false;
    } else {
        document.getElementById('passwordError').classList.remove('show-error');
    }

    // Handle login
    if (isValid) {
        // Retrieve the users list from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Find the user by username
        let user = users.find(function (user) {
            return user.username === username;
        });

        // Validate user credentials
        if (user && user.password === password) {
            alert('Login successful!');
            window.location.href = '../HTML/homepage.html'; // Redirect to the homepage
        } else {
            // Show error message for invalid login
            let loginError = document.getElementById('loginError');
            if (!loginError) {
                const errorSpan = document.createElement('span');
                errorSpan.id = 'loginError';
                errorSpan.classList.add('show-error');
                errorSpan.style.color = 'red';
                errorSpan.innerText = 'Invalid username or password.';
                document.getElementById('loginForm').appendChild(errorSpan);
            }
        }
    } else {
        // Remove existing login error if form is invalid
        let loginError = document.getElementById('loginError');
        if (loginError) {
            loginError.remove();
        }
    }
});
