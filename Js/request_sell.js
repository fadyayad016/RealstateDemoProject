// Regular expressions for validation
var validationPatterns = {
    firstName: /^[A-Za-z]{3,}$/,
    lastName: /^[A-Za-z]{3,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    address: /^[0-9a-zA-Z\s,.-]{10,}$/,
    phone: /^[0-9]{11}$/,
    details: /^[A-Za-z\s.,!?-]{1,500}$/
};

// object carry all Input fields 
var formInputs = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("LastName"),
    address: document.getElementById("address"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    details: document.getElementById("details")
};

// Error messages for each field
var errorMessages = {
    firstName: "Please enter a valid first name (at least 3 letters)",
    lastName: "Please enter a valid last name (at least 3 letters)",
    email: "Please enter a valid email address (e.g., example@domain.com)",
    address: "Please enter a valid address (at least 10 characters)",
    phone: "Please enter a valid 11-digit phone number",
    details: "Please enter valid details (letters, spaces, and basic punctuation only)"
};

// pic Form and submit button 
var form = document.getElementById("sellForm");

function validationOfField(fieldName,value) {

    var errorElement = formInputs[fieldName].parentElement.querySelector(".error-message");
    var pattern = validationPatterns[fieldName];

    if (!pattern.test(value)) {

        errorElement.innerText = errorMessages[fieldName];
        return false
    }
    else {

        errorElement.innerText = "";
        return true;

    }
}


// pic the submited success paragrph 
var submitedParagraph = document.querySelector(".form-submited");

function check(event) {

    event.preventDefault(); // Prevent form submission

    var isValid = true;

    // varible carry all fields names (keys) in array
    var fields = Object.keys(formInputs);
    
    for (var i = 0; i < fields.length;i++) {
        // varible carry each fieldname 
        var fieldName = fields[i];

        // pass the element value and the name of the element to check the validation
        isFieldValid = validationOfField(fieldName,formInputs[fieldName].value)
        isValid = isValid && isFieldValid;
    }

    // submit form only when is vaild is true
    if (isValid) {

        window.scrollTo(0,0);
        
        var setTimeForSuccess = setTimeout(function () {

            submitedParagraph.classList.add("show");

        },500);

        // clear the effect after 3sec
        var clearEffect = setTimeout(function () {

            submitedParagraph.style.visibility = "hidden";

        },3000);
           
        var fields = Object.keys(formInputs);

        // save data to localstorage
        for(var i = 0; i < fields.length ; i++) {

            var fieldsName = fields[i];
            localStorage.setItem(fieldsName,formInputs[fieldsName].value);

        }
    }
}

form.addEventListener("submit", check);

