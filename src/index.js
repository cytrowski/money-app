import './money-app/styles/main.css';
import './money-app/styles/navbar/navbar.css';
import './money-app/styles/budget/budget.css';
import './money-app/styles/expense_form/expense.css';
import './money-app/styles/table/table.css';
import './money-app/styles/stats/stats.css';

import './money-app/setupFirebase';
import firebase from 'firebase';

import {
  signUp,
  signOut,
  signIn,
  addProduct,
  subscribeForProducts,
  getSumOfPrices,
} from './money-app/services/all';

import { format } from 'date-fns';

class ProductUI {
  constructor(list) {
    this.list = list;
  }
  render(data, id) {
    if (data) {
      const when = format(data.created_at.toDate(), 'dd.mm.yyyy');
      const html = `
        <tr data-id="${id}">
        <td>${when}</td>
        <td>${data.name}</td>
        <td>${data.price} $</td>
        <td><button class="exit-btn">X</button></td>
        </tr>
        `;

      this.list.innerHTML += html;
    } else {
      this.list.innerHTML = '';
    }
  }
  delete(id) {
    const tableTr = this.list.querySelectorAll('tr');
    tableTr.forEach(doc => {
      if (doc.getAttribute('data-id') === id) {
        doc.remove();
      }
    });
  }
}

class Stats {
  constructor(stats, circle, budget) {
    this.stats = stats;
    this.circle = circle;
    this.budget = budget;
  }
  addStatsUI(data, budget) {
    if (data) {
      const outcome = Math.round(data * 100) / 100;
      const sumAll = Math.round((budget - outcome) * 100) / 100;

      this.stats.innerHTML = `
        <div><span class="budget-name">Budget: </span>  <span class="stat-value">${budget}$</span></div>
        <div><span class="budget-name">Outcome: </span> <span class="stat-value outcome-value">${outcome}$</span></div>
        <div><span class="budget-name">All: </span> <span class="stat-value last-value">${sumAll}$</span></div>
        `;
      const circle = Math.round(((outcome * 100) / budget) * 100) / 100;
      this.circle.innerHTML = `${circle}%`;
    } else {
      this.stats.innerHTML = '';
      this.circle.innerHTML = '';
    }
  }
  updateOutcome(data) {
    const outcome = document.querySelector('.outcome-value');
    const value = Math.round(data * 100) / 100;

    outcome.innerHTML = `${value}$`;
  }
}

//querySelectors
const signupForm = document.querySelector('.signup-form');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('.login-form');

// signup user
signupForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = signupForm['signup-login'].value;
  const password = signupForm['signup-password'].value;
  const signupBudget = signupForm['signup-budget'].value;

  signUp(email, password, signupBudget).then(() => {
    signupForm.reset();
    signupForm.parentElement.classList.remove('active');
  });
});

// logout1
logout.addEventListener('click', e => {
  e.preventDefault();

  signOut();
});

//login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  //get user info
  const email = loginForm['login_name'].value;
  const password = loginForm['password'].value;

  signIn(email, password).then(data => {
    loginForm.reset();
    loginForm.parentElement.classList.remove('active');
  });
});

const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

const budgetForm = qs('.budget-form');
const updateMssg = qs('.update-msg');
const stats = qs('.stats');
const budgetCircle = qs('.budget__circle');
const account = qs('#acc');

const authUI = user => {
  const userData = qs('.main-container');
  const logoutMsg = qs('.logout-msg');

  const loggedInLinks = qsa('.logged-in');
  const loggedOutLinks = qsa('.logged-out');

  if (user) {
    //toggle nav UI elements
    loggedInLinks.forEach(item => {
      item.style.display = 'block';
    });
    loggedOutLinks.forEach(item => {
      item.style.display = 'none';
    });
    logoutMsg.style.display = 'none';
    userData.style.display = 'grid';
  } else {
    //toggle nav UI elements
    loggedInLinks.forEach(item => {
      item.style.display = 'none';
    });
    loggedOutLinks.forEach(item => {
      item.style.display = 'block';
    });
    logoutMsg.style.display = 'block';
    userData.style.display = 'none';
  }
};

const callbacks = [];

const container = qs('.navbar');

const cqs = container.querySelector.bind(container);
const cqsa = container.querySelectorAll.bind(container);

