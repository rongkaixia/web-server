const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const SIGNUP = 'redux-example/auth/SIGNUP';
const SIGNUP_SUCCESS = 'redux-example/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'redux-example/auth/SIGNUP_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.userId ? {id: action.userId, name: action.username} : null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: {id: action.userId, name: action.username},
        loginError: false,
        loginErrorDesc: action.errorDescription
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.errorCode,
        loginErrorDesc: action.errorDescription
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        logoutError: false,
        logoutErrorDesc: action.errorDescription
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.errorCode,
        logoutErrorDesc: action.errorDescription
      };
    case SIGNUP:
      return {
        ...state,
        signingUp: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        signupError: false,
        signupErrorDesc: action.errorDescription
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
        signupError: action.errorCode,
        signupErrorDesc: action.errorDescription
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/auth')
  };
}

export function login(username, password, authKey) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        username: username,
        password: password,
        authKey: authKey
      }
    })
  };
}

export function logout(authKey) {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.post('/logout', {
      data: {
        authKey: authKey
      }
    })
  };
}

export function signup(username, password, authKey) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/signup', {
      // authenticity_token
      data: {
        username: username,
        password: password,
        authKey: authKey
      }
    })
  };
}
