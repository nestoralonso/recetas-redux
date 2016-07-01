import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';

import IngredientItem from '../components/IngredientItem.jsx';
import * as actions from '../actions';


class IngredientList extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }


  componentWillMount() {
    if (!this.props.userId) {
      browserHistory.push('/login');
    }
  }

  fetchData() {
    const { fetchIngredients, userId } = this.props;
    if (!userId) return;
    fetchIngredients(userId);
  }

  render() {
    const { ingredients } = this.props;
    if (!ingredients) return <List>nothing here</List>;
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
  })(IngredientList);
