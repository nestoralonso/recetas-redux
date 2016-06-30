import firebase from 'firebase';
import * as utils from './utils';


// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCVqHBbV-sRbJuL5cI4PQ-lda2vrwF7Wq8',
  authDomain: 'recetas-redux.firebaseapp.com',
  databaseURL: 'https://recetas-redux.firebaseio.com',
  storageBucket: 'recetas-redux.appspot.com',
};
firebase.initializeApp(config);


const firebaseDB = firebase.database();
export function fetchRecipes(userId) {
  return firebaseDB.ref(`user-recipes/${userId}`)
    .once('value')
    .then(snap => snap.val());
}

export function fetchIngredients(userId) {
  return firebaseDB.ref(`user-ingredients/${userId}`)
    .once('value')
    .then(snap => snap.val());
}

export function addRecipe(recipeForm, userId) {
  const recipeId = firebaseDB.ref().child('recipes').push().key;
  const newRecipe = utils.convertRecipeToFB(recipeForm);
  newRecipe.id = recipeId;

  const updates = {};
  updates[`/recipes/${recipeId}`] = recipeForm;
  updates[`/user-recipes/${userId}/${recipeId}`] = recipeForm;

  // Now collect the new created ingredients
  const newIngs = utils.getNewIngredients(recipeForm);
  for (const ing of newIngs) {
    const newKey = firebaseDB.ref().child('ingredients').push().key;
    updates[`/ingredients/${newKey}`] = ing;
    updates[`/user-ingredients/${userId}/${newKey}`] = ing;
  }

  const res = firebaseDB.ref().update(updates);
  res.then(x => console.log(x));
  return Promise.resolve(newRecipe);
}

export function loginPromise() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    const user = result.user;
    console.log('login=', token, user.displayName);
    return user;
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;

    console.error('Auth error:', { errorCode, errorMessage, email, credential });
  });
}
