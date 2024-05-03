const username = document.querySelector('#username');
const email = document.querySelector('#email');
const phonenumber = document.querySelector('#phonenumber');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');
const togglePassword = document.querySelector("#togglePassword");

//shows error message
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

//shows success message
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

//checks input field
const isRequired = value => value === '' ? false : true;

//checks length of input field
const isBetween = (length, min, max) => length < min || length > max ? false : true;

//checks email is valid
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
// checks phonenumber is Valid
const isPhoneNumberValid = (phoneNumber) => {
        if (phoneNumber === '123456789') {
        return false;
    }
    
    const re = /^[0-9]{10}$/;
    return re.test(phoneNumber);
};
//checks password is secured
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};


//validate username field
const checkUsername = () => {

    let valid = false;
    const min = 5,
        max = 25;
    const usernameVal = username.value.trim();

    if (!isRequired(usernameVal)) {
        showError(username, 'Username cannot be blank.');
    } else if (!isBetween(usernameVal.length, min, max)) {
        showError(username, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(username);
        valid = true;
    }
    return valid;
};
// New function to check if email contains '@'
const isEmailContainsAt = (email) => {
    return email.includes('@');
};
//validate email field
const checkEmail = () => {
    let valid = false;
    const emailVal = email.value.trim();
    if (!isRequired(emailVal)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailContainsAt(emailVal)) {
        showError(email, 'Email must contain "@" character.');
    } else if (!isEmailValid(emailVal)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
};
// phonenumber validation
const checkPhoneNumber = () => {
    let valid = false;
    const phoneNumberVal = phonenumber.value.trim();
    if (!isRequired(phoneNumberVal)) {
        showError(phonenumber, 'Phone number cannot be blank.');
    } else if (phoneNumberVal === '123456789') {
        showError(phonenumber, 'Phone number cannot be 123456789.');
    } else if (!isPhoneNumberValid(phoneNumberVal)) {
        showError(phonenumber, 'Phone number must be a 10-digit number.');
    } else {
        showSuccess(phonenumber);
        valid = true;
    }
    return valid;
};

//validate password
const checkPassword = () => {

    let valid = false;

    const passwordVal = password.value.trim();
    const usernameVal = username.value.trim(); // Get username value for comparison



    if (!isRequired(passwordVal)) {
        showError(password, 'Password cannot be blank.');
    } else if (passwordVal.toLowerCase() === 'password' || passwordVal.toLowerCase() === usernameVal.toLowerCase()) {
        showError(password, 'Password cannot be "password" or your username.');
    } else if (passwordVal.length < 8) {
        showError(password, 'Password must be at least 8 characters.');
    } else if (!isPasswordSecure(passwordVal)) {
        showError(password, 'Password must contain at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*).');
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};
//validate confirm password
const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPasswordVal = confirmPassword.value.trim();
    const passwordVal = password.value.trim();

    if (!isRequired(confirmPasswordVal)) {
        showError(confirmPassword, 'Confirm Password is required');
    } else if (passwordVal !== confirmPasswordVal) {
        showError(confirmPassword, 'Confirm Password does not match');
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }

    return valid;
};

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("bi-eye");
});

//modifying submit event handler
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPhoneNumberValid = checkPhoneNumber(); // Add phone number validation
    let isPasswordValid = checkPassword();
    let isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPhoneNumberValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {
        // Submit form
        form.submit();
    }
});