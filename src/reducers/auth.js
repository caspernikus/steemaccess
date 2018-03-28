import * as types from '../actions/auth';

export const getActiveToken = () => {
  const tokens = JSON.parse(localStorage.getItem('tokens'));

  if (!tokens) { return ''; }

  const usernames = Object.keys(tokens);

  let activeToken = '';
  usernames.forEach((username) => {
    const tokenObj = tokens[username];

    if (tokenObj.isActive) {
      activeToken = tokenObj.token;
    }
  });

  return activeToken;
};

export const clearActiveToken = () => {
  const tokens = JSON.parse(localStorage.getItem('tokens'));
  const usernames = Object.keys(tokens);

  usernames.forEach((username) => {
    let tokenObj = tokens[username];

    if (tokenObj.isActive) {
      tokenObj.token = '';
      tokenObj.isActive = false;
    }

    tokens[username] = tokenObj;
  });

  localStorage.setItem('tokens', JSON.stringify(tokens));
};

const initialState = {
  user: {},
  token: getActiveToken(),
  tokens: localStorage.getItem('tokens'),
  isLoaded: false,
  isLoading: false,
  isAuthenticated: false,
};

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
