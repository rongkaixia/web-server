import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import { LoginForm } from 'components';
import * as authActions from 'redux/modules/auth';

/* eslint-disable */ 
export default connect(
  state => ({user: state.auth.user,
  					location: state.routing.location,
						loginError: state.auth.loginError,
						loginErrorDesc: state.auth.loginErrorDesc,
						logoutError: state.auth.logoutError,
						logoutErrorDesc: state.auth.logoutErrorDesc}),
  {...authActions, redirectTo: routeActions.push}
)(LoginForm);