import './money-app/auth.js';
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
const account = document.querySelector('#acc');


// ------------- AUTH FUNCTIONS -----------------------------
// zostawic - moze sie przyda ten space

// setup UI login/logout
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const userData = document.querySelector('.main-container');
const logoutMsg = document.querySelector('.logout-msg');


const authUI = user => {
if (user){
    //toggle nav UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    logoutMsg.style.display = 'none';
    userData.style.display = 'grid';
} else {
    //toggle nav UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    logoutMsg.style.display = 'block';
    userData.style.display = 'none';
}
}


//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user){
        console.log('user logged in:', user.uid); // test
        authUI(user);

        //get the products and render
        products.getProducts(((data, id) => {
            // console.log(id);
            productUI.render(data, id);
            

        }), user.uid);
        
        // delete products
        table.addEventListener('click', e => {
            console.log(e);
            if (e.target.tagName === 'BUTTON'){
                const id = e.target.parentElement.parentElement.getAttribute('data-id');
                db.collection('users')
                    .doc(user.uid)
                    .collection('products')
                    .doc(id)
                    .delete()
                    .then(() => {
                        // show message
                        updateMssg.innerText = `Product was deleted`;
                        updateMssg.classList.add('act');
                        setTimeout(() => {
                            updateMssg.innerText = '';
                            updateMssg.classList.remove('act');
                    
                        }, 3000);
                        const table = document.querySelector('.table-body');
                        const tableTr = table.querySelectorAll('tr')
                        tableTr.forEach(doc => {
                            if(doc.getAttribute('data-id') === id){
                            doc.remove();
                        }})
                })
            }
        });
        
        // sum prices and output statistics to DOM
        products.sumPrices(user.uid).then(value1 => {
            db.collection('users').doc(user.uid).onSnapshot(snapshot => {
                
                sumStats.addStatsUI(value1[0], snapshot.data().budget);
            })
            
        });
        //add new products to firebase
        expenseForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = expenseForm.productName.value.trim();
        const price = Number(expenseForm.price.value.trim());
    
        console.log(`Product added: ${name}, ${price}`);
        const user = firebase.auth().currentUser.uid;
        products.addProduct(name, price, user)
            .then(() => expenseForm.reset())
            .catch(err => console.log(err));
                
});

    // account info
        db.collection('users').doc(user.uid).get().then(doc => {
        const html = `
            <div class="accInfo">
            <div class="accInfo__email">Logged in as <span class="info">${user.email}</span></div>
            <div class="accInfo__budget">Your budget: <span class="info">${doc.data().budget}$</span></div></div>
        `;
        account.innerHTML += html;
        });

        budgetForm.addEventListener('submit', e => {
            e.preventDefault();
            //update budget 
            const budget = parseInt(budgetForm.budget_value.value.trim());
            products.updateBudget(budget, user.uid);
            //reset form
            budgetForm.reset();
            sumStats.addStatsUI('','');
            const budgetCart = document.querySelector('#budget');
            budgetCart.classList.remove('active');
        
            // show message
            updateMssg.innerText = `Your budget was updated to ${budget}$`;
            updateMssg.classList.add('act');
            setTimeout(() => {
                updateMssg.innerText = '';
                updateMssg.classList.remove('act');
        
            }, 3000);
        })
        } else {
            console.log('user logged out');
            authUI('');
            productUI.render('');

            
        }
});






// animate login cart
const showLogin = new Navbar(document.querySelector('.navbar'));
showLogin.init();





// add / update budget ----------------------------------------
const budget = localStorage.budget ? localStorage.budget : 0;






// ------------------------------------------------------------


//class instances
const products = new Product('pierogi', '22,39');
const productUI = new ProductUI(table);
const sumStats = new Stats(stats, budgetCircle, budget);
