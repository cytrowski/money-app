import './money-app/styles/main.css';
import './money-app/styles/navbar/navbar.css';
import './money-app/styles/budget/budget.css';
import './money-app/styles/expense_form/expense.css';
import './money-app/styles/table/table.css';
import './money-app/styles/stats/stats.css';
import Navbar from './money-app/navbar';
import Product from './money-app/product';
import ProductUI from './money-app/productUI';

//query selectors
const table = document.querySelector('.table-body');



// animate login cart
const showLogin = new Navbar(document.querySelector('.navbar'));
showLogin.init();

//class instances
const products = new Product('pierogi', '22,39');
const productUI = new ProductUI(table);

//get the products and render
products.getProducts(data => productUI.render(data));