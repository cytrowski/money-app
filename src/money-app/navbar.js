export const initNavigation = () => {
  const container = document.querySelector('.navbar');
  const nav = container.querySelectorAll('.nav__pick');
  const login = container.querySelectorAll('.slide_menu');
  const loggedInLinks = container.querySelectorAll('.logged-in');
  const loggedOutLinks = container.querySelectorAll('.logged-out');
  const userData = container.querySelector('.main-container');

  const slideMenu = e => {
    //add class active
    const selector = e.target.getAttribute('data-target');
    const content = container.querySelector(selector);
    content.classList.toggle('active');
  };

  nav.forEach(nav => {
    nav.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        slideMenu(e);
      }
    });
  });
};
