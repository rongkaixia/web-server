import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { routeActions } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';
import Helmet from 'react-helmet';

/* eslint-disable */ 
@connect(
  state => ({signingUp: state.auth.signingUp,
            signupError: state.auth.signupError,
            signupErrorDesc: state.auth.signupErrorDesc,
            authKey: state.csrf._csrf}),
  {...authActions, redirectTo: routeActions.push}
)

export default class Signup extends Component {
  static propTypes = {
    signingUp: PropTypes.object,
    signupError: PropTypes.object,
    signupErrorDesc: PropTypes.object,
    authKey: PropTypes.string,
    signup: PropTypes.func.isRequired,
    redirectTo: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const {signingUp, signupError} = nextProps;
    if (!signingUp && !signupError) {
      console.log('signup success');
      // login
      this.props.redirectTo('/login');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const authKey = this.refs.authKey;
    this.props.signup(username.value, password.value, authKey.value);
    // username.value = '';
    password.value = '';
  }

  render() {
    const {signupError, authKey, signupErrorDesc} = this.props;
    const styles = require('./Signup.scss');
    return (
      <div className={styles.signupPage + ' container'}>
        <Helmet title="Signup"/>
        <h1>Signup</h1>
        <div>
          <form className="-form form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group form-inline">
              <input type="text" ref="username" placeholder="Enter a username"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="Enter a password"/>
            </div>
            <input name="utf8" ref="authKey" type="hidden" value={authKey} />
            <p>{signupError ? signupErrorDesc : ''}</p>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}注册
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
      </div>
    );
  }
}
