import { v4 } from 'node-uuid';


/**
 *
Spanish (Argentina)   es-ar
Spanish (Chile)	      es-cl
Spanish (Colombia)    es-co
Spanish (Guatemala)   es-gt
Spanish (Mexico)      es-mx
Spanish (Peru)        es-pe
Spanish (Puerto Rico) es-pr
Spanish (Venezuela)   es-ve
Spanish (Spain)       es-es
 */
/**
 * The fake data maybe fake
 */
const ingredients = {
  fake_pim: {
    name: 'pimentón',
    localizations: {
      'es-co': 'pimentón',
      'es-mx': 'ají dulce',
      'es-es': 'morrón',
    },
  },
  fake_cil: {
    name: 'cilantro',
    localizations: {
      'es-co': 'cilantro',
      'es-pe': 'perejil chino',
      'es-es': 'culantro',
    },
  },
};

const recipes = {
  fake_a1: {
    title: 'Bondiola Braseada a la Cerveza!',
    description: 'Tremenda receta para hacer una Bondiola a puro Sabor',
    thumbnailUrl: 'http://img.youtube.com/vi/1pwLAJlM4H4/default.jpg',
  },
  fake_a2: {
    title: 'Matambre Arrollado DELICIA TOTAL',
    description: 'Una combinación que va a explotar los paladares de tus comensales!',
    thumbnailUrl: 'http://img.youtube.com/vi/GeAquSuYfnc/default.jpg',
  },
};

const fakeDb = {
  ingredients,
  recipes,
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export function fetchRecipes(userId) {
  return delay(300).then(() => fakeDb.recipes);
}

export function fetchIngredients(userId) {
  return delay(300).then(() => fakeDb.ingredients);
}

/**
 * Search the ingredients db by name
 *
 * @param {String} name the ingredient name
 */
export function searchIngredients(name) {
  console.log('searchIngredients', name, fakeDb.ingredients);
  const ings = fakeDb.ingredients;
  return delay(300).
    then(() => Object.keys(ings)
      .map(key => [key, ings[key]])
      .filter(ing =>
        ing[1].name
        .toLocaleLowerCase()
        .startsWith(name.toLocaleLowerCase()))
        .reduce((prev, curr) => {
          const keyIng = curr[0];
          const ingre = curr[1];
          return Object.assign(prev, { [keyIng]: ingre });
        }, {})
    );
}

export function loginPromise() {
  return delay(200).then(() => ({
    userId: 'fake-123',
    displayName: 'Fake User',
    photoURL: 'http://lol.jpg',
    email: 'fake@fake.com',
  }));
}

export function addRecipe(recipe) {
  return delay(300).then(() => {
    const newKey = v4();
    const newRecipe = Object.assign({}, recipe, { id: newKey });
    fakeDb.recipes[newKey] = newRecipe;

    console.log('newRecipe=', newRecipe);
    return newRecipe;
  });
}
