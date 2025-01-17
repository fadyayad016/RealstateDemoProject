document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registerMeChecked = document.getElementById('registerMe').checked;

    // Regular Expressions for validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/; // Alphanumeric with underscore, 3-15 characters
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Basic email validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 8+ chars, letters, numbers, symbols

    let isValid = true;

    // Validate Username
    isValid = toggleError('usernameError', usernameRegex.test(username)) && isValid;

    // Validate Email
    isValid = toggleError('emailError', emailRegex.test(email)) && isValid;

    // Validate Password
    isValid = toggleError('passwordError', passwordRegex.test(password)) && isValid;

    // Validate Confirm Password
    isValid = toggleError('confirmPasswordError', password === confirmPassword) && isValid;

    // Validate "Register me" checkbox
    if (!registerMeChecked) {
        displayCustomError('registerMe', 'You must agree to "Register me" to proceed.');
        isValid = false;
    } else {
        removeCustomError('registerMe');
    }

    // If form is valid, save data to localStorage and redirect
    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = { username, email, password }; // Store hashed password in real-world applications
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', username);
        alert('Registration successful!');
        window.location.href = '../HTML/homepage.html';
        document.getElementById('registrationForm').reset();
    }
});

// Helper Functions
function toggleError(elementId, condition) {
    const element = document.getElementById(elementId);
    if (!condition) {
        element.classList.add('show-error');
        return false;
    } else {
        element.classList.remove('show-error');
        return true;
    }
}

function displayCustomError(inputId, message) {
    let errorSpan = document.getElementById(`${inputId}Error`);
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.id = `${inputId}Error`;
        errorSpan.classList.add('show-error');
        errorSpan.style.color = 'red';
        document.getElementById(inputId).parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
}

function removeCustomError(inputId) {
    const errorSpan = document.getElementById(`${inputId}Error`);
    if (errorSpan) {
        errorSpan.remove();
    }
}

// Update header on page load
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('loginLink');
    const userProfile = document.getElementById('userProfile');

    if (loggedInUser) {
        if (loginLink) loginLink.style.display = 'none';
        if (userProfile) {
            userProfile.style.display = 'inline';
            userProfile.textContent = `Welcome, ${loggedInUser}`;
        }
    }
});
