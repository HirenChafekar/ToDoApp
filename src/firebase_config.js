import firebase from "@firebase/app";
import "firebase/database"; // If using Firebase database
import "firebase/storage";
import "firebase/firestore"; // If using Firebase database

var firebaseConfig = {
  apiKey: "AIzaSyDgJdvvHPu4uQWk91laCky9R-sZ4NJNS2s",
  authDomain: "todoapp-fd94e.firebaseapp.com",
  projectId: "todoapp-fd94e",
  storageBucket: "todoapp-fd94e.appspot.com",
  messagingSenderId: "904026433970",
  appId: "1:904026433970:web:cb14c820fe318ae7045cab"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
