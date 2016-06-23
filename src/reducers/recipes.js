import { combineReducers } from 'redux';

function byId(state={}, action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      return Object.assign(
        {},
        state,
        {[action.id]: recipe(state[action.id], action)})
    case 'FETCH_RECIPES_SUCCESS':
      const nextState = Object.assign({}, state);
      action.response.forEach(recipe => {
        nextState[recipe.id] = recipe;
      });


      return nextState;
  }

  return state;
}

function allIds(state=[], action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [...state, action.id];
    case 'FETCH_RECIPES_SUCCESS':
      console.log('FETCH_RECIPES_SUCCESS', action.response);
      return action.response.map(r => r.id);
  }

  return state;
}

function recipe(state={}, action) {
  switch(action.type) {
    case 'ADD_RECIPE':
      return {
        id: action.id,
        title: action.recipe.title,
        description: action.recipe.description,
        portions: action.recipe.portions,
        preparationTime: action.recipe.preparationTime,
        cookingTime: action.recipe.cookingTime,
        procedure: action.recipe.procedure
      }
  }

  return state;
};

export function getAllRecipes(state) {
  return state.allIds.map(id => state.byId[id]);
}


const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_RECIPES_REQUEST':
      return true;
    case 'FETCH_RECIPES_SUCCESS':
    case 'FETCH_RECIPES_FAILURE':
      return false;
    default:
      return state;
  }
};


const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_RECIPES_FAILURE':
      return action.message;
    case 'FETCH_RECIPES_REQUEST':
    case 'FETCH_RECIPES_SUCCESS':
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
  isFetching,
  errorMessage
});
