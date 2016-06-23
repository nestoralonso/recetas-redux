import { v4 } from 'node-uuid';
import * as api from '../fake-api';

export const receiveRecipes = (response) => ({
  type: 'RECEIVE_RECIPES',
  response,
});

/**
 * fetchRecipes is a thunk: is a function that returns a function that accepts
 * dispatch and getState as params and asynchronously dispatch other actions
 */
export const fetchRecipes = (userId) => (dispatch, getState) => {
  if (getState().recipes.isFetching) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_RECIPES_REQUEST',
    userId
  });

  return api.fetchRecipes(userId).then(response => {
    dispatch({
      type: 'FETCH_RECIPES_SUCCESS',
      userId,
      response
    })
  },
  error => {
    dispatch({
      type: 'FETCH_RECIPES_FAILURE',
      userId,
      message: error.message || 'Error fetching recipes',
    });
  });
}

/**
 * This one is a thunk too
 */
export const addRecipe = (recipe) => (dispatch) => {
  api.addRecipe(recipe).then(response => dispatch({
    type: 'ADD_RECIPE_SUCCESS',
    id: response.id,
    response
  }));
};

