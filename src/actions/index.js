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

    return response;
  },
  error => {
    dispatch({
      type: 'FETCH_RECIPES_FAILURE',
      userId,
      message: error.message || 'Error fetching recipes',
    });
  });
};

export const fetchRecent = () => (dispatch, getState) => {
  if (getState().searchResults.isFetching) {
    return Promise.resolve();
  }

  dispatch({
    type: 'SEARCH_RECIPES_REQUEST',
  });

  return api.recentRecipes().then(response => {
    dispatch({
      type: 'SEARCH_RECIPES_SUCCESS',
      response,
    });

    return response;
  },
  error => {
    dispatch({
      type: 'SEARCH_RECIPES_FAILURE',
      message: error.message || 'Error fetching recipes',
    });
  });
};

export const searchRecipes = (query) => (dispatch, getState) => {
  if (getState().searchResults.isFetching) {
    return Promise.resolve();
  }

  dispatch({
    type: 'SEARCH_RECIPES_REQUEST',
    query,
  });

  return api.searchRecipes(query).then(response => {
    dispatch({
      type: 'SEARCH_RECIPES_SUCCESS',
      response,
    });

    return response;
  },
  error => {
    dispatch({
      type: 'SEARCH_RECIPES_FAILURE',
      message: error.message || 'Error fetching recipes',
    });
  });
};

export const fetchIngredients = (userId) => (dispatch, getState) => {
  if (getState().ingredients.isFetching) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_INGREDIENTS_REQUEST',
    userId,
  });

  return api.fetchIngredients(userId).then(response => {
    dispatch({
      type: 'FETCH_INGREDIENTS_SUCCESS',
      userId,
      response,
    });

    return response;
  },
  error => {
    dispatch({
      type: 'FETCH_INGREDIENTS_FAILURE',
      userId,
      message: error.message || 'Error fetching recipes',
    });
  });
};

/**
 * This one is a thunk too,
 * returns a promise by convention
 */
export const addRecipe = (recipe, uid) => (dispatch) => {
  return api.addRecipe(recipe, uid).then(response => dispatch({
    type: 'ADD_RECIPE_SUCCESS',
    id: response.id,
    response,
  }));
};

export const addIngredient = (ingredientForm, uid) => (dispatch) => {
  return api.addIngredient(ingredientForm, uid).then(response => dispatch({
    type: 'ADD_INGREDIENT_SUCCESS',
    id: response.id,
    response,
  }));
};

export const loginProcess = () => (dispatch) => {
  return api.loginPromise().then(
    user => {
      console.log('user', user);
      dispatch({
        type: 'LOGIN_SUCCESS',
        user: {
          userId: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        },
      }); }
  );
};
