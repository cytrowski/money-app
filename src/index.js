import './money-app/styles/main.css';
import './money-app/styles/navbar/navbar.css';
import Navbar from './money-app/navbar';

// animate login cart
const showLogin = new Navbar(document.querySelector('.navbar'));
showLogin.init();
