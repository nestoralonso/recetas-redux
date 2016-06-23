import { v4 } from 'node-uuid';
import * as api from '../fake-api';

export const receiveRecipes = (response) => ({
  type: 'RECEIVE_RECIPES',
  response,
});


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

export const addRecipe = (recipe) => {
  return {
    type: 'ADD_RECIPE',
    id: v4(),
    recipe
  };
};

