import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

import Recipe from '../components/Recipe.jsx';
import { getAllRecipes } from '../reducers/recipes';
import { fetchRecipes } from '../fake-api';
import { receiveRecipes } from '../actions';


class RecipeList extends Component {
  constructor(props) {
    super(props);

    console.log('constructor');
    this.fetchData();
  }

  fetchData() {
    const { receiveRecipes } = this.props;
    fetchRecipes().then(recipes =>
      receiveRecipes(recipes)
    );
  }


  render() {
    const { recipes } = this.props;
    return (
      <List>
        {recipes.map(recipe => <ListItem key={recipe.id}>
          <Recipe recipe={recipe} />
        </ListItem>)}
      </List>)
  }
}
RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
}

let mapStateToProps = (state) => ({
  recipes: getAllRecipes(state.recipes)
});

RecipeList = connect(mapStateToProps, { receiveRecipes })(RecipeList);
export default RecipeList;
