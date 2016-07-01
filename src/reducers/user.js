const user = (state = {
  locale: 'es-co',
}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, action.user);
    case 'USER_LOCALE_CHANGED':
      return Object.assign({}, state, { locale: action.locale });
    default:
      return state;
  }
};

export default user;
