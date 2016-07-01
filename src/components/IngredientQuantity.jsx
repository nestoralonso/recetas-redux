import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import * as constants from '../constants';
import IconButton from 'material-ui/IconButton';
import shallowCompare from 'react-addons-shallow-compare';


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

    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleUnitChange(e, val, payload) {
    if (this.props.onUnitChange) {
      this.props.onUnitChange(this.props.ingredientKey, payload);
    }
  }

  handleQuantityChange(e) {
    if (this.props.onQuantityChange) {
      this.props.onQuantityChange(this.props.ingredientKey, e.target.value);
    }
  }

  render() {
    const { ingredientName, isNew } = this.props;
    const ingredientStyle = isNew ? Object.assign({},
      styles.ingredientName, { color: 'blue' }) : styles.ingredientName;
    return (
      <div style={styles.component}>
        <TextField
          style={styles.quantity}
          onChange={this.handleQuantityChange}
          value={this.props.quantity}
          hintText="2"
        />
        {" "}
        <SelectField
          style={styles.unit}
          value={this.props.unit}
          onChange={this.handleUnitChange}
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
  ingredientKey: PropTypes.string,
  quantity: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  onQuantityChange: PropTypes.func,
  onUnitChange: PropTypes.func,
};

export default IngredientQuantity;
