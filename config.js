import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyD2BKAccTLj9Q6BEmnLblRWbWAfBZuZ4ko",
    authDomain: "build-bid-donate.firebaseapp.com",
    projectId: "build-bid-donate",
    storageBucket: "build-bid-donate.appspot.com",
    messagingSenderId: "916718562958",
    appId: "1:916718562958:web:6fb70116fb5ca20d03e3df"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore();