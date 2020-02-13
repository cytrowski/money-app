class Navbar {
    constructor (container){
        this.container = container;
        this.nav = container.querySelector('.nav__pick');
        this.login = container.querySelector('.login');
    }
    init(){

        this.nav.addEventListener('click', e => {
            if(e.target.tagName === 'LI'){
                this.login.classList.toggle('active');
            };
        });

    }
}

export { Navbar as default };