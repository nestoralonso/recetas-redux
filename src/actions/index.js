import { v4 } from 'node-uuid';
import * as api from '../api';

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
    userId,
  });

  return api.fetchRecipes(userId).then(response => {
    dispatch({
      type: 'FETCH_RECIPES_SUCCESS',
      userId,
      response,
    });
  },
  error => {
    dispatch({
      type: 'FETCH_RECIPES_FAILURE',
      userId,
      message: error.message || 'Error fetching recipes',
    });
  });
};

/**
 * This one is a thunk too,
 * returns a promise by convention
 */
export const addRecipe = (recipe) => (dispatch) => {
  return api.addRecipe(recipe).then(response => dispatch({
    type: 'ADD_RECIPE_SUCCESS',
    id: response.id,
    response,
  }));
};


export const loginProcess = () => (dispatch) => {
  return api.loginPromise().then(
    user => {
      console.log(user);
      dispatch(user => ({
        type: 'LOGGED_SUCCESS',
        user: {
          userId: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        },
      }));
    }
  );
};
