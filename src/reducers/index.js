import {combineReducers} from 'redux';
import recipes from './recipes';

// Fake reducer for a constant userId
const userId = (state='1', action) => state;
export default combineReducers({
  recipes,
  userId
});
