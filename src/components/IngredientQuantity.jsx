import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import * as constants from '../constants';
import IconButton from 'material-ui/IconButton';

const styles = {
  component: {
    borderBottom: '1px solid darkblue',
    width: 356,
  },
  quantity: {
    width: '3em',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  unit: {
    width: '8em',
    verticalAlign: 'middle',
  },
  ingredientName: {
    display: 'inline-block',
    marginTop: '24px',
    marginLeft: '1em',
    marginRight: '1em',
    height: '48px',
    lineHeight: '24px',
    fontSize: '16px',
    verticalAlign: 'middle',
  },
  deleteButton: {
    verticalAlign: 'middle',
  },
};

class IngredientQuantity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUnit: constants.DEFAULT_UNIT,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, val, payload) {
    this.setState({
      selectedUnit: payload,
    });
  }

  render() {
    const { ingredientName, isNew } = this.props;
    const ingredientStyle = isNew ? Object.assign({},
      styles.ingredientName, { color: 'blue' }) : styles.ingredientName;
    return (
      <div style={styles.component}>
        <TextField
          style={styles.quantity}
          underlineShow
          hintText="2"
        />
        <SelectField
          style={styles.unit}
          value={this.state.selectedUnit}
          onChange={this.handleChange}
        >
          {constants.getUnits().map(entry =>
            <MenuItem
              value={entry.key}
              key={entry.key}
              primaryText={entry.value}
            />)}
        </SelectField>

        <div style={ingredientStyle}>{ingredientName}</div>

        <IconButton
          style={styles.deleteButton}
          tooltip="Remove"
        >
          <i className="material-icons">delete</i>
        </IconButton>

      </div>
    );
  }
}
IngredientQuantity.propTypes = {
  ingredientName: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
};

export default IngredientQuantity;
