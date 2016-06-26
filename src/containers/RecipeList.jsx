import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

import RecipeItem from '../components/RecipeItem';
import { getAllRecipes } from '../reducers/recipes';
import * as actions from '../actions';


class RecipeList extends Component {
  constructor(props) {
    super(props);

    console.log('constructor');
    this.fetchData();
  }

  fetchData() {
    const { fetchRecipes, userId } = this.props;
    fetchRecipes();
  }

  render() {
    const { recipes } = this.props;
    return (
      <List>
        {recipes.map(recipe => <ListItem key={recipe.id}>
          <RecipeItem recipe={recipe} />
        </ListItem>)}
      </List>);
  }
}
RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: getAllRecipes(state.recipes),
  isFetching: state.recipes.isFetching,
  error: state.recipes.errorMessage,
  userId: state.user.userId,
});

RecipeList = connect(mapStateToProps, { fetchRecipes: actions.fetchRecipes })(RecipeList);
export default RecipeList;
