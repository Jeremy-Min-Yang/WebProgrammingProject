const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

// ===== MENU SHOW =====
navToggle.addEventListener('click', () => {
   navMenu.classList.add('show-menu')
})

// ===== MENU HIDDEN =====
navClose.addEventListener('click', () => {
   navMenu.classList.remove('show-menu')
})

// ====== LOG IN ======
const login = document.getElementById('login')
loginBtn = document.getElementById('login-btn')
loginClose = document.getElementById('login-close')

loginBtn.addEventListener('click', () => {
   login.classList.add('show-login')
})

loginClose.addEventListener('click', () => {
   login.classList.remove('show-login')
})

// ===== CART SLIDE =====
document.addEventListener('DOMContentLoaded', function () {
   const cartIcon = document.getElementById('cart-icon');
   const cartSlide = document.querySelector('.cart-slide');
   const closeCart = document.getElementById('close-cart');

   cartIcon.addEventListener('click', function () {
      cartSlide.classList.add('show');
   });
   closeCart.addEventListener('click', function () {
      cartSlide.classList.remove('show');
   });
});

// // ===== ADD TO CART =====
if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", ready);
} else {
   ready();
}

function ready() {
   // Existing event listeners for the cart system
   let removeCartButtons = document.getElementsByClassName("cart-remove");
   for (let i = 0; i < removeCartButtons.length; i++) {
       let button = removeCartButtons[i];
       button.addEventListener("click", removeCartItem);
   }

   let quantityInputs = document.getElementsByClassName("cart-quantity");
   for (let i = 0; i < quantityInputs.length; i++) {
       let input = quantityInputs[i];
       input.addEventListener("change", quantityChanged);
   }

   let addCart = document.getElementsByClassName("add-cart");
   for (let i = 0; i < addCart.length; i++) {
       let button = addCart[i];
       button.addEventListener("click", addCartClicked);
   }

   // Add event listeners for individual product page
   let addToCartBtn = document.getElementById("add-to-cart-btn");
   if (addToCartBtn) {
       addToCartBtn.addEventListener("click", addSingleProductToCart);
   }

   let buyNowBtn = document.querySelector(".buy-now");
   if (buyNowBtn) {
       buyNowBtn.addEventListener("click", buyNow);
   }

   loadCartItems();
   updateCartIcon();
}

function addCartClicked(event) {
   let button = event.target;
   let shopProducts = button.closest(".shop_box");
   let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
   let price = shopProducts.getElementsByClassName("price")[0].innerHTML;
   let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
   addProductToCart(title, price, productImg);
   updateTotal();
   saveCartItems();
   updateCartIcon();
}

function addProductToCart(title, price, productImg) {
   let cartShopBox = document.createElement("div");
   cartShopBox.classList.add("cart-box");
   let cartItems = document.getElementsByClassName("cart-content")[0];
   let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

   for (let i = 0; i < cartItemsNames.length; i++) {
       if (cartItemsNames[i].textContent.trim() === title.trim()) {
           alert("Item is already added to Cart!");
           return;
       }
   }
   let cartBoxContent = `
       <img src="${productImg}" alt="" class="cart-img">
       <div class="detail-box">
           <div class="cart-product-title">${title}</div>
           <div class="cart-price">${price}</div>
           <input type="number" value="1" class="cart-quantity">
       </div>
       <i class="fa fa-trash cart-remove"></i>`;
   cartShopBox.innerHTML = cartBoxContent;
   cartItems.append(cartShopBox);
   cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
   cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
   saveCartItems();
   updateCartIcon();
}

function addSingleProductToCart() {
   let title = document.querySelector(".right .product-title").innerText;
   let price = document.querySelector(".right .price").innerText;
   let productImg = document.querySelector(".left .product-img img").src;
   addProductToCart(title, price, productImg);
   updateTotal();
   saveCartItems();
   updateCartIcon();
}

function buyNow() {
   let title = document.querySelector(".right .product-title").innerText;
   let price = document.querySelector(".right .price").innerText;
   let productImg = document.querySelector(".left .product-img img").src;

   let item = {
       title: title,
       price: price,
       quantity: 1,
       productImg: productImg
   };

   fetch("/stripe-checkout", {
       method: "POST",
       headers: new Headers({ "Content-Type": "application/json" }),
       body: JSON.stringify({
           items: [item],
       }),
   })
   .then((res) => res.json())
   .then((url) => {
       // Redirect to the Stripe checkout session URL
       location.href = url;
   })
   .catch((err) => console.error("Error:", err));
}

