export const UNITS = {
  POUND: 'POUND',
  GRAMS: 'GRAMS',
  CUP: 'CUP',
  SPOON: 'SPOON',
  TABLESPOON: 'TABLESPOON',
  TEASPOON: 'TEASPOON',
  NONE: 'NONE',
};

const UNIT_LABELS = {
  POUND: 'pound',
  GRAMS: 'gram',
  CUP: 'cup',
  SPOON: 'spoon',
  TABLESPOON: 'tablespoon',
  TEASPOON: 'teaspoon',
  NONE: 'none',
};

export function unitLabel(unit) {
  return UNIT_LABELS[unit];
}

export const DEFAULT_UNIT = 'GRAMS';
export const getUnits = () =>
  Object.keys(UNITS)
    .map(key => ({ key, value: unitLabel(key) }));
