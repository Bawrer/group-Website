// Toggle the navigation menu for small screens

const menuToggle = document.getElementById('menu-toggle');

const navLinks = document.getElementById('nav-links');

 

menuToggle.addEventListener('click', () => {

    navLinks.classList.toggle('active');

});