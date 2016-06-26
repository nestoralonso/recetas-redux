
import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import mainReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  return createStore(
            mainReducer,
            initialState,
            compose(
              applyMiddleware(
                thunkMiddleware, // lets us dispatch() asyncs functions
                loggerMiddleware),
              window.devToolsExtension ? window.devToolsExtension() : f => f
         ));
}
