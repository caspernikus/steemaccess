import * as types from '../actions/auth';

const initialState = {
  user: {},
  token: getActiveToken(),
  tokens: localStorage.getItem('tokens'),
  isLoaded: false,
  isLoading: false,
  isAuthenticated: false,
};

const getActiveToken = function () {
  const tokens = localStorage.getItem('tokens');
  const usernames = Object.keys(tokens);

  var activeToken = '';
  usernames.forEach((username) => {
    const tokenObj = tokens[username];

    if (tokenObj.isActive) {
      activeToken = tokenObj.token;
    }
  });

  return activeToken;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case types.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoaded: true,
        isLoading: false,
        isAuthenticated: true,
      };
    case types.AUTHENTICATE_FAILURE:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        isAuthenticated: false,
      };

    case types.LOGOUT_REQUEST:
      return {
        ...state,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        user: initialState.user,
        token: '',
        isLoaded: true,
        isLoading: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