// Existing functions for removing items, changing quantity, updating total, saving and loading cart items, and updating cart icon

function removeCartItem(event) {
   let buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   updateTotal();
   saveCartItems();
   updateCartIcon(); // Ensure the cart icon is updated after removing an item
}

function quantityChanged(event) {
   let input = event.target;
   if (isNaN(input.value) || input.value <= 0) {
       input.value = 1;
   }
   updateTotal();
   saveCartItems();
   updateCartIcon(); // Ensure the cart icon is updated after changing the quantity
}

function updateTotal() {
   let cartContent = document.getElementsByClassName("cart-content")[0];
   let cartBoxes = cartContent.getElementsByClassName("cart-box");
   let total = 0;
   for (let i = 0; i < cartBoxes.length; i++) {
       let cartBox = cartBoxes[i];
       let priceElement = cartBox.getElementsByClassName("cart-price")[0];
       let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
       let price = parseFloat(priceElement.innerText.replace("$", ""));
       let quantity = quantityElement.value;
       total += price * quantity;
   }
   total = Math.round(total * 100) / 100;
   document.getElementsByClassName("total-price")[0].innerText = "$" + total;
   localStorage.setItem("cartTotal", total);
}

function saveCartItems() {
   let cartContent = document.getElementsByClassName("cart-content")[0];
   let cartBoxes = cartContent.getElementsByClassName("cart-box");
   let cartItems = [];
   for (let i = 0; i < cartBoxes.length; i++) {
       let cartBox = cartBoxes[i];
       let titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
       let priceElement = cartBox.getElementsByClassName("cart-price")[0];
       let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
       let productImg = cartBox.getElementsByClassName("cart-img")[0].src;

       let item = {
           title: titleElement.innerText,
           price: priceElement.innerText,
           quantity: quantityElement.value,
           productImg: productImg
       };
       cartItems.push(item);
   }
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCartItems() {
   let cartItems = localStorage.getItem("cartItems");
   if (cartItems) {
       cartItems = JSON.parse(cartItems);

       for (let i = 0; i < cartItems.length; i++) {
           let item = cartItems[i];
           addProductToCart(item.title, item.price, item.productImg);

           // Set the quantity of the last added item
           let cartBoxes = document.getElementsByClassName("cart-box");
           let cartBox = cartBoxes[cartBoxes.length - 1];
           let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
           quantityElement.value = item.quantity;
       }
   }

   // Update the total price after loading the items
   updateTotal();

   // Check if cartTotal is in localStorage and update it
   let cartTotal = localStorage.getItem("cartTotal");
   if (cartTotal) {
       document.getElementsByClassName("total-price")[0].innerText = "$" + cartTotal;
   }
   updateCartIcon();
}

function updateCartIcon() {
   let cartBoxes = document.getElementsByClassName("cart-box");
   let quantity = 0;

   for (var i = 0; i < cartBoxes.length; i++) {
       let cartBox = cartBoxes[i];
       let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
       quantity += parseInt(quantityElement.value);
   }
   let cartIcon = document.querySelector("#cart-icon");
   cartIcon.setAttribute("data-quantity", quantity);

   let cartItemCountElement = document.querySelector("#cart-item-count");
   if (cartItemCountElement){
       cartItemCountElement.textContent = quantity;
   }
}

// Existing event listener for the pay button to handle checkout and clear the cart
const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
   const cartItems = localStorage.getItem("cartItems");

   if (cartItems) {
       fetch("/stripe-checkout", {
           method: "POST",
           headers: new Headers({ "Content-Type": "application/json" }),
           body: JSON.stringify({
               items: JSON.parse(cartItems),
           }),
       })
       .then((res) => res.json())
       .then((url) => {
           // Clear cart items from localStorage after successful checkout
           localStorage.removeItem("cartItems");

           // Redirect to the Stripe checkout session URL
           location.href = url;
       })
       .catch((err) => console.error("Error:", err));
   } else {
       console.error("No items in the cart.");
   }
});

//  ===== GOOGLE API (ABOUT US) =====
function initMap() {
   let mapOptions = {
      center: { lat: 37.566236, lng: 126.943248 },
      zoom: 14
   }

   let map = new google.maps.Map(document.getElementById('map'), mapOptions);

   let markerOptions = {
      position: new google.maps.LatLng(37.566236, 126.943248),
      map: map
   }

   let marker = new google.maps.Marker(markerOptions)
}