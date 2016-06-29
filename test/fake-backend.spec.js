import chai from 'chai';
import { convertRecipeToFB, getNewIngredients } from '../src/api/utils';
const expect = chai.expect;

const inputData = {
  title: 'bondiola',
  description: 'excelente',
  portions: 5,
  preparationTime: 30,
  cookingTime: 30,
  procedure: 'cook meat, NOW!!',
  ingredientQuantities: [
    {
      key: 'panceta',
      value: {
        quantity: 1,
        unit: 'spoons',
        ingredient: {
          name: 'panceta',
        },
      },
    },
    {
      key: 'key-cil',
      value: {
        quantity: 0,
        unit: 'ounces',
        ingredient: {
          name: 'cil',
          isNew: true,
        },
      },
    },
    {
      key: 'key-pancet',
      value: {
        quantity: 0,
        unit: 'ounces',
        ingredient: {
          name: 'pancet',
          isNew: true,
        },
      },
    },
  ],
  id: 'a8e3075c-0652-498b-9e27-f65b1ab24bde',
};

/* eslint no-undef: "off", func-names: "off", prefer-arrow-callback: "off", max-len: "off" */
describe('Fake backend', function () {
  it('recibes a data structure from the recipe form and creates a firebease like structure', function () {
    const recipe = convertRecipeToFB(inputData);
    expect(recipe).to.not.be.null;
    expect(recipe.ingredientQuantities).to.be.an.object;
  });

  it('should return an object containing ingredients to create', function () {
    const ings = getNewIngredients(inputData);
    console.log('ings=', Object.keys(ings).length);
    expect(ings).to.not.be.null;
    expect(ings).to.be.an.object;

    const keys = Object.keys(ings);
    expect(keys.length).to.equal(2);
  });
});
