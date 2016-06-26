const user = (state={}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, action.user);

    default:
      return state;
  }
}

export default user;
