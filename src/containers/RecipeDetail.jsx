import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

import * as gu from '../utils';
import * as consts from '../constants';
import { fetchRecipeWithDetails } from '../api';


class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    console.log('constructor=', this.props.params.recipeId);
    this.state = {
      recipe: null,
      ingredients: [],
    };

    this.renderIngQuant = this.renderIngQuant.bind(this);
  }

  componentWillMount() {
    fetchRecipeWithDetails(this.props.params.recipeId).then(result => {
      const { recipe, ingredients } = result;
      console.log(recipe, ingredients);
      this.setState({
        recipe,
        ingredients,
      });
    });
  }

  renderIngQuant(iq, ingredient, locale) {
    return (
      <div>
        {iq.quantity} {consts.unitLabel(iq.unit)} of
        {' '}{ingredient ?
          gu.localizedIngName(ingredient, locale)
          : 'missing'}
      </div>
    );
  }

/*
  title: '',
  description: '',
  portions: '',
  preparationTime: '',
  cookingTime: '',
  procedure: '', */
  render() {
    let content;
    const { recipe, ingredients } = this.state;
    console.log('ingredients=', ingredients);
    const locale = this.props.currLocale;
    if (!recipe) {
      content = <div><CircularProgress /> </div>;
    } else {
      content = (
        <div className="recipe-detail">
          <div className="recipe_detail__title">
            {recipe.title}
          </div>
          <div>{locale}</div>
          <div className="recipe_detail__iq-title">Ingredient List</div>
          <div className="recipe_detail__portions">{recipe.portions}</div>
          <ul className="recipe_detail__iq-list">
            {gu.objectToTuples(recipe.ingredientQuantities).map(entry => {
              const { key, value: iq } = entry;
              const ingredient = ingredients[key];
              return <li key={key}> {this.renderIngQuant(iq, ingredient, locale)} </li>;
            })}
          </ul>

          <div className="recipe_detail__description">{recipe.description}</div>
          <div className="recipe_detail__preparation-time">{recipe.preparationTime}</div>
          <div className="recipe_detail__cooking-time">{recipe.cookingTime}</div>
          <div className="recipe_detail__procedure">{recipe.procedure}</div>
        </div>
      );
    }
    return content;
  }
}
RecipeDetail.propTypes = {
  currLocale: PropTypes.string.isRequired,
};

function mapStateToProps(state, { params }) {
  return {
    currLocale: state.user.locale,
  };
}

export default withRouter(connect(mapStateToProps)(RecipeDetail));
