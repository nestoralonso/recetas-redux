import { v4 } from 'node-uuid';
import { UNITS } from '../constants';
import * as utils from './utils';
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
    userId: 'user-1',
    localizations: {
      'es-co': 'pimentón',
      'es-mx': 'ají dulce',
      'es-es': 'morrón',
    },
  },
  fake_cil: {
    name: 'cilantro',
    userId: 'user-1',
    localizations: {
      'es-co': 'cilantro',
      'es-pe': 'perejil chino',
      'es-es': 'culantro',
    },
  },
  fake_toc: {
    name: 'tocineta',
    userId: 'user-1',
    localizations: {
      'es-co': 'tocineta',
      'es-pe': 'beicon',
      'es-es': 'panceta',
    },
  },
};

const recipes = {
  fake_a1: {
    title: 'Bondiola Braseada a la Cerveza!',
    description: 'Tremenda receta para hacer una Bondiola a puro Sabor',
    thumbnailUrl: 'http://img.youtube.com/vi/1pwLAJlM4H4/default.jpg',
    userId: 'user-1',
    ingredientQuantities: {
      fake_toc: {
        quantity: 1,
        unit: UNITS.POUND,
        ingredient: { name: 'tocineta' },
      },
      fake_cil: {
        quantity: 100,
        unit: UNITS.GRAM,
        ingredient: { name: 'cilantro' },
      },
    },
  },
  fake_a2: {
    title: 'Matambre Arrollado DELICIA TOTAL',
    description: 'Una combinación que va a explotar los paladares de tus comensales!',
    thumbnailUrl: 'http://img.youtube.com/vi/GeAquSuYfnc/default.jpg',
    userId: 'user-1',
  },
};

const fakeDb = {
  ingredients,
  recipes,
  'user-recipes': {
    'user-1': recipes,
  },
  'user-ingredients': {
    'user-1': ingredients,
  },
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export function fetchRecipes(userId) {
  if (!userId) return Promise.resolve({});
  const userRecipes = fakeDb['user-recipes'][userId];
  return delay(300).then(() => userRecipes || {});
}

export function fetchIngredients(userId) {
  if (!userId) return Promise.resolve({});
  const userIngredients = fakeDb['user-ingredients'][userId];
  return delay(300).then(() => userIngredients || {});
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
    uid: 'user-1',
    displayName: 'Fake User',
    photoURL: 'http://lol.jpg',
    email: 'fake@fake.com',
  }));
}

export function addRecipe(recipeForm) {
  return delay(300).then(() => {
    const newKey = v4();
    const newRecipe = utils.convertRecipeToFB(recipeForm);
    newRecipe.id = newKey;
    const newIngs = utils.getNewIngredients(recipeForm);
    fakeDb.recipes[newKey] = newRecipe;
    fakeDb.ingredients = Object.assign({}, ingredients, newIngs);

    return newRecipe;
  });
}
