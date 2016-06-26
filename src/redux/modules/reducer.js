import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import formAuth from './formAuth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';

// console.log("formAuth: " + formAuth);
// console.log("auth: " + auth);
export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  formAuth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets
});
