import React, {Component} from 'react';
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';

class RecipeList extends Component {
  render() {
    const { recipes } = this.props;

    if(!recipes) return <div> Sorry </div>;
    return (
      <div>
        <ul>
          {recipes.map(recipe => <li key={recipe.id}>
            <Recipe recipe={recipe} />
          </li>)}
        </ul>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  recipes: state.recipes
});

RecipeList = connect(mapStateToProps)(RecipeList);
export default RecipeList;
