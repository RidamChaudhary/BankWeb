    // Prepare acknowledgment message
   // const accountInfo = `Customer Account Id: ${accountId}<br>Customer Name: ${firstName} ${lastName}`;
    
    // Display acknowledgment message
  //  document.getElementById('account-info').innerHTML = accountInfo;
  //  document.getElementById('acknowledgment').style.display = 'block';

function handleRegister(event) {
    event.preventDefault();

    // Get input values
    const ssn = document.getElementById('ssn').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Generate a unique account number
    const accountNumber = `US${Math.floor(Math.random() * 1000)}`;

    // Store user data in localStorage
    localStorage.setItem(accountNumber, JSON.stringify({
        password,
        firstName,
        lastName,
        email
    }));

    const acknowledgmentMessage = `Customer Registration successful.\nAccount ID: ${accountNumber}\nCustomer Name: ${firstName} ${lastName}`;
    document.getElementById('acknowledgment-message').innerText = acknowledgmentMessage;

    // Hide the registration form
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('acknowledgment').style.display = 'block';

    // Redirect to login page after 5 seconds
    setTimeout(() => {
        window.location.href = 'login1.html'; // Redirect to login page
    }, 5000);}

function handleLogin(event) {
    event.preventDefault();

    // Get input values
    const accountNumber = document.getElementById('account-no').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage
    const userData = localStorage.getItem(accountNumber);

    if (userData) {
        const user = JSON.parse(userData);

        // Check if the entered password matches
        if (user.password === password) {
            // Successful login
            alert("Customer login successful.");
            localStorage.setItem('customerName', `${user.firstName} ${user.lastName}`); // Store customer name
            window.location.href = 'home.html'; // Redirect to home page
        } else {
            // Invalid password
            alert("Invalid credentials. Please try again.");
        }
    } else {
        // Invalid account number
        alert("Invalid credentials. Please try again.");
    }
}

let currentBalance = 5000; // Example starting balance

// Display user's name
const customerName = localStorage.getItem('customerName') || 'Customer';
document.getElementById('greeting').innerText = `Hii! ${customerName}`;

function showUpdateForm() {
    document.getElementById('update-form').style.display = 'block';
}

function closeUpdateForm() {
    document.getElementById('update-form').style.display = 'none';
}

function handleUpdate(event) {
    event.preventDefault();
    alert("Customer Update Successful.");
    closeUpdateForm();
}

function showDepositForm() {
    document.getElementById('deposit-form').style.display = 'block';
}

function closeDepositForm() {
    document.getElementById('deposit-form').style.display = 'none';
}

function handleDeposit(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    currentBalance += amount;
    alert(`Deposit Successful! Current Balance: ${currentBalance}`);
    closeDepositForm();
}

function showWithdrawForm() {
    document.getElementById('withdraw-form').style.display = 'block';
}

function closeWithdrawForm() {
    document.getElementById('withdraw-form').style.display = 'none';
}

function handleWithdraw(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    
    if (amount < 1000) {
        alert("Minimum amount that can be withdrawn is 1000.");
        return;
    }
    
    if (currentBalance - amount < 500) {
        alert("Minimum balance should be 500.");
        return;
    }

    currentBalance -= amount;
    alert(`Withdrawal Successful! Current Balance: ${currentBalance}`);
    closeWithdrawForm();
}

function checkBalance() {
    alert(`Current Available Balance: ${currentBalance}`);
}
document.addEventListener("DOMContentLoaded", () => {
    const accountNumber = localStorage.getItem('loggedInAccountNumber');
    const userData = JSON.parse(localStorage.getItem(accountNumber));

    // Pre-fill the form with existing data
    if (userData) {
        document.getElementById('customer-name').innerText = userData.firstName + ' ' + userData.lastName;
        document.getElementById('ssn').value = userData.ssn; // Assuming ssn is saved
        document.getElementById('customer-name-input').value = userData.firstName + ' ' + userData.lastName;
        document.getElementById('account-number').value = accountNumber;
        document.getElementById('email').value = userData.email;
        document.getElementById('contact').value = userData.contact; // Assuming contact is saved
        // Other fields can be set similarly if saved in local storage
    }
});

function showUpdateDetails() {
    document.getElementById('update-details').style.display = 'block';
}
// Function to populate the form with user data from local storage
function populateForm() {
    const userData = JSON.parse(localStorage.getItem("userDetails")); // Retrieve user data from local storage

    if (userData) {
        document.getElementById("ssn").value = userData.ssn || '';
        document.getElementById("customer-name-input").value = userData.customerName || '';
        document.getElementById("account-number").value = userData.accountNumber || '';
        document.getElementById("ifsc-code").value = userData.ifscCode || '';
        document.getElementById("account-balance").value = userData.accountBalance || '';
        document.getElementById("aadhaar").value = userData.aadhaar || '';
        document.getElementById("pan").value = userData.pan || '';
        document.getElementById("dob").value = userData.dob || '';
        document.getElementById("gender").value = userData.gender || 'Male'; // Default to Male if not set
        document.getElementById("marital-status").value = userData.maritalStatus || 'Single'; // Default to Single
        document.getElementById("email").value = userData.email || '';
        document.getElementById("address").value = userData.address || '';
        document.getElementById("contact").value = userData.contact || '';
    }
}

// Function to populate the update form with data from local storage
function populateUpdateForm() {
    const userData = JSON.parse(localStorage.getItem('userDetails'));

    if (userData) {
        document.getElementById('ssn').value = userData.ssn || '';
        document.getElementById('customer-name-input').value = userData.name || '';
        document.getElementById('account-number').value = userData.accountNumber; // Not editable
        document.getElementById('ifsc-code').value = userData.ifsc || '';
        document.getElementById('account-balance').value = userData.balance || '';
        document.getElementById('aadhaar').value = userData.aadhaar || '';
        document.getElementById('pan').value = userData.pan || '';
        document.getElementById('dob').value = userData.dob || '';
        document.getElementById('gender').value = userData.gender || 'Male';
        document.getElementById('marital-status').value = userData.maritalStatus || 'Single';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('address').value = userData.address || '';
        document.getElementById('contact').value = userData.contact || '';
    }
}

// Function to handle form submission
function handleUpdate(event) {
    event.preventDefault(); // Prevent default form submission

    const updatedUserData = {
        ssn: document.getElementById('ssn').value,
        name: document.getElementById('customer-name-input').value,
        accountNumber: document.getElementById('account-number').value, // Not editable
        ifsc: document.getElementById('ifsc-code').value,
        balance: document.getElementById('account-balance').value,
        aadhaar: document.getElementById('aadhaar').value,
        pan: document.getElementById('pan').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        maritalStatus: document.getElementById('marital-status').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        contact: document.getElementById('contact').value,
    };

    // Update the local storage with new data
    localStorage.setItem('userDetails', JSON.stringify(updatedUserData));

    // Show the popup message
    showPopup('Customer details updated successfully');

    // Redirect to home page after 2 seconds
    setTimeout(() => {
        window.location.href = 'home.html'; // Update this to your actual home page URL
    }, 2000);
}

// Function to show the popup
function showPopup(message) {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.textContent = message;

    document.body.appendChild(popup);

    // Remove the popup after 2 seconds
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 2000);
}

// Call the function to populate the form when the page loads
document.addEventListener('DOMContentLoaded', populateUpdateForm);
