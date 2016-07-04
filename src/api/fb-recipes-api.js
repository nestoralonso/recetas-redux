import firebase from 'firebase';
import * as utils from './utils';
import * as gu from '../utils';


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
  console.log('fetchRecipes(userId= ', userId);
  return firebaseDB.ref(`user-recipes/${userId}`)
    .once('value')
    .then(snap => {
      return snap.val();
    });
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
  updates[`/recipes/${recipeId}`] = newRecipe;
  updates[`/user-recipes/${userId}/${recipeId}`] = newRecipe;

  // Now collect the new created ingredients
  const newIngs = utils.getNewIngredients(recipeForm);
  for (const ingKey of Object.keys(newIngs)) {
    const ing = newIngs[ingKey];
    const newKey = firebaseDB.ref().child('ingredients').push().key;
    updates[`/ingredients/${newKey}`] = ing;
    updates[`/user-ingredients/${userId}/${newKey}`] = ing;
  }

  const res = firebaseDB.ref().update(updates);
  res
    .then(_ => console.log('new rp success'))
    .catch(err => Promise.reject(err));
  return Promise.resolve(newRecipe);
}

export function collectIngsByIds(dict) {
  const allIngs = {};
  const allProm = [];
  for (const entry of gu.objectToTuples(dict)) {
    const otherKeys = entry.value;
    for (const entryKey of gu.objectToTuples(otherKeys)) {
      const ingKey = entryKey.key;
      const ingPromise = firebaseDB.ref(`ingredients/${ingKey}`).once('value');
      allIngs[ingKey] = ingPromise;
      allProm.push(ingPromise);
    }
  }

  return Promise.all(allProm).then(() => {
    for (const entryIng of gu.objectToTuples(allIngs)) {
      entryIng.value.then(i => {
        const val = i.val();
        if (val) {
          allIngs[entryIng.key] = val;
        } else { // the else is here because the linter tell me to
          delete allIngs[entryIng.key];
        }
      });
    }

    return allIngs;
  });
}

export function searchIngredients(name) {
  const ref = firebaseDB.ref('ing-by-word');
  console.log('ref=', ref);
  const queryRef = ref.orderByKey()
    .startAt(name).endAt(name + 'z')
    .limitToFirst(2);
  const queryResult = queryRef.once('value').then(res => res.val());
  return queryResult.then(idsIndex => collectIngsByIds(idsIndex));
}

export function searchRecipes(name) {
  const ref = firebaseDB.ref('recipes');
  console.log('ref=', ref);
  const queryRef = ref.orderByChild('title')
    .startAt(name).endAt(name + 'z')
    .limitToFirst(5);
  const queryResult = queryRef.once('value').then(res => res.val());
  return queryResult;
}

export function fetchIngredientsByKey(ingredientsMap) {
  const ingredientsRef = firebaseDB.ref('ingredients');
  if (!ingredientsMap) {
    return Promise.resolve({});
  }
  const promiseMap = Object.keys(ingredientsMap)
    .map(key => ({
      key,
      val: ingredientsRef.child(key)
      .once('value').then(i => i.val()) })).reduce((acum, x) => {
        acum[x.key] = x.val;
        return acum;
      }, {});

  return gu.waitForAllKeys(promiseMap);
}

/**
 * @param {String} recipeId
 * @returns {Promise<Object>} a promise that contains an object
 * with keys for the recipe and the ingredients
 */
export function fetchRecipeWithDetails(recipeId) {
  const ref = firebaseDB.ref(`recipes/${recipeId}`);
  const recipePromise = ref.once('value').then(r => r.val());
  return recipePromise.then(recipe => gu.waitForAllKeys({
    recipe: Promise.resolve(recipe),
    ingredients: fetchIngredientsByKey(recipe.ingredientQuantities),
  }));
}


export function recentRecipes() {
  return firebaseDB
    .ref('recipes')
    .limitToLast(10)
    .once('value')
    .then(res => res.val());
}

export function addIngredient(ingredientForm, userId) {
  const newKey = firebaseDB.ref().child('ingredients').push().key;

// delete non-empty localizations
  for (const loc of Object.keys(ingredientForm.localizations)) {
    const word = ingredientForm.localizations[loc];
    if (!word) {
      delete ingredientForm[loc];
    }
  }
  const updates = {};
  updates[`/ingredients/${newKey}`] = ingredientForm;
  updates[`/user-ingredients/${userId}/${newKey}`] = ingredientForm;

  for (const loc of Object.keys(ingredientForm.localizations)) {
    const word = ingredientForm.localizations[loc];
    if (!word) continue;
    updates[`/ing-by-word/${word}/${newKey}`] = true;
  }

  // Also add the original name to the mix
  updates[`/ing-by-word/${ingredientForm.name}/${newKey}`] = true;

  const result = firebaseDB.ref().update(updates);
  ingredientForm.id = newKey;
  return result.then(_ => ingredientForm);
}

export function loginPromise() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

export function redirectLoginResult() {
  return firebase.auth().getRedirectResult().then((result) => {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      console.log('token=', token);
    }
    // The signed-in user info.
    const user = result.user;
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
    console.log('error=', errorCode, errorMessage, email, credential);
    // ...
  });
}

export function loginPromisePopup() {
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
