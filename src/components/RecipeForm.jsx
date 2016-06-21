import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

const styles = {

};

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false
    }

    for(let fName of ['handleOpen', 'handleClose']) {
      this[fName] = this[fName].bind(this);
    }
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="New Recipe" onTouchTap={this.handleOpen} />
        <Dialog
          title="New Recipe"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText="Fried chicken"
            floatingLabelText="Title"
            />
          <br/>
          <TextField
            hintText="This melt in your mouth barbecue ribs recipe will change the way you see the world"
            floatingLabelText="Description"
            rows={4}
            rowsMax={8}
            />
          <br/>
          <TextField
            hintText="4"
            floatingLabelText="Number of portions"
            />
          <br/>
          <TextField
            hintText="30"
            floatingLabelText="Preparation time in minutes"
            />
          <br/>
          <TextField
            hintText="60"
            floatingLabelText="How long it will take to cook"
            />
          <br/>
          <TextField
            hintText="Add garlic and cook until onions and garlic are soft, 5 minutes. Add peppers and cook"
            floatingLabelText="Procudure"
            rows={4}
            rowsMax={8}
            />
        </Dialog>

      </div>
    );
  }
}

/*
    id: action.id,
    title: action.title,
    description: action.description,
    portions: action.portions,
    preparationTime: action.preparationTime,
    cookingTime: action.cookingTime,
    procudure: action.procudure
 */

export default RecipeForm;
