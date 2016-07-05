import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
  thumbnailUrl: '',
  photoUrl: '',
  ingredientQuantities: [],
};

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      titleError: '',
    }, BLANK_RECIPE);

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

  componentWillMount() {
    console.log('state2= ', this.state);
  }

  onIngQuantityChange(key, quantity) {
    const newState = this.updateIngredientQuant(key, { quantity });
    this.setState(newState);
  }

  onIngredientSelected(ingredient, key) {
    console.log('onIngredientSelected=', ingredient, key);
    const ingQuants = this.state.ingredientQuantities;
    const newIngQuant = {
      key,
      value: {
        quantity: '10',
        unit: UNITS.GRAMS,
        ingredient,
      },
    };
    this.setState({ ingredientQuantities: [...ingQuants, newIngQuant] });
  }

  updateIngredientQuant(key, ingQ) {
    const newIQs = this.state.ingredientQuantities.map(iq => {
      if (iq.key === key) {
        const newIngQ = Object.assign({}, iq.value, ingQ);
        return {
          key: iq.key,
          value: newIngQ,
        };
      }
      return iq;
    });

    return newIQs;
  }

  updateStateFromInput(inputEvt, propName) {
    this.setState({
      [propName]: inputEvt.target.value,
    });
    console.log(this.state);
  }

  titleChange(e) {
    this.updateStateFromInput(e, 'title');
  }

  thumbnailUrlChange(e) {
    this.updateStateFromInput(e, 'thumbnailUrl');
  }

  photoUrlChange(e) {
    this.updateStateFromInput(e, 'photoUrl');
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
    const newIQ = this.updateIngredientQuant(key, { unit });
    this.setState({ ingredientQuantities: newIQ });
  }

  handleIngQuantDelete(key) {
    const newIQs = this.state.ingredientQuantities.filter(iq => iq.key !== key);
    this.setState({ ingredientQuantities: newIQs });
  }

  handleSave() {
    if (!this.state.title) {
      this.setState({ titleError: 'The title is required' });
      return;
    }

    this.props.dispatch(addRecipe(this.state, this.props.userId));
    this.props.handleClose();
  }

  handleClose() {
    this.props.handleClose();
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

    const { ingredientQuantities } = this.state;
    return (
      <Dialog
        title="New Recipe"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
        contentClassName="recipe-form"
        autoScrollBodyContent
      >
        <TextField
          hintText="Fried pork"
          floatingLabelText="Title"
          onChange={this.titleChange}
          value={this.state.title}
          errorText={this.state.titleError}
        />
        <br />
        <TextField
          hintText="http://blbla.com/img.jpg"
          floatingLabelText="Thumbnail url"
          onChange={this.thumbnailUrlChange}
          value={this.state.thumbnailUrl}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
          hintText="http://blbla.com/img.jpg"
          floatingLabelText="Photo url"
          onChange={this.photoUrlChange}
          value={this.state.photoUrl}
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
          value={this.state.description}
        />
        <br />
        <TextField
          hintText="4"
          floatingLabelText="Number of portions"
          onChange={this.portionsChange}
          value={this.state.portions}
        />
        <br />
        <TextField
          hintText="30"
          floatingLabelText="Preparation time in minutes"
          onChange={this.preparationTimeChange}
          value={this.state.preparationTime}
        />
        <br />
        <TextField
          hintText="60"
          floatingLabelText="How long it will take to cook"
          onChange={this.cookingTimeChange}
          value={this.state.cookingTime}
        />
        <br />
        <TextField
          hintText="Add garlic and cook until onions and garlic are soft, 5 minutes. Add peppers and cook"
          floatingLabelText="Procedure"
          rows={4}
          rowsMax={8}
          onChange={this.procedureChange}
          value={this.state.procedure}
        />
      </Dialog>
    );
  }
}

RecipeForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string,
  handleClose: PropTypes.func,
};

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});
export default connect(mapStateToProps)(RecipeForm);
