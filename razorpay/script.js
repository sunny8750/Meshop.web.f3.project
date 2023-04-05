//chceking user if not exit then redrict to login page
var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting curent Item Obj
if (!currentitem) {
    window.location.href = "../login.html";
}
var amt =0;
var item = JSON.parse(localStorage.getItem("cart"));
item.map((value)=>{
  amt +=Number(value.quantity*value.price)
})

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_4I2n9u7ptH8Bge", // Enter the Key ID generated from the Dashboard
    amount: Math.floor(amt * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
      "handler": function (response) {
        localStorage.removeItem("cart")
        window.location.href = "/cart/";
      },
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  e.preventDefault();
};