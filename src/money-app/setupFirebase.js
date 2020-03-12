// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDcVWlkm_RhSTO7HOEBFMrLwYz7GTvRqBQ',
  authDomain: 'money-app-da27c.firebaseapp.com',
  databaseURL: 'https://money-app-da27c.firebaseio.com',
  projectId: 'money-app-da27c',
  storageBucket: 'money-app-da27c.appspot.com',
  messagingSenderId: '324784059431',
  appId: '1:324784059431:web:de3fab2c0c393cf92a0a02',
};

firebase.initializeApp(firebaseConfig);
