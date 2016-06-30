import { tuplesToObject } from '../utils';

export function convertRecipeToFB(recipeForm) {
  const newRecipe = Object.assign({}, recipeForm);
  if (newRecipe.ingredientQuantities) {
    newRecipe.ingredientQuantities = tuplesToObject(newRecipe.ingredientQuantities);
  }

  return newRecipe;
}

/**
 * Obtains an object containing the ingredients from the recipe form that have to be created
 *
 * @param {Object} recipeForm a form like the one returned by RecipeForm
 */
export function getNewIngredients(recipeForm) {
  const newIngredients = {};
  for (const entry of recipeForm.ingredientQuantities) {
    const { key, value } = entry;
    if (value.ingredient.isNew) {
      newIngredients[key] = { name: value.ingredient.name };
    }
  }

  return newIngredients;
}
