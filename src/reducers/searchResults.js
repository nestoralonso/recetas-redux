import { combineReducers } from 'redux';

function byId(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_RECIPES_SUCCESS':
      return action.response;
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'SEARCH_RECIPES_SUCCESS':
      return Object.keys(action.response);
    default:
      return state;
  }
}

export function getRecipes(state) {
  return state.allIds.map(id => Object.assign({}, state.byId[id], { id }));
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'SEARCH_RECIPES_REQUEST':
      return true;
    case 'SEARCH_RECIPES_SUCCESS':
    case 'SEARCH_RECIPES_FAILURE':
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'SEARCH_RECIPES_FAILURE':
      return action.message;
    case 'SEARCH_RECIPES_REQUEST':
    case 'SEARCH_RECIPES_SUCCESS':
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
