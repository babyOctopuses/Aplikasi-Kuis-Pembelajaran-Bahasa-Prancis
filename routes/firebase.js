import firebase from 'firebase';
import firestore from 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBLAHSBz8e7h9QvNypl3tbB7764Tbla3Mc",
  authDomain: "quizapp-18fdf.firebaseapp.com",
  databaseURL: "https://quizapp-18fdf-default-rtdb.firebaseio.com",
  projectId: "quizapp-18fdf",
  storageBucket: "quizapp-18fdf.appspot.com",
  messagingSenderId: "762808574400",
  appId: "1:762808574400:web:e2d2f5e91caf3467602825",
  measurementId: "G-LGR2D3941J"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  firebase.storage();

  export default firebase;