import { combineReducers } from 'redux';

/**
 * The shape of the data
 * ingredients: {
 *  ing_id: {
 *    name: 'pimenton',
 *    localizations: {
 *      'es-es'
 *    }
 *  }
 * }
 */

export const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_INGREDIENTS_SUCCESS':
      return action.response;
    case 'ADD_INGREDIENT_SUCCESS':
      return Object.assign(
        {},
        state,
        { [action.id]: action.response });
    default:
      return state;
  }
};


const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_INGREDIENTS_REQUEST':
      return true;
    case 'FETCH_INGREDIENTS_SUCCESS':
    case 'FETCH_INGREDIENTS_FAILURE':
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_INGREDIENTS_FAILURE':
      return action.message;
    case 'FETCH_INGREDIENTS_REQUEST':
    case 'FETCH_INGREDIENTS_SUCCESS':
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  isFetching,
  errorMessage,
});
