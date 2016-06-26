import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';

import IngredientItem from '../components/IngredientItem';
import * as actions from '../actions';


class IngredientList extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData() {
    const { fetchIngredients, userId } = this.props;
    fetchIngredients();
  }

  render() {
    const { ingredients } = this.props;
    console.log('render ings=', ingredients);
    return (
      <List>
        {Object.keys(ingredients).map(key => <ListItem key={key}>
          <IngredientItem ingredient={ingredients[key]} />
        </ListItem>)}
      </List>);
  }
}
IngredientList.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.byId,
  isFetching: state.ingredients.isFetching,
  error: state.ingredients.errorMessage,
  userId: state.user.userId,
});

IngredientList = connect(mapStateToProps, { fetchIngredients: actions.fetchIngredients })(IngredientList);
export default IngredientList;
