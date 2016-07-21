import { combineReducers } from 'redux';

function byId(state = {}, action) {
  switch (action.type) {
    case 'ADD_RECIPE_SUCCESS':
    case 'UPDATE_RECIPE_SUCCESS':
      return Object.assign(
        {},
        state,
        { [action.id]: action.response });
    case 'REMOVE_RECIPE_SUCCESS':
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    case 'FETCH_RECIPES_SUCCESS':
      return action.response;
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_RECIPE_SUCCESS':
      return [...state, action.id];
    case 'REMOVE_RECIPE_SUCCESS':
      return state.filter(id => id !== action.id);
    case 'FETCH_RECIPES_SUCCESS':
      return action.response ? Object.keys(action.response) : state;
    default:
      return state;
  }
}

export function getMyRecipes(state) {
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
