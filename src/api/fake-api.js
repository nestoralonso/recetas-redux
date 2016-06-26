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

// The single quotes on the keys are because babel doesn't transpile those appropriately
const recipes = {
  fake_a1: {
    title: 'Bondiola Braseada a la Cerveza!',
    description: 'Tremenda receta para hacer una Bondiola a puro Sabor',
    thumbnailUrl: 'http://img.youtube.com/vi/1pwLAJlM4H4/default.jpg',
  },
  fake_a2: {
    title: 'Matambre Arrollado DELICIA TOTAL',
    description: 'Como hacer un Matambre Arrollado y Asado 100%!' +
    ' Una combinación que va a explotar los paladares de tus comensales!',
    thumbnailUrl: 'http://img.youtube.com/vi/GeAquSuYfnc/default.jpg',
  },
  fake_a3: {
    title: 'Costillar a Pura Leña Inyectado al Vino Tinto!',
    description: 'Tremendo ASADO de noche a puro costillar y achuras!' +
    ' Esta receta te deja el costillar como una manteca! A inyectar se ha dicho!',
    thumbnailUrl: 'http://img.youtube.com/vi/v3nuujGTYs4/default.jpg',
  },
  fake_a4: {
    title: 'Lomo al Trapo! Directo en las Brasas!',
    description: 'Técnica para hacer carne 100% al trapo! No saben el sabor que se genera!',
    thumbnailUrl: 'http://img.youtube.com/vi/lQzKDb8VR78/default.jpg',
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
      .map(key => ings[key])
      .filter(ing =>
        ing.name
        .toLocaleLowerCase()
        .startsWith(name.toLocaleLowerCase())));
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
    const newRecipe = Object.assign({}, recipe, {
      id: v4(),
    });

    fakeDb.recipes.push(newRecipe);
    return newRecipe;
  });
}
