//chceking user if not exit then redrict to login page
var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting curent Item Obj
if (!currentitem) {
    window.location.href = "/loginpage/";
}

var total=0;
var items=0;
var carditem=JSON.parse(localStorage.getItem("cart")) || []; 
var data ="";
var data2 ="";


carditem.forEach((value,index) => {
    total += Number(value.quantity*value.price);
    items += value.quantity;
    data +=`<div class="card mb-3 mb-lg-0">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div>
                                <img src="${value.img}" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                            </div>
                            <div class="ms-3">
                                <h5>${value.name}</h5>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <div style="width: 50px;">
                                <h5 class="fw-normal mb-0">${value.quantity}</h5>
                            </div>
                            <div style="width: 80px;">
                                <h5 class="mb-0">$${value.quantity*value.price}</h5>
                            </div>
                            <a href="#" style="color: #cecece;" onclick="removeItem(${index})"><i class="text-danger fas fa-trash-alt"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;
    data2 +=`<tr>
                <th scope="row">${value.id}</th>
                <td>${value.name}</td>
                <td>${value.quantity}</td>
                <td>${value.quantity*value.price}</td>
            </tr>`;
});
document.getElementById("items").innerHTML = data;
document.getElementById("item2").innerHTML = data2;
document.getElementById("total").innerText ="$ "+ total;

function removeItem(index) {
    carditem.splice(index, 1); // remove the item from the array
    localStorage.setItem("cart", JSON.stringify(carditem)); // update the local storage
    location.reload(); // reload the page to reflect the changes
}
document.getElementById("qty").innerHTML=items;
if(items==0){
  document.getElementById("img").innerHTML="<h4 class='text-center'><a style='text-decoration: none;' href='../shop'><i class='fa fa-shop'></i> Go to Shop</a></h4><img src='../landingPagePic.png' class='w-50' />"
 }

//CheckOut Button
function payment(){
  if(total==0){
    return
  }
  window.location.href = "/razorpay/";
}