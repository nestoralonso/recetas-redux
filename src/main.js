import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppShell from './components/AppShell';
import RecipeList from './containers/RecipeList.jsx';
import About from './components/About.jsx';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { fetchRecipes } from './fake-api';

const store = configureStore();
console.log(store);
injectTapEventPlugin();
const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={AppShell} >
        <IndexRoute component={RecipeList} />
        <Route path="/recipes" component={RecipeList} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
