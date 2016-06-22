import { combineReducers } from 'redux';

function byId(state={}, action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      return Object.assign(
        {},
        state,
        {[action.id]: recipe(state[action.id], action)})
    case 'RECEIVE_RECIPES':
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
    case 'RECEIVE_RECIPES':
      console.log('RECEIVE_RECIPES', action.response);
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

export default combineReducers({
  byId,
  allIds
});
