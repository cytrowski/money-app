// import Navbar from './money-app/navbar';

//querySelectors
const signupForm = document.querySelector('.signup-form');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('.login-form');





// signup user
signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signupForm['signup-login'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(data => {
            return db.collection('users').doc(data.user.uid).set({
                budget: signupForm['signup-budget'].value
            });
        })
        .then(() => {
            signupForm.reset();
            signupForm.parentElement.classList.remove('active');
        });
})

// logout
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
})

//login 
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    //get user info
    const email = loginForm['login_name'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(data => {
            loginForm.reset();
            loginForm.parentElement.classList.remove('active');
        })
})