const nav = cqsa('.nav__pick');
const login = cqsa('.slide_menu');
const loggedInLinks = cqsa('.logged-in');
const loggedOutLinks = cqsa('.logged-out');

const userData = cqs('.main-container');

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

// add / update budget ----------------------------------------
const budget = localStorage.budget ? localStorage.budget : 0;

const sumStats = new Stats(stats, budgetCircle, budget);

//listen for auth status changes
firebase.auth().onAuthStateChanged(user => {
  const table = document.querySelector('.table-body');
  const productUI = new ProductUI(table);
  const usersCollection = firebase.firestore().collection('users');

  authUI(user);

  if (user) {
    //get the products and render
    const unsubscribe = subscribeForProducts((data, id) => {
      productUI.render(data, id);
    }, user.uid);
    callbacks.push(unsubscribe);

    // sum prices and output statistics to DOM
    getSumOfPrices(user.uid).then(value => {
      const unsubscribe = usersCollection.doc(user.uid).onSnapshot(snapshot => {
        sumStats.addStatsUI(value, snapshot.data().budget);
      });

      callbacks.push(unsubscribe);
    });

    // delete products
    const handleTableClick = e => {
      if (e.target.tagName === 'BUTTON') {
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        usersCollection
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
            productUI.delete(id);

            getSumOfPrices(user.uid).then(value => {
              sumStats.addStatsUI('', '');
              usersCollection
                .doc(user.uid)
                .get()
                .then(snapshot => {
                  console.log('budget:', snapshot.data().budget);
                  sumStats.addStatsUI(value, snapshot.data().budget);
                });
            });
          });
      }
    };
    table.addEventListener('click', handleTableClick);
    callbacks.push(() => table.removeEventListener('click', handleTableClick));

    const expenseForm = document.querySelector('.expense');
    //add new products to firebase
    const handleExpenseFormSubmit = e => {
      e.preventDefault();
      const name = expenseForm.productName.value.trim();
      const price = Number(expenseForm.price.value.trim());

      console.log(`Product added: ${name}, ${price}`);
      const user = firebase.auth().currentUser.uid;
      addProduct(name, price, user)
        .then(() => {
          getSumOfPrices(user).then(value => {
            sumStats.addStatsUI('', '');
            usersCollection.doc(user).onSnapshot(snapshot => {
              sumStats.addStatsUI(value, snapshot.data().budget);
            });
          });
          expenseForm.reset();
        })
        .catch(err => console.log(err));
    };
    expenseForm.addEventListener('submit', handleExpenseFormSubmit);
    callbacks.push(() =>
      expenseForm.removeEventListener('submit', handleExpenseFormSubmit)
    );

    // account info
    const getAccountInfo = () => {
      const unsubscribe = usersCollection.doc(user.uid).onSnapshot(doc => {
        const html = `
            <div class="accInfo">
            <img src="assets/img/user.png" alt="user_icon" class="accInfo__user">
            <div class="accInfo__email">Logged in as <span class="info">${
              user.email
            }</span></div>
            <div class="accInfo__budget">Your budget: <span class="info">${
              doc.data().budget
            }$</span></div></div>
        `;
        account.innerHTML = html;
      });
      callbacks.push(unsubscribe);
    };
    getAccountInfo();

    //update budget + form
    const handleBudgetFormSubmit = e => {
      e.preventDefault();
      //update budget
      const budget = Number(budgetForm.budget_value.value.trim());
      sumStats.addStatsUI('', '');
      updateBudget(budget, user.uid);
      //reset form
      budgetForm.reset();

      const budgetCart = document.querySelector('#budget');
      budgetCart.classList.remove('active');

      // show message
      updateMssg.innerText = `Your budget was updated to ${budget}$`;
      updateMssg.classList.add('act');

      setTimeout(() => {
        updateMssg.innerText = '';
        updateMssg.classList.remove('act');
      }, 3000);
    };
    budgetForm.addEventListener('submit', handleBudgetFormSubmit);
    callbacks.push(() =>
      budgetForm.removeEventListener('submit', handleBudgetFormSubmit)
    );
  } else {
    productUI.render('');
    sumStats.addStatsUI('');
    callbacks.forEach(callback => callback());
    callbacks.length = 0;
  }
});
