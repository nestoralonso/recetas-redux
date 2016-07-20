import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

import RecipeItem from './RecipeItem.jsx';
import RecipeForm from './RecipeForm.jsx';
import { getMyRecipes } from '../../reducers/recipes';
import * as actions from '../../actions';
import LinearProgress from 'material-ui/LinearProgress';

  // onTouchTap={(e) => { this.onRecipeSelected(e, recipe); console.log('touchtap'); }}

const RightButtons = ({ recipe, onEdit, onDelete }) => (
  <div>
    <IconButton
      iconClassName="material-icons"
      tooltip="lol1"
      onClick={(e) => {
        onEdit(e, recipe);
      }}
    >
      edit
    </IconButton>
    <IconButton
      iconClassName="material-icons"
      tooltip="lol2"
      onClick={(e) => {
        onDelete(e, recipe);
      }}
    >
      clear
    </IconButton>
  </div>
);
class MyRecipeList extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
    this.state = { recipeEdit: null, openEdit: false };
    this.handleClose = this.handleClose.bind(this);
    this.onRecipeSelected = this.onRecipeSelected.bind(this);
    this.onRecipeDelete = this.onRecipeDelete.bind(this);
  }

  componentWillMount() {
    if (!this.props.userId) {
      browserHistory.push('/login');
    }
  }

  onRecipeSelected(e, recipeEdit) {
    this.setState({ recipeEdit, openEdit: true });
  }

  onRecipeDelete(e, recipe) {
    console.log('Deleting recipe=', recipe.title);
    this.props.removeRecipe(recipe, this.props.userId);
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
                rightIcon={<RightButtons
                  recipe={recipe}
                  onEdit={this.onRecipeSelected}
                  onDelete={this.onRecipeDelete}
                />}

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

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: (userId) => dispatch(actions.fetchRecipes(userId)),
  removeRecipe: (recipe, userId) => dispatch(actions.removeRecipe(recipe, userId)),
});

export default connect(
  mapStateToProps, mapDispatchToProps)(MyRecipeList);
