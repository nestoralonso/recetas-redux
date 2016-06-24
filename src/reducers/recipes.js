import { combineReducers } from 'redux';

function byId(state = {}, action) {
  switch (action.type) {
    case 'ADD_RECIPE_SUCCESS':
      return Object.assign(
        {},
        state,
        { [action.id]: action.response });
    case 'FETCH_RECIPES_SUCCESS':
      console.log('shape', JSON.stringify(action.response, null, 4));

      return action.response;
  }

  return state;
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_RECIPE_SUCCESS':
      return [...state, action.id];
    case 'FETCH_RECIPES_SUCCESS':
      console.log('All IDs', Object.keys(action.response));
      return Object.keys(action.response);
  }

  return state;
}

export function getAllRecipes(state) {
  return state.allIds.map(id => Object.assign({}, state.byId[id], { id }));
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
  errorMessage,
});
