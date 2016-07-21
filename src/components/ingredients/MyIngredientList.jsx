import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';

import IngredientItem from './IngredientItem.jsx';
import IngredientForm from './IngredientForm.jsx';
import * as actions from '../../actions';


class MyIngredientList extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredientEdit: null, openEdit: false };
    this.fetchData();
    this.onIngredientSelected = this.onIngredientSelected.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    if (!this.props.userId) {
      browserHistory.push('/login');
    }
  }

  onIngredientSelected(e, ingredientEdit, key) {
    this.setState({ ingredientEdit, openEdit: true, ingredientId: key });
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
              onTouchTap={(e) => this.onIngredientSelected(e, ingredients[key], key)}
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
  })(MyIngredientList);
