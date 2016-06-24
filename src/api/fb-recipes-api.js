import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCVqHBbV-sRbJuL5cI4PQ-lda2vrwF7Wq8',
  authDomain: 'recetas-redux.firebaseapp.com',
  databaseURL: 'https://recetas-redux.firebaseio.com',
  storageBucket: 'recetas-redux.appspot.com',
};
firebase.initializeApp(config);


const firebaseDB = firebase.database();
export function fetchRecipes() {
  return firebaseDB.ref('recipes/')
    .once('value')
    .then(snap => snap.val());
}

export function loginPromise() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);

  return firebase.auth().getRedirectResult().then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log('token=', result.credential);

    // The signed-in user info.
    var user = result.user;
    console.log('user=', user);

    return user;
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
