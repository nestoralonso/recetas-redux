import React from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar.jsx';
import SearchResults from './SearchResults.jsx';


const RecipesHub = () => (
  <div>
    <SearchBar />
    <SearchResults />
  </div>
);

export default RecipesHub;
