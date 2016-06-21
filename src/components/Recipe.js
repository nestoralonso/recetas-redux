import React, { Component, PropTypes } from 'react';

class Recipe extends Component {
  render() {
    const { title, description, thumbnailUrl } = this.props.recipe;
    return (
      <div className="recipe-item">
        <div className="recipe-item__thumbnail">
          <img src={thumbnailUrl} width="120" height="90"/>
        </div>
        <div className="recipe-item__block">
          <div className="recipe-item__title">
            {title}
          </div>

          <div className="recipe-item__description">
            {description}
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
