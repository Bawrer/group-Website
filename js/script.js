const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
  navLink.classList.toggle('active');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  navLink.classList.remove('active');
}));