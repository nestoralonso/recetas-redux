import React, { Component, PropTypes } from 'react';

class Recipe extends Component {
  render() {
    const {title, description} = this.props.recipe;
    return (
      <div>
        {title} - {description}
      </div>
    );
  }
}

export default Recipe;
