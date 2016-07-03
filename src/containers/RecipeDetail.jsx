import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

class RecipeDetail extends Component {
  render() {
    return (
      <div>
        hello recipe {this.props.recipe.title}
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default withRouter(connect()(RecipeDetail));
