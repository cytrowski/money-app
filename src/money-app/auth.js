import { signUp, signOut, signIn } from './services/auth';

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
