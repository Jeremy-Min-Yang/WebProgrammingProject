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

// ====== IMAGE SLIDER ======
let onSlide = false;

window.addEventListener("load", () => {
   autoSlide();

   const dots = document.querySelectorAll(".carousel_dot");
   for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => slide(i));
   }

   const buttonPrev = document.querySelector(".carousel_button__prev");
   const buttonNext = document.querySelector(".carousel_button__next");
   buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
   buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
})

function autoSlide() {
   setInterval(() => {
      slide(getItemActiveIndex() + 1);
   }, 3000); // slide speed = 3s
}

function slide(toIndex) {
   if (onSlide)
      return;
   onSlide = true;

   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   let newItemActive = null;

   if (toIndex > itemActiveIndex) {
      // check if toIndex exceeds the number of carousel items
      if (toIndex >= itemsArray.length) {
         toIndex = 0;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_next");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__next");
         itemActive.classList.add("carousel_item__next");
      }, 20);
   } else {
      // check if toIndex exceeds the number of carousel items
      if (toIndex < 0) {
         toIndex = itemsArray.length - 1;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_prev");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__prev");
         itemActive.classList.add("carousel_item__prev");
      }, 20);
   }

   // remove all transition class and switch active class
   newItemActive.addEventListener("transitionend", () => {
      itemActive.className = "carousel_item";
      newItemActive.className = "carousel_item carousel_item__active";
      onSlide = false;
   }, {
      once: true
   });

   slideIndicator(toIndex);
}

function getItemActiveIndex() {
   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   return itemActiveIndex;
}

function slideIndicator(toIndex) {
   const dots = document.querySelectorAll(".carousel_dot");
   const dotActive = document.querySelector(".carousel_dot__active");
   const newDotActive = dots[toIndex];

   dotActive.classList.remove("carousel_dot__active");
   newDotActive.classList.add("carousel_dot__active");
}

// ===== CUSTOMER TESTIMONIALS =====

var swiper = new Swiper(".slide-content", {
   slidesPerView: 3,
   spaceBetween: 25,
   loop: true,
   centerSlide: 'true',
   fade: 'true',
   grabCursor: 'true',
   pagination: {
     el: ".swiper-pagination",
     clickable: true,
     dynamicBullets: true,
   },
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },

   breakpoints:{
       0: {
           slidesPerView: 1,
       },
       520: {
           slidesPerView: 2,
       },
       950: {
           slidesPerView: 3,
       },
   },
 });

//  Customer testimonials instagram: kim chaewon
var kimchaewon_button = document.getElementById("kimchaewon-ig");

kimchaewon_button.addEventListener("click", function() {
   console.log("Kim Chaewon");
   window.location.href= "https://www.instagram.com/_chaechae_1/?hl=en"
});

//  Customer testimonials instagram: neymar jr
var neymar_button = document.getElementById("neymar-ig");

neymar_button.addEventListener("click", function() {
   console.log("Neymar");
   window.location.href= "https://www.instagram.com/neymarjr/?hl=en"
});

//  Customer testimonials instagram: lebron
var lebron_button = document.getElementById("lebron-ig");

lebron_button.addEventListener("click", function() {
   console.log("lebron");
   window.location.href= "https://www.instagram.com/kingjames/?hl=en"
});

//  Customer testimonials instagram: messi
var messi_button = document.getElementById("messi-ig");

messi_button.addEventListener("click", function() {
   console.log("messi");
   window.location.href= "https://www.instagram.com/leomessi/?hl=en"
});

//  Customer testimonials instagram: einstein
var einstein_button = document.getElementById("einstein-ig");

einstein_button.addEventListener("click", function() {
   console.log("einstein");
   window.location.href= "https://www.instagram.com/alberteinstein/?hl=en"
});

//  Customer testimonials instagram: drake
var drake_button = document.getElementById("drake-ig");

drake_button.addEventListener("click", function() {
   console.log("drake");
   window.location.href= "https://www.instagram.com/champagnepapi/?hl=en"
});


//  ===== GOOGLE API (ABOUT US) =====
function initMap() {
   let mapOptions = {
   center: {lat: 37.566236, lng: 126.943248},
   zoom: 14
}

   let map = new google.maps.Map(document.getElementById('map'), mapOptions);

   let markerOptions = {
   position: new google.maps.LatLng(37.566236, 126.943248),
   map: map
}

   let marker = new google.maps.Marker(markerOptions)
} 