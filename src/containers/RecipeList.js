import React, {Component} from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

import Recipe from '../components/Recipe';

class RecipeList extends Component {
  render() {
    const { recipes } = this.props;

    if(!recipes) return <div> Sorry, there are no recipes here</div>;
    return (
      <List>
        {recipes.map(recipe => <ListItem key={recipe.id}>
          <Recipe recipe={recipe} />
        </ListItem>)}
      </List>)
  }
}

let mapStateToProps = (state) => ({
  recipes: state.recipes
});

RecipeList = connect(mapStateToProps)(RecipeList);
export default RecipeList;
