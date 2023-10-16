// JavaScript for toggling the mobile menu
const mobileMenuButton = document.querySelector('.fl-menu-mobile-toggle');
const menuNav = document.querySelector('.fl-menu ul');

mobileMenuButton.addEventListener('click', () => {
    menuNav.classList.toggle('show-menu');
});