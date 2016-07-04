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
  portions: '1',
  preparationTime: '',
  cookingTime: '',
  procedure: '',
  thumbnailUrl: 'http://img.youtube.com/vi/U-NHx6a27_8/default.jpg',
  photoUrl: 'http://img.youtube.com/vi/U-NHx6a27_8/maxresdefault.jpg',
  ingredientQuantities: [],
};

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      recipe: BLANK_RECIPE,
      titleError: '',
    };

    [this.handleOpen, this.handleClose,
      this.titleChange, this.onIngQuantityChange,
      this.handleUnitChange, this.descriptionChange,
      this.portionsChange, this.preparationTimeChange,
      this.cookingTimeChange, this.procedureChange,
      this.thumbnailUrlChange, this.photoUrlChange,
      this.onIngredientSelected, this.handleSave,
      this.handleIngQuantDelete].forEach(f => {
        this[f.name] = f.bind(this);
      });
  }


  onIngQuantityChange(key, quantity) {
    const newState = this.updateIngredientQuant(key, { quantity });
    this.setState(newState);
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

  thumbnailUrlChange(e) {
    this.updateStateFromInput(e, 'thumbnailUrlChange');
  }

  photoUrlChange(e) {
    this.updateStateFromInput(e, 'photoUrlChange');
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


  handleUnitChange(key, unit) {
    const newState = this.updateIngredientQuant(key, { unit });
    this.setState(newState);
  }

  handleIngQuantDelete(key) {
    const { recipe } = this.state;
    const newIQs = recipe.ingredientQuantities.filter(iq => iq.key !== key);

    const newRecipe = Object.assign({}, recipe, { ingredientQuantities: newIQs });
    this.setState({ recipe: newRecipe });
  }

  handleSave() {
    if (!this.state.recipe.title) {
      this.setState({ titleError: 'The title is required' });
      return;
    }

    this.props.dispatch(addRecipe(this.state.recipe, this.props.userId));
    this.setState({ open: false, recipe: BLANK_RECIPE });
  }

  handleClose() {
    this.setState({ open: false, recipe: BLANK_RECIPE });
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
          contentClassName="recipe-form"
          autoScrollBodyContent
        >
          <TextField
            hintText="Fried pork"
            floatingLabelText="Title"
            onChange={this.titleChange}
            value={this.state.recipe.title}
            errorText={this.state.titleError}
          />
          <br />
          <TextField
            hintText="http://blbla.com/img.jpg"
            floatingLabelText="Thumbnail url"
            onChange={this.thumbnailUrlChange}
            value={this.state.recipe.thumbnailUrl}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            hintText="http://blbla.com/img.jpg"
            floatingLabelText="Photo url"
            onChange={this.photoUrlChange}
            value={this.state.recipe.photoUrl}
          />
          <br />
          <div className="recipe-form__title-section">Ingredients</div>
          {ingredientQuantities.map(ingQ =>
            <IngredientQuantity
              key={ingQ.key}
              ingredientKey={ingQ.key}
              ingredientName={ingQ.value.ingredient.name}
              onQuantityChange={this.onIngQuantityChange}
              onUnitChange={this.handleUnitChange}
              onDelete={this.handleIngQuantDelete}
              quantity={ingQ.value.quantity}
              unit={ingQ.value.unit}
              isNew={ingQ.value.ingredient.isNew}
            />)}
          <MiniIngredientSearch onIngredientSelected={this.onIngredientSelected} />
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
