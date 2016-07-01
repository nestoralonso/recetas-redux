import React, { PropTypes } from 'react';

const IngredientItem = ({ ingredient }) => {
  return (
    <div className="ingredient-item">
      <div className="ingredient-item__thumbnail">
        <img
          src={ingredient.thumbnailUrl}
          width="120"
          height="90"
          alt={`${ingredient.name} image`}
        />
      </div>
      <div className="ingredient-item__block">
        <div className="ingredient-item__name">
          {ingredient.name}
        </div>
      </div>
    </div>
); };

IngredientItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default IngredientItem;
