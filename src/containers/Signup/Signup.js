import {connect} from 'react-redux';
import { SignupForm } from 'components';
import { routeActions } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';

/* eslint-disable */ 
export default connect(
  state => ({signingUp: state.auth.signingUp,
             signupError: state.auth.signupError,
             signupErrorDesc: state.auth.signupErrorDesc}),
  {...authActions, redirectTo: routeActions.push}
)(SignupForm);