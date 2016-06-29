import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppShell from './components/AppShell.jsx';
import RecipeList from './containers/RecipeList.jsx';
import IngredientList from './containers/IngredientList.jsx';
import Login from './containers/Login.jsx';
import About from './components/About.jsx';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { fetchRecipes } from './api';
import { loginPromise } from './api/fb-recipes-api';

const store = configureStore();
console.log('store=', store);
injectTapEventPlugin();
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppShell} >
        <IndexRoute component={RecipeList} />
        <Route path="/recipes" component={RecipeList} />
        <Route path="/ingredients" component={IngredientList} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>
);

// loginPromise().then(x => console.log(x));
ReactDOM.render(<Root store={store} />, document.getElementById('root'));
