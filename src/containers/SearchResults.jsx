import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

import RecipeItem from '../components/RecipeItem.jsx';
import { getRecipes } from '../reducers/searchResults';
import * as actions from '../actions';
import LinearProgress from 'material-ui/LinearProgress';


class RecentRecipes extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
    console.log('hello=');
  }

  onRecipeSelected(e, recipeId) {
    console.log(recipeId);
  }

  fetchData() {
    const { fetchRecipes } = this.props;
    fetchRecipes();
  }

  render() {
    const { recipes, isFetching } = this.props;
    return (
      <div>
        {isFetching ?
          <LinearProgress mode="indeterminate" />
         :
          <List>
            {recipes.map(recipe =>
              <ListItem
                key={recipe.id}
                onTouchTap={(e) => this.onRecipeSelected(e, recipe.id)}
              >
                <RecipeItem recipe={recipe} />
              </ListItem>)}
          </List>
        }
      </div>
      );
  }
}
RecentRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  userId: PropTypes.string,
  fetchRecipes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  recipes: getRecipes(state.searchResults),
  isFetching: state.recipes.isFetching,
  error: state.recipes.errorMessage,
  userId: state.user.userId,
});

export default connect(
  mapStateToProps, {
    fetchRecipes: actions.fetchRecent,
  })(RecentRecipes);
