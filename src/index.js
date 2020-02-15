import './money-app/styles/main.css';
import './money-app/styles/navbar/navbar.css';
import './money-app/styles/budget/budget.css';
import './money-app/styles/expense_form/expense.css';
import './money-app/styles/table/table.css';
import './money-app/styles/stats/stats.css';
import Navbar from './money-app/navbar';
import Product from './money-app/product';

// animate login cart
const showLogin = new Navbar(document.querySelector('.navbar'));
showLogin.init();


//testing products

const products = new Product('pierogi', '22,39');
products.getProducts((data) => {
    console.log(data);
});