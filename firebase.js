import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAfN_JYTW2CubOkjd2hBV-Ca1H8EcVTX5Q',
  authDomain: 'web-board-7f50f.firebaseapp.com',
  projectId: 'web-board-7f50f',
  storageBucket: 'web-board-7f50f.appspot.com',
  messagingSenderId: '203607029376',
  appId: '1:203607029376:web:977af9a861115bf9281865',
  measurementId: 'G-SKV1FQWZL8',
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// export utils/refs
export { db, auth };
