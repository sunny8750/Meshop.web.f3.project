//chceking if user already exit then redirect to shop page..
var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting surent Item Obj
if (currentitem) { // if current user exist send to dashboard page
    window.location.href = "./shop/";
}
const login = document.getElementById('login-form');
const errorloginMsg = document.getElementById('error-msg');
login.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = login.elements['email'].value.trim();
    const password = login.elements['password'].value;

    let formData = JSON.parse(localStorage.getItem('users')) || [];
    // Check if the entered email and password match any of the users in the array
    const currentUser = formData.find(user => user.email === email && user.password === password);
    if (currentUser) {
        // Create a current user object with email, password, name, and token
        const currentUserObj = {
            email: currentUser.email,
            name: currentUser.name,
            token: generateToken(),
          //  password:currentUser.password,
        };
        // Store the current user object in local storage
        localStorage.setItem('currentUser', JSON.stringify(currentUserObj));
        // Redirect the user to the dashboard page
        window.location.href = './shop/';
    } else {
        // Display an error message to the user
        errorloginMsg.textContent = 'Invalid email or password. Please try again.';
    }

});
// A simple function to generate a random 16 character string
function generateToken() {
    
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
        token += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return token;
}
