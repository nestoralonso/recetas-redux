import { combineReducers } from 'redux';
import recipes from './recipes';
import user from './user';
import ingredients from './ingredients';

export default combineReducers({
  recipes,
  user,
  ingredients
});
