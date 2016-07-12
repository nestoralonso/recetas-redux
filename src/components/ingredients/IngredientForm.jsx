import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { addIngredient, updateIngredient } from '../../actions';


const BLANK_INGREDIENT = {
  name: '',
  localizations: {
    'es-ar': '',
    'es-cl': '',
    'es-co': '',
    'es-gt': '',
    'es-mx': '',
    'es-pe': '',
    'es-pr': '',
    'es-ve': '',
    'es-es': '',
  },
};

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, BLANK_INGREDIENT);
    [this.handleClose,
    this.handleSave,
    this.nameChange,
    this.locChange,
    this.getLocValue,
    ].forEach(f => {
      this[f.name] = f.bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newIngredient) {
      const newState = Object.assign({}, BLANK_INGREDIENT);
      this.setState(newState);
    } else if (nextProps.ingredient) {
      const newState = Object.assign({}, nextProps.ingredient);
      this.setState(newState);
    }
  }

  getLocValue(locId) {
    const { localizations } = this.state;
    return localizations[locId] ? localizations[locId] : '';
  }

  locChange(e, locId) {
    const { localizations } = this.state;
    const text = e.target.value;
    const newLocs = Object.assign({}, localizations, { [locId]: text });
    this.setState({ localizations: newLocs });
  }

  nameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleClose() {
    this.props.onClose();
  }

  handleSave() {
    if (this.props.newIngredient) {
      const newIngredient = Object.assign({}, this.state);
      newIngredient.userId = this.props.userId;
      this.props.dispatch(addIngredient(newIngredient, this.props.userId));
    } else {
      this.props.dispatch(updateIngredient(this.state));
    }

    this.props.onClose();
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

    return (
      <Dialog
        title="New Ingredient"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent
      >
        <div className="ingredient-form__title">New Ingredient</div>

        <TextField
          hintText="Tocineta"
          floatingLabelText="Ingredient name"
          onChange={this.nameChange}
          value={this.state.name}
        />
        <br />

        <div className="ingredient-form__title">Localizations</div>

        <TextField
          floatingLabelText="Spanish (Argentina)"
          onChange={(e) => this.locChange(e, 'es-ar')}
          value={this.getLocValue('es-ar')}
        />
        <TextField
          floatingLabelText="Spanish (Chile)"
          onChange={(e) => this.locChange(e, 'es-cl')}
          value={this.getLocValue('es-cl')}
        />
        <TextField
          floatingLabelText="Spanish (Colombia)"
          onChange={(e) => this.locChange(e, 'es-co')}
          value={this.getLocValue('es-co')}
        />
        <TextField
          floatingLabelText="Spanish (Guatemala)"
          onChange={(e) => this.locChange(e, 'es-gt')}
          value={this.getLocValue('es-gt')}
        />
        <TextField
          floatingLabelText="Spanish (Mexico)"
          onChange={(e) => this.locChange(e, 'es-mx')}
          value={this.getLocValue('es-mx')}
        />
        <TextField
          floatingLabelText="Spanish (Peru)"
          onChange={(e) => this.locChange(e, 'es-pe')}
          value={this.getLocValue('es-pe')}
        />
        <TextField
          floatingLabelText="Spanish (Puerto Rico)"
          onChange={(e) => this.locChange(e, 'es-pr')}
          value={this.getLocValue('es-pr')}
        />
        <TextField
          floatingLabelText="Spanish (Venezuela)"
          onChange={(e) => this.locChange(e, 'es-ve')}
          value={this.getLocValue('es-ve')}
        />
        <TextField
          floatingLabelText="Spanish (Spain)"
          onChange={(e) => this.locChange(e, 'es-es')}
          value={this.getLocValue('es-es')}
        />
      </Dialog>
    );
  }
}
IngredientForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  newIngredient: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};
IngredientForm.defaultProps = {
  newRecipe: false,
};

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});
export default connect(mapStateToProps)(IngredientForm);
