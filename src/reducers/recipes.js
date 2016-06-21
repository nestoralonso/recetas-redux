import { combineReducers } from 'redux';

function byId(state={}, action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      return Object.assign(
        {},
        state,
        {[action.id]: recipe(state[action.id], action)})
  }

  return state;
}

function allIds(state=[], action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [...state, action.id];
  }

  return state;
}

function recipe(state={}, action) {
  switch(action.type) {
    case 'ADD_RECIPE':
      return {
        id: action.id,
        title: action.title,
        description: action.description,
        portions: action.portions,
        preparationTime: action.preparationTime,
        cookingTime: action.cookingTime,
        procudure: action.procudure
      }
  }

  return state;
};

export function getAllRecipes(state) {
  return state.allIds.map(id => state.byId[id]);
}

export default combineReducers({
  byId,
  allIds
});
