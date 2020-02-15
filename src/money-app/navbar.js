class Navbar {
    constructor (container){
        this.container = container;
        this.nav = container.querySelectorAll('.nav__pick');
        this.login = container.querySelectorAll('.slide_menu');
    }
    init(){
        this.nav.forEach(nav => {
            nav.addEventListener('click', e => {
            if(e.target.tagName === 'LI'){
                this.slideMenu(e);
            };
        });
    });
    }
    slideMenu(e){ //add class active
         const selector = e.target.getAttribute('data-target');
         const content = this.container.querySelector(selector);
         content.classList.toggle('active');
    }
    
}

export { Navbar as default };