const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
})

/*===== MENU HIDDEN =====*/
navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
})

/*====== LOG IN ====== */
const login = document.getElementById('login')
      loginBtn = document.getElementById('login-btn')
      loginClose = document.getElementById('login-close')

loginBtn.addEventListener('click', () => {
    login.classList.add('show-login')
})

loginClose.addEventListener('click', () => {
    login.classList.remove('show-login')
})
