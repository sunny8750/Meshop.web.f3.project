
const change = document.getElementById('change-form'); //getting form
const errorMsg = document.getElementById('error-msg'); //set error variable
//chceking user if not exit then redrict to login page
var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting curent Item Obj
if (!currentitem) {
    window.location.href = "../login.html";
}

const users = JSON.parse(localStorage.getItem('users')) || []; //getting user array from localstroge

document.getElementById("display-name").innerText = "Welcome Back  " + currentitem.name; //display name message
document.getElementById("display-email").innerText = currentitem.email; //display email

change.addEventListener('submit', (e) => {
    e.preventDefault();
    // getting form inputs
    const opassword = change.elements['opassword'].value.trim();
    const npassword = change.elements['npassword'].value;
    const cnpassword = change.elements['cnpassword'].value;
    // validation
    if (!opassword) {
        errorMsg.textContent = 'Old Password cannot be empty.';
        return;
    }

    if (!npassword) {
        errorMsg.textContent = 'Password cannot be empty';
        return;
    }

    if (npassword !== cnpassword) {
        errorMsg.textContent = 'Passwords do not match.';
        return;
    }
    let formData = JSON.parse(localStorage.getItem('users')) || [];

    if (!formData.find(user => user.password === opassword)) {
        errorMsg.textContent = 'Old Passwords do not match.';
        return
    }

    // update password in users array and currentUser object
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === currentitem.email) {
            users[i].password = npassword;
            currentitem.password=npassword;
            break;
        }
    }

    //update new password in users array
    localStorage.setItem("users", JSON.stringify(users));
    errorMsg.textContent = 'Password Changed';
    alert("Password Changed");
    change.reset();

});

// logout function
function logout() {
    localStorage.removeItem("currentUser");

    // redirect to login page
    window.location.href = "/loginpage/";
}