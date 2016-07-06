export const UNITS = {
  POUND: 'POUND',
  GRAM: 'GRAM',
  CUP: 'CUP',
  SPOON: 'SPOON',
  TABLESPOON: 'TABLESPOON',
  TEASPOON: 'TEASPOON',
  NONE: 'NONE',
};

const UNIT_LABELS = {
  POUND: 'pound',
  GRAM: 'gram',
  CUP: 'cup',
  SPOON: 'spoon',
  TABLESPOON: 'tablespoon',
  TEASPOON: 'teaspoon',
  NONE: 'none',
};

export function unitLabel(unit) {
  return UNIT_LABELS[unit];
}

export const DEFAULT_UNIT = 'GRAM';
export const getUnits = () =>
  Object.keys(UNITS)
    .map(key => ({ key, value: unitLabel(key) }));

const LOCALE_NAMES = {
  'es-ar': 'Argentina',
  'es-cl': 'Chile',
  'es-co': 'Colombia',
  'es-gt': 'Guatemala',
  'es-mx': 'Mexico',
  'es-pe': 'Peru',
  'es-pr': 'Puerto Rico',
  'es-ve': 'Venezuela',
  'es-es': 'Spain',
};

export function getLocaleName(loc) {
  return LOCALE_NAMES[loc] || 'waat';
}
