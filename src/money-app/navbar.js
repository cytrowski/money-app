class Navbar {
  constructor(container) {
    this.container = container;
    this.nav = container.querySelectorAll('.nav__pick');
    this.login = container.querySelectorAll('.slide_menu');
    this.loggedInLinks = container.querySelectorAll('.logged-in');
    this.loggedOutLinks = container.querySelectorAll('.logged-out');
    this.userData = container.querySelector('.main-container');
  }
  init() {
    this.nav.forEach(nav => {
      nav.addEventListener('click', e => {
        if (e.target.tagName === 'LI') {
          this.slideMenu(e);
        }
      });
    });
  }
  slideMenu(e) {
    //add class active
    const selector = e.target.getAttribute('data-target');
    const content = this.container.querySelector(selector);
    content.classList.toggle('active');
  }
  authUI(user) {
    if (user) {
      //toggle nav UI elements
      this.loggedInLinks.forEach(item => (item.style.display = 'block'));
      this.loggedOutLinks.forEach(item => (item.style.display = 'none'));
    } else {
      //toggle nav UI elements
      this.loggedInLinks.forEach(item => (item.style.display = 'none'));
      this.loggedOutLinks.forEach(item => (item.style.display = 'block'));
      this.userData.style.display = 'none';
    }
  }
}

export { Navbar as default };
