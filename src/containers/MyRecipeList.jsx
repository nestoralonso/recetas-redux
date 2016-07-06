import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

import RecipeItem from '../components/RecipeItem.jsx';
import RecipeForm from '../components/RecipeForm.jsx';
import { getMyRecipes } from '../reducers/recipes';
import * as actions from '../actions';
import LinearProgress from 'material-ui/LinearProgress';


class MyRecipeList extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
    this.state = { recipeEdit: null, openEdit: false };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    if (!this.props.userId) {
      browserHistory.push('/login');
    }
  }

  onRecipeSelected(e, recipeEdit) {
    this.setState({ recipeEdit, openEdit: true });
  }

  handleClose() {
    this.setState({ openEdit: false });
  }

  fetchData() {
    const { fetchRecipes, userId } = this.props;

    if (!userId) return;
    fetchRecipes(userId);
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
                onTouchTap={(e) => this.onRecipeSelected(e, recipe)}
              >
                <RecipeItem recipe={recipe} />
              </ListItem>)}
          </List>
        }

        <RecipeForm
          open={this.state.openEdit}
          recipe={this.state.recipeEdit}
          onClose={this.handleClose}
        />
      </div>
      );
  }
}
MyRecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  userId: PropTypes.string,
  fetchRecipes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  recipes: getMyRecipes(state.recipes),
  isFetching: state.recipes.isFetching,
  error: state.recipes.errorMessage,
  userId: state.user.userId,
});

export default connect(
  mapStateToProps, {
    fetchRecipes: actions.fetchRecipes,
  })(MyRecipeList);
