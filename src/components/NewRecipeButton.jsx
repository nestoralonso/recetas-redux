import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RecipeForm from './RecipeForm.jsx';

class NewRecipeButton extends Component {
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
        <RaisedButton label="New Recipe" onTouchTap={this.handleOpen} />
        <RecipeForm open={this.state.open} onClose={this.handleClose} newRecipe />
      </div>
    );
  }
}


export default NewRecipeButton;
