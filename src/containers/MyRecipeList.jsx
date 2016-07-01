import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

import RecipeItem from '../components/RecipeItem.jsx';
import { getAllRecipes } from '../reducers/recipes';
import * as actions from '../actions';


class RecipeList extends Component {
  constructor(props) {
    super(props);

    console.log('constructor');
    this.fetchData();
  }

  componentWillMount() {
    if (!this.props.userId) {
      browserHistory.push('/login');
    }
  }

  fetchData() {
    const { fetchRecipes, userId } = this.props;

    if (!userId) return;
    fetchRecipes(userId);
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
  userId: PropTypes.string,
  fetchRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: getAllRecipes(state.recipes),
  isFetching: state.recipes.isFetching,
  error: state.recipes.errorMessage,
  userId: state.user.userId,
});

export default connect(
  mapStateToProps, {
    fetchRecipes: actions.fetchRecipes,
  })(RecipeList);
