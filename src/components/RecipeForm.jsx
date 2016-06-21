import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';


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
        <RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Hint Text"
            floatingLabelText="Floating Label Text"
            />

          <DatePicker hintText="Date Picker" />
        </Dialog>

      </div>
    );
  }
}

export default RecipeForm;
