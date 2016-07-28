import API from 'api/api'

const LOAD_INFO = 'redux-example/product/LOAD_INFO';
const LOAD_INFO_SUCCESS = 'redux-example/product/LOAD_INFO_SUCCESS';
const LOAD_INFO_FAIL = 'redux-example/product/LOAD_INF_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  let newInfo = {};
  switch (action.type) {
    case LOAD_INFO:
      return {
        ...state,
        loading: true
      };
    case LOAD_INFO_SUCCESS:
      // newProducts = {...(state.products), ...(action.data)};
      return {
        ...state,
        loading: false,
        loaded: true,
        products: action.data,
        loadInfoError: false,
        loadInfoErrorDesc: action.errorDescription
      };
    case LOAD_INFO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        loadInfoError: action.errorCode,
        loadInfoErrorDesc: action.errorDescription
      };

    default:
      return state;
  }
}

/**
 * load product info
 *
 * @param   {string}  type  ring, necklace, earring
 */
export function loadInfo(path) {
  return {
    types: [LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_FAIL],
    promise: (client) => client.get(path ? API.PRODUCT_API_PATH + '/' + path : API.PRODUCT_API_PATH)
  };
}

export function loadNecklace(id) {
  return loadInfo(id ? 'necklace/' + id : 'necklace');
}

export function loadEarring(id) {
  return loadInfo(id ? 'earring/' + id : 'earring');
}

export function loadRing(id) {
  return loadInfo(id ? 'ring/' + id : 'ring');
}
