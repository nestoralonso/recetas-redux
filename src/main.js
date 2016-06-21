'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import AppShell from './components/AppShell';
import RecipeList from './containers/RecipeList';
import About from './components/About';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

const recipes = {
  byId: {
    '1' : {
      id: '1',
      title: 'Bondiola Braseada a la Cerveza!',
      description: 'Tremenda receta para hacer una Bondiola a puro Sabor',
      thumbnailUrl: 'http://img.youtube.com/vi/1pwLAJlM4H4/default.jpg'
    },
    '2': {
      id: '2',
      title: 'Matambre Arrollado DELICIA TOTAL',
      description: 'Como hacer un Matambre Arrollado y Asado 100%! Una combinación que va a explotar los paladares de tus comensales!',
      thumbnailUrl: 'http://img.youtube.com/vi/GeAquSuYfnc/default.jpg'
    },
    '3': {
      id: '3',
      title: 'Costillar a Pura Leña Inyectado al Vino Tinto!',
      description: 'Tremendo ASADO de noche a puro costillar y achuras! Esta receta te deja el costillar como una manteca! A inyectar se ha dicho!',
      thumbnailUrl: 'http://img.youtube.com/vi/v3nuujGTYs4/default.jpg'
    },
    '4': {
      id: '4',
      title: 'Lomo al Trapo! Directo en las Brasas!',
      description: 'Técnica para hacer carne 100% al trapo! No saben el sabor que se genera!',
      thumbnailUrl: 'http://img.youtube.com/vi/lQzKDb8VR78/default.jpg'
    }
  },
  allIds: ['1', '2', '3', '4']
};

const store = configureStore({ recipes });
console.log(store);
injectTapEventPlugin();
const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={AppShell} >
        <Route path="/recipes" component={RecipeList} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
