import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

import IngredientItem from './IngredientItem.jsx';
import IngredientForm from './IngredientForm.jsx';
import * as actions from '../../actions';

const RightButtons = ({ ingredientId, onEdit, onDelete }) => (
  <div>
    <IconButton
      iconClassName="material-icons"
      tooltip="Edit"
      onClick={(e) => {
        onEdit(e, ingredientId);
      }}
    >
      edit
    </IconButton>
    <IconButton
      iconClassName="material-icons"
      tooltip="Delete"
      onClick={(e) => {
        onDelete(e, ingredientId);
      }}
    >
      clear
    </IconButton>
  </div>
);
RightButtons.propTypes = {
  ingredientId: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

class MyIngredientList extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredientEdit: null, openEdit: false };
    this.fetchData();
    this.onIngredientSelected = this.onIngredientSelected.bind(this);
    this.onIngredientDelete = this.onIngredientDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    if (!this.props.userId) {
      browserHistory.push('/login');
    }
  }

  onIngredientSelected(e, key) {
    const ingredientEdit = this.props.ingredients[key];
    this.setState({ ingredientEdit, openEdit: true, ingredientId: key });
  }

  onIngredientDelete(e, ingredientId) {
    const ingredientData = this.props.ingredients[ingredientId];
    this.props.removeIngredient(ingredientData, ingredientId, this.props.userId);
    console.log('del ingredient=', ingredientId);
  }

  fetchData() {
    const { fetchIngredients, userId } = this.props;
    if (!userId) return;
    fetchIngredients(userId);
  }

  handleClose() {
    this.setState({ openEdit: false });
  }

  render() {
    const { ingredients } = this.props;
    if (!ingredients) return <List>nothing here</List>;
    return (
      <div>
        <List>
          {Object.keys(ingredients).map(key =>
            <ListItem
              key={key}
              rightIcon={<RightButtons
                ingredientId={key}
                onEdit={this.onIngredientSelected}
                onDelete={this.onIngredientDelete}
              />}
            >
              <IngredientItem ingredient={ingredients[key]} />
            </ListItem>)}
        </List>

        <IngredientForm
          open={this.state.openEdit}
          ingredient={this.state.ingredientEdit}
          ingredientId={this.state.ingredientId}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
MyIngredientList.propTypes = {
  ingredients: PropTypes.object,
  fetchIngredients: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.byId,
  isFetching: state.ingredients.isFetching,
  error: state.ingredients.errorMessage,
  userId: state.user.userId,
});

export default connect(
  mapStateToProps, {
    fetchIngredients: actions.fetchIngredients,
    removeIngredient: actions.removeIngredient,
  })(MyIngredientList);
