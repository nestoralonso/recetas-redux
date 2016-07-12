import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IngredientForm from './IngredientForm.jsx';

class NewIngredientButton extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = { open: false };
  }

  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <RaisedButton label="New Ingredient" onTouchTap={this.handleOpen} />
        <IngredientForm open={this.state.open} onClose={this.handleClose} newIngredient />
      </div>
    );
  }
}

export default NewIngredientButton;
