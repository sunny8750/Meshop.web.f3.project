var currentitem = JSON.parse(localStorage.getItem("currentUser")); // getting curent Item Obj
if (!currentitem) {
    window.location.href = "../login.html";
}
var products =""
async function main() {
  let apiUrl = "https://fakestoreapi.com/products"
  async function getProducts(url) {
      let response = await fetch(url);
      let data = await response.json()
      return data;
  }
  updatedData = await getProducts(apiUrl)
  // console.log(jsondata);
  
 const proData= updatedData.map((values) => {
    var size =["S","M","L","XL"];
    var colours =["Red","Blue","Black","White","Green"];
    const randomColor = colours[Math.floor(Math.random() * colours.length)];
    const randomSize = size[Math.floor(Math.random() * size.length)];
    return { ...values, colours: randomColor, size: randomSize ,Abhi:2};
  })
  // Store the updated data in local storage
  localStorage.setItem("products", JSON.stringify(proData));
  
}
window.onload =()=>{
  main()
  filterproduct("All");
}
var product = JSON.parse(localStorage.getItem("products"));
   function filterproduct(value) {
 
    var buttons = document.querySelectorAll(".filter");
    buttons.forEach((button)=>{
      if(value.toUpperCase()==button.innerText.toUpperCase()){
        button.classList.add("active");
      }else{
        button.classList.remove("active");
      }
    });
    
    if(value=="All"){
      products =product;
      displayProducts(product)
    }else if(value=="mens"){
      products = product.filter(product => product.category === "men's clothing");
      displayProducts(products)
    }else if(value=="womens"){
      products = product.filter(product => product.category === "women's clothing");
      displayProducts(products)
    }else if(value=="jewelery"){
      products = product.filter(product => product.category === "jewelery");
      displayProducts(products)
    }else if(value=="electronics"){
      products = product.filter(product => product.category === "electronics");
      displayProducts(products)
    }
}

const searchInput = document.querySelector('#filterserach');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
  displayProducts(filteredProducts);
});


// Get references to the checkbox elements
const colorCheckboxes = document.querySelectorAll('.color-filter');
const sizeCheckboxes = document.querySelectorAll('.size-filter');

// Add event listeners to the checkbox elements
colorCheckboxes.forEach(checkbox => checkbox.addEventListener('change', applycolor));
sizeCheckboxes.forEach(checkbox => checkbox.addEventListener('change', applysize));

// Define the applyFilters function
function applycolor() {
  // Get the checked options from the checkbox elements
  const checkedColors = Array.from(colorCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  // Filter the products based on the checked options
  const filteredProducts = products.filter(product => {
    const hasCheckedColor = checkedColors.includes(product.colours);
    return hasCheckedColor
  });
 console.log(filteredProducts);
  // Display the filtered products
  displayProducts(filteredProducts);
}

function applysize(){
  const checkedSizes = Array.from(sizeCheckboxes)
  .filter(checkbox => checkbox.checked)
  .map(checkbox => checkbox.value);
 
    // Filter the products based on the checked options
    const filteredProducts = products.filter(product => {
      const hasCheckedSize = checkedSizes.includes(product.size);
      return hasCheckedSize
    });
 
    // Display the filtered products
    displayProducts(filteredProducts);
}


const priceSlider = document.querySelector('.price-slider');
const ratingFilter = document.querySelector('.rating-filter');
// const products = []; // Your array of products

priceSlider.addEventListener('input', () => {
  const maxprice = priceSlider.value;
  const filteredProducts = products.filter(product => product.price >= maxprice);
  displayProducts(filteredProducts);
});

ratingFilter.addEventListener('input', () => {
  const minRating = ratingFilter.value;
  const filterrate = products.filter(product => product.rating.rate >= minRating);
  displayProducts(filterrate);
});

let cartData = JSON.parse(localStorage.getItem('cart')) || [];
  // Add a product to the cart
  function addToCart(id,name,price,img) {
    // Check if the item is already in the cart
    const itemIndex = cartData.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      // If the item is not in the cart, add it with a quantity of 1
      const item = {
        id: id,
        name:name,
        price:price,
        img:img,
        quantity: 1
      };
      cartData.push(item);
    } else {
      // If the item is already in the cart, increase its quantity by 1
      cartData[itemIndex].quantity++;
    }
    // Save the cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
     function addCart(){
   
    // Get all the "Add to Cart" buttons on the page
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log("clicked");
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const img = button.getAttribute('data-img');
        addToCart(id,name,price,img);
      });
    });
  }
  addCart(); 

function displayProducts(products) {
  const productsContainer = document.querySelector('#items');

  productsContainer.innerHTML = ''; // Clear the container before adding new products

  products.forEach(value => {

    const productCard = `
    <div class="col-lg-4 col-md-12 mb-4 data-category="${value.category}" item">
           <div class="card">
             <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
               data-mdb-ripple-color="light">
               <img src="${value.image}"
                 class="card-img-top" />
                 <div class="hover-overlay">
                   <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                 </div>
             </div>
             <div class="card-body">
                 <h5 class="card-title mb-3">${value.title}</h5>
               
                 <div class="row">
                   <div class="col-8">
                     <p><b>Category </b>${value.category}</p>
                   </div>
                   <div class="col-4">
                     <p><b>Colour</b>  ${value.colours}</p>
                   </div>
                 </div>
                 <div class="row">
                   <div class="col-6">
                     <p><b>Size </b>${value.size}</p>
                   </div>
                   <div class="col-6">
                     <p><b>Rating </b>${value.rating.rate}</p>
                   </div>
                 </div>
                 <div class="row">
                   <div class="col-6">
                     <p><b>Stock </b>${value.rating.count}</p>
                   </div>
                   <div class="col-6">
                     <h6 class="mb-3"><b>Price </b>$${value.price}</h6>
                   </div>
                 </div>
             </div>
             <div class="card-footer">
               <div class="row">
                 <button class="btn btn-dark add-to-cart-button" data-name="${value.title}" data-img="${value.image}" data-price="${value.price}" data-id="${value.id}" type="submit">Add cart</button>
               </div>
             </div>
           </div>
         </div>
    `;
    productsContainer.insertAdjacentHTML('beforeend', productCard);
  });
}

window.addEventListener('load', addCart);