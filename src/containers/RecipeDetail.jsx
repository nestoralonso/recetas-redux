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

  render() {
    let content;
    const { recipe, ingredients } = this.state;
    console.log('ingredients=', ingredients);
    const locale = this.props.currLocale;
    if (!recipe) {
      content = <div><CircularProgress /> </div>;
    } else {
      content = (
        <div className="recd">
          <div className="recd__summary clearfix">
            <div className="recd__summary__main-photo">
              <img className="recd__summary__img" src={recipe.photoUrl} alt={recipe.title} />
            </div>

            <div className="recd__summary__text-block clearfix">
              <h1 className="recd__summary__title">
                {recipe.title}
              </h1>
              <div className="recd__summary__description">{recipe.description}</div>
            </div>
          </div>
          <div className="recd__iq clearfix">
            <h2 className="recd__iq__title">Ingredient List</h2>
            <ul className="recd__iq__list">
              {gu.objectToTuples(recipe.ingredientQuantities).map(entry => {
                const { key, value: iq } = entry;
                const ingredient = ingredients[key];
                return <li key={key}> {this.renderIngQuant(iq, ingredient, locale)} </li>;
              })}
            </ul>
          </div>
          <div className="recd__portions">
            <i className="material-icons">people</i>
            {recipe.portions} servings
          </div>
          <h2 className="recd__time__title">
            Time
          </h2>
          <div className="recd__preparation-time">
            <i className="material-icons">access_time</i>
            <div className="recd__preparation-time__text">
              {recipe.preparationTime} Preparation time
            </div>
          </div>
          <div className="recd__cooking-time">
            <i className="material-icons">access_time</i>
            <div className="recd__cooking-time__text">
              {recipe.cookingTime} Cooking time
            </div>
          </div>
          <div className="recd__total-time">
            <i className="material-icons">access_time</i>
            <div className="recd__total-time__text">
              {recipe.preparationTime + recipe.cookingTime} Total time
            </div>
          </div>
          <h2 className="recd__procedure__title">Directions</h2>
          <div className="recd__procedure">{recipe.procedure}</div>
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
