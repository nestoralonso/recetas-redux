import React from 'react';
import RecipeList from '../containers/RecipeList.jsx';
import RecipeForm from './RecipeForm.jsx';


const RecipesPage = () => {
  return (
    <div>
      <RecipeList />
      <RecipeForm />
    </div>
  );
};

export default RecipesPage;
