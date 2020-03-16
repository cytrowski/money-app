import firebase from 'firebase';

export const signUp = (email, password, signupBudget) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      return firebase
        .firestore()
        .collection('users')
        .doc(data.user.uid)
        .set({
          budget: signupBudget,
        });
    });

export const signOut = () => firebase.auth().signOut();

export const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const addProduct = (name, price, user) =>
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .collection('products')
    .add({
      name,
      price,
      created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    });

export const subscribeForProducts = (callback, user) =>
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .collection('products')
    .orderBy('created_at', 'desc')
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          //udpate UI
          return callback(change.doc.data(), change.doc.id);
        }
      });
    });

export const updateBudget = (budget, user) =>
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .update({ budget: budget });

export const getSumOfPrices = user =>
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .collection('products')
    .get()
    .then(snapshot => {
      let totalCount = 0;
      snapshot.forEach(doc => {
        totalCount += doc.data().price;
      });
      return totalCount;
    });
