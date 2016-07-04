import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppShell from './components/AppShell.jsx';
import RecipesPage from './components/MyRecipesPage.jsx';
import IngredientsPage from './components/MyIngredientsPage.jsx';
import Login from './containers/Login.jsx';
import About from './components/About.jsx';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RecipesHub from './containers/RecipesHub.jsx';
import RecipeDetail from './containers/RecipeDetail.jsx';
import * as api from './api/fb-recipes-api.js';

// when using webpack
// require('../css/styles.css');

const store = configureStore();
console.log('store=', store);

api.redirectLoginResult()
  .then(user => {
    console.log(user);
    if (!user) { return; }
    store.dispatch({
      type: 'LOGIN_SUCCESS',
      user: {
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      },
    });
  });

injectTapEventPlugin();
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppShell} >
        <IndexRoute component={RecipesHub} />
        <Route path="/search" component={RecipesHub} />
        <Route path="/recipe/:recipeId" component={RecipeDetail} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/ingredients" component={IngredientsPage} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>
);

// loginPromise().then(x => console.log(x));
ReactDOM.render(<Root store={store} />, document.getElementById('root'));
