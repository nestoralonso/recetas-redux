'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import About from './components/About';
import configureStore from './store/configureStore';

const recipes = [
  {
    id: '1',
    title: 'Bondiola Braseada a la Cerveza!',
    description: 'Tremenda receta para hacer una Bondiola a puro Sabor'
  },
  {
    id: '2',
    title: 'Costillar a Pura Leña Inyectado al Vino Tinto!',
    description: 'Tremendo ASADO de noche a puro costillar y achuras! Esta receta te deja el costillar como una manteca! A inyectar se ha dicho!'
  },
  {
    id: '3',
    title: 'Lomo al Trapo! Directo en las Brasas!',
    description: 'Técnica para hacer carne 100% al trapo! No saben el sabor que se genera!'
  },
  {
    id: '4',
    title: 'Matambre Arrollado DELICIA TOTAL',
    description: 'Como hacer un Matambre Arrollado y Asado 100%! Una combinación que va a explotar los paladares de tus comensales!'
  }
];

const store = configureStore({ recipes });
console.log(store);
const Root = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} />
      <Route path="/about" component={About} />
    </Router>
  </Provider>
);
ReactDOM.render(<Root store={store} />, document.getElementById('root'));
