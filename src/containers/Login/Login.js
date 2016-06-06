import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import { LoginForm } from 'components';
import * as authActions from 'redux/modules/auth';

/* eslint-disable */ 
export default connect(
  state => ({user: state.auth.user,
			 loginError: state.auth.loginError,
			 loginErrorDesc: state.auth.loginErrorDesc}),
  {...authActions, redirectTo: routeActions.push}
)(LoginForm);