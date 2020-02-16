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
const expenseForm = document.querySelector('.expense');
const budgetForm = document.querySelector('.budget-form');
const updateMssg = document.querySelector('.update-msg');

// animate login cart
const showLogin = new Navbar(document.querySelector('.navbar'));
showLogin.init();

//add new products to firebase
expenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = expenseForm.productName.value.trim();
    const price = expenseForm.price.value.trim();
    
    products.addProduct(name, price)
        .then(() => expenseForm.reset())
        .catch(err => console.log(err));
});

// add / update budget
budgetForm.addEventListener('submit', e => {
    e.preventDefault();
    const budget = budgetForm.budget_value.value.trim();
    products.updateBudget(budget);
    //reset form
    budgetForm.reset();
    // show message
    updateMssg.innerText = `Your budget was updated to ${budget}$`;
    updateMssg.classList.add('act');
    setTimeout(() => {
        updateMssg.innerText = '';
        updateMssg.classList.remove('act');
    }, 3000);
})


// check budget in local storage
const budget = localStorage.budget ? localStorage.budget : 0;

//class instances
const products = new Product('pierogi', '22,39', budget);
const productUI = new ProductUI(table);

//get the products and render
products.getProducts(data => productUI.render(data));

