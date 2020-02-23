import './money-app/styles/main.css';
import './money-app/styles/navbar/navbar.css';
import './money-app/styles/budget/budget.css';
import './money-app/styles/expense_form/expense.css';
import './money-app/styles/table/table.css';
import './money-app/styles/stats/stats.css';
import Navbar from './money-app/navbar';
import Product from './money-app/product';
import ProductUI from './money-app/productUI';
import Stats from './money-app/statsUI';




//query selectors
const table = document.querySelector('.table-body');
const expenseForm = document.querySelector('.expense');
const budgetForm = document.querySelector('.budget-form');
const updateMssg = document.querySelector('.update-msg');
const stats = document.querySelector('.stats');
const budgetCircle = document.querySelector('.budget__circle');

// ------------- AUTH FUNCTIONS -----------------------------

// signup user
const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signupForm['signup-login'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data.user);
            signupForm.reset();
            signupForm.parentElement.classList.remove('active');
        })
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut()
        .then(() => {
            console.log('user logout');
        })
})

//login 
const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    //get user info
    const email = loginForm['login_name'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(data => {
            console.log(data);
            loginForm.reset();
            loginForm.parentElement.classList.remove('active');
        })
})



// animate login cart
const showLogin = new Navbar(document.querySelector('.navbar'));
showLogin.init();


//add new products to firebase
expenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = expenseForm.productName.value.trim();
    const price = Number(expenseForm.price.value.trim());
    console.log(`Product added: ${name}, ${price}`);

    products.addProduct(name, price)
        .then(() => expenseForm.reset())
        .catch(err => console.log(err));
});



// add / update budget ----------------------------------------
budgetForm.addEventListener('submit', e => {
    e.preventDefault();
    //update budget 
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
// ------------------------------------------------------------


//class instances
const products = new Product('pierogi', '22,39');
const productUI = new ProductUI(table);
const sumStats = new Stats(stats, budgetCircle, budget);

//get the products and render
products.getProducts(data => {
    productUI.render(data)
});



// sum prices and output statistics to DOM

products.sumPrices().then(value => {

    sumStats.addStatsUI(value);

});