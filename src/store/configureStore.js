
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import mainReducer from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  return createStore(mainReducer,
                     initialState,
                     applyMiddleware(loggerMiddleware));
}
