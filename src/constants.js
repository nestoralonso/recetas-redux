export const UNITS = {
  POUND: 'pounds',
  GRAMS: 'grams',
  CUP: 'cup',
  SPOON: 'spoons',
  TABLESPOON: 'tablespoon',
  TEASPOON: 'teaspoon',
  NONE: 'none',
};

export const DEFAULT_UNIT = 'GRAMS';
export const getUnits = () =>
  Object.keys(UNITS)
    .map(key => ({ key, value: UNITS[key] }));
