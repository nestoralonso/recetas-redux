import React, {Component} from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import { addRecipe } from '../actions';


const BLANK_RECIPE = {
  title: '',
  description: '',
  portions: '',
  preparationTime: '',
  cookingTime: '',
  procedure: ''
};

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
      recipe: BLANK_RECIPE
    }

    for(let fName of ['handleOpen', 'handleClose', 'titleChange', 'descriptionChange', 'portionsChange',
                      'preparationTimeChange', 'cookingTimeChange', 'procedureChange']) {
      this[fName] = this[fName].bind(this);
    }
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.props.dispatch(addRecipe(this.state.recipe));
    this.setState({open: false, recipe: BLANK_RECIPE});
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
            onChange={this.titleChange}
            value={this.state.recipe.title}
            />
          <br/>
          <TextField
            hintText="This melt in your mouth barbecue ribs recipe will change the way you see the world"
            floatingLabelText="Description"
            rows={4}
            rowsMax={8}
            onChange={this.descriptionChange}
            value={this.state.recipe.description}
            />
          <br/>
          <TextField
            hintText="4"
            floatingLabelText="Number of portions"
            onChange={this.portionsChange}
            value={this.state.recipe.portions}
            />
          <br/>
          <TextField
            hintText="30"
            floatingLabelText="Preparation time in minutes"
            onChange={this.preparationTimeChange}
            value={this.state.recipe.preparationTime}
            />
          <br/>
          <TextField
            hintText="60"
            floatingLabelText="How long it will take to cook"
            onChange={this.cookingTimeChange}
            value={this.state.recipe.cookingTime}
            />
          <br/>
          <TextField
            hintText="Add garlic and cook until onions and garlic are soft, 5 minutes. Add peppers and cook"
            floatingLabelText="Procudure"
            rows={4}
            rowsMax={8}
            onChange={this.procedureChange}
            value={this.state.recipe.procedure}
            />
        </Dialog>

      </div>
    );
  }

  updateStateFromInput(inputEvt, propName) {
    this.setState({
      recipe: Object.assign({}, this.state.recipe, {
          [propName]: inputEvt.target.value
      })
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
}

export default connect()(RecipeForm);
