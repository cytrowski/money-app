import firebase from 'firebase';

export const signUp = (email, password, signupBudget) => {
  const db = firebase.firestore();
  const auth = firebase.auth();

  return auth.createUserWithEmailAndPassword(email, password).then(data => {
    return db
      .collection('users')
      .doc(data.user.uid)
      .set({
        budget: signupBudget,
      });
  });
};

export const signOut = () => {
  const auth = firebase.auth();

  return auth.signOut();
};

export const signIn = (email, password) => {
  const auth = firebase.auth();

  return auth.signInWithEmailAndPassword(email, password);
};
