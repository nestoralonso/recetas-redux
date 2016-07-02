import { combineReducers } from 'redux';
import recipes from './recipes';
import searchResults from './searchResults';
import user from './user';
import ingredients from './ingredients';

export default combineReducers({
  recipes,
  searchResults,
  user,
  ingredients,
});
