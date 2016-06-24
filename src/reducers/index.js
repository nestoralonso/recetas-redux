import { combineReducers } from 'redux';
import recipes from './recipes';

// Fake reducer for a constant userId
// todo: replace it with a real user
const userId = (state = '1', action) => state;
export default combineReducers({
  recipes,
  userId,
});
