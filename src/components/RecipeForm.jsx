import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import MiniIngredientSearch from './MiniIngredientSearch.jsx';
import IngredientQuantity from './IngredientQuantity.jsx';
import { addRecipe } from '../actions';
import { UNITS } from '../constants';

const BLANK_RECIPE = {
  title: '',
  description: '',
  portions: '',
  preparationTime: '',
  cookingTime: '',
  procedure: '',
  ingredientQuantities: [{
    key: 'panceta',
    value: {
      quantity: '70',
      unit: UNITS.GRAMS,
      ingredient: { name: 'panceta' },
    },
  }],
};

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      recipe: BLANK_RECIPE,
    };

    [this.handleOpen, this.handleClose,
      this.titleChange, this.onIngQuantityChange,
      this.handleUnitChange, this.descriptionChange,
      this.portionsChange, this.preparationTimeChange,
      this.cookingTimeChange, this.procedureChange,
      this.onIngredientSelected, this.handleSave].forEach(f => {
        this[f.name] = f.bind(this);
      });
  }

  handleClose() {
    this.setState({ open: false, recipe: BLANK_RECIPE });
  }

  handleSave() {
    this.props.dispatch(addRecipe(this.state.recipe, this.props.userId));
    this.setState({ open: false, recipe: BLANK_RECIPE });
  }

  onIngQuantityChange(key, quantity) {
    const newState = this.updateIngredientQuant(key, { quantity });
    this.setState(newState);
  }

  handleUnitChange(key, unit) {
    const newState = this.updateIngredientQuant(key, { unit });
    this.setState(newState);
  }

  updateIngredientQuant(key, ingQ) {
    const { recipe } = this.state;

    const newIQs = recipe.ingredientQuantities.map(iq => {
      if (iq.key === key) {
        const newIngQ = Object.assign({}, iq.value, ingQ);
        return {
          key: iq.key,
          value: newIngQ,
        };
      }
      return iq;
    });

    const newRecipe = Object.assign({}, recipe, { ingredientQuantities: newIQs });
    const newState = {
      recipe: newRecipe,
    };

    return newState;
  }

  updateStateFromInput(inputEvt, propName) {
    this.setState({
      recipe: Object.assign({}, this.state.recipe, {
        [propName]: inputEvt.target.value,
      }),
    });
  }

  titleChange(e) {
    this.updateStateFromInput(e, 'title');
  }

  descriptionChange(e) {
    this.updateStateFromInput(e, 'description');
  }

  portionsChange(e) {
    this.updateStateFromInput(e, 'portions');
  }

  preparationTimeChange(e) {
    this.updateStateFromInput(e, 'preparationTime');
  }

  cookingTimeChange(e) {
    this.updateStateFromInput(e, 'cookingTime');
  }

  procedureChange(e) {
    this.updateStateFromInput(e, 'procedure');
  }

  onIngredientSelected(ingredient, key) {
    console.log('onIngredientSelected=', ingredient, key);
    const { recipe } = this.state;
    const ingQuants = recipe.ingredientQuantities;
    const newIngQuant = {
      key,
      value: {
        quantity: '10',
        unit: UNITS.GRAMS,
        ingredient,
      },
    };
    this.setState({
      recipe: Object.assign({}, recipe, { ingredientQuantities: [...ingQuants, newIngQuant] }),
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.handleSave}
      />,
    ];

    const { recipe } = this.state;
    const { ingredientQuantities } = recipe;
    return (
      <div>
        <RaisedButton label="New Recipe" onTouchTap={this.handleOpen} />
        <Dialog
          title="New Recipe"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div className="recipe-form__title-section">Ingredients</div>

          {ingredientQuantities.map(ingQ =>
            <IngredientQuantity
              key={ingQ.key}
              ingredientKey={ingQ.key}
              ingredientName={ingQ.value.ingredient.name}
              onQuantityChange={this.onIngQuantityChange}
              onUnitChange={this.handleUnitChange}
              quantity={ingQ.value.quantity}
              unit={ingQ.value.unit}
              isNew={ingQ.value.ingredient.isNew}
            />)}
          <MiniIngredientSearch onIngredientSelected={this.onIngredientSelected} />
          <br />
          <TextField
            hintText="Fried pork"
            floatingLabelText="Title"
            onChange={this.titleChange}
            value={this.state.recipe.title}
          />
          <br />
          <TextField
            hintText="This recipe will change the way you see the world"
            floatingLabelText="Description"
            rows={4}
            rowsMax={8}
            onChange={this.descriptionChange}
            value={this.state.recipe.description}
          />
          <br />
          <TextField
            hintText="4"
            floatingLabelText="Number of portions"
            onChange={this.portionsChange}
            value={this.state.recipe.portions}
          />
          <br />
          <TextField
            hintText="30"
            floatingLabelText="Preparation time in minutes"
            onChange={this.preparationTimeChange}
            value={this.state.recipe.preparationTime}
          />
          <br />
          <TextField
            hintText="60"
            floatingLabelText="How long it will take to cook"
            onChange={this.cookingTimeChange}
            value={this.state.recipe.cookingTime}
          />
          <br />
          <TextField
            hintText="Add garlic and cook until onions and garlic are soft, 5 minutes. Add peppers and cook"
            floatingLabelText="Procedure"
            rows={4}
            rowsMax={8}
            onChange={this.procedureChange}
            value={this.state.recipe.procedure}
          />
        </Dialog>

      </div>
    );
  }
}

RecipeForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});
export default connect(mapStateToProps)(RecipeForm);
