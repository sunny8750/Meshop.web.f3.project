
const users = JSON.parse(localStorage.getItem('users')) || [];

var formId = document.getElementById("form")

formId.addEventListener("submit", function(event){
  event.preventDefault();
  var firstname = event.target["firstName"].value;
  var laststname = event.target["lastName"].value;
  var email = event.target["email"].value;
  var password = event.target["password"].value;
  var cpassword = event.target["cpasssword"].value; 
  
var flag = true;
  if(firstname ==""){
    alert("plz enter name")
    flag = false;
  }

  if(laststname ===""){
    alert("plz enter your last name")
    flag = false;
  }

  if(email ===""){
    alert("your email is not correct")
    flag = false;
  }

  if(password ===""){
    alert("plz enter a strong password")
    flag = false;
  }

  if(cpassword ===""){
    alert("plz confirm your password")
    flag = false;
  }
 
  const user = {
    firstname,
    laststname,
    email,
    password
};
   users.push(user)
   if(flag){
    localStorage.setItem("users", JSON.stringify(users));
    location.href="./loginpage/"
   }else{
    alert("something went wrong plzz try again")
   } 
  
}) 


