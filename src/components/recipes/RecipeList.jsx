import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import RecipeItem from './RecipeItem.jsx';


class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRecipes();
  }

  render() {
    const { recipes, isFetching } = this.props;
    return (
      <div>
        {isFetching ?
          <LinearProgress mode="indeterminate" />
          :
          <List>
            {recipes.map(recipe => <ListItem key={recipe.id}>
              <RecipeItem recipe={recipe} />
            </ListItem>)}
          </List>
        }
      </div>
      );
  }
}
RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  onItemClick: PropTypes.func,
};

export default RecipeList;
