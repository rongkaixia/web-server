import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Querystring from 'querystring';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { routeActions } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';

/* eslint-disable */ 
@asyncConnect([{
  key: 'logoutAuthKey',
  promise: ({store: {dispatch, getState}, helpers: {client}}) => {
    return client.get('/api/form_token');
    // return new ApiClient().get('/api/form_token')
  }
}])
@connect(
  state => ({user: state.userInfo.user,
            location: state.routing.location,
            logoutError: state.auth.logoutError,
            logoutErrorDesc: state.auth.logoutErrorDesc,
            logoutAuthKey: state.reduxAsyncConnect.logoutAuthKey}),
  {...authActions, redirectTo: routeActions.push}
)
export default class Logout extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
    logoutError: PropTypes.object,
    logoutErrorDesc: PropTypes.object,
    logoutAuthKey: PropTypes.object,
    load: PropTypes.func,
    location: PropTypes.object,
    redirectTo: PropTypes.func.isRequired
  };

  contextTypes = {
    router: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) {
      console.log('logout success');
      let redirectPath = '/';
      this.props.redirectTo(redirectPath);
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    const authKey = this.refs.authKey;
    console.log("handleLogout authKey: " + authKey.value);
    this.props.logout(authKey.value);
  }

  render() {
    const {user, logoutAuthKey, logout, logoutError, logoutErrorDesc} = this.props;
    const styles = require('./Logout.scss');
    console.log("===========logoutAuthKey=========");
    console.log(logoutAuthKey);
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {user && !logoutError &&
        <div>
          <p>You are currently logged in as {user.usename}.</p>
          <div>
            <form>
              <input name="utf8" ref="authKey" type="hidden" value={logoutAuthKey.data} />
            </form>
            <button className="btn btn-danger" onClick={this.handleLogout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
        {user && logoutError &&
        <div>
          <p>{logoutErrorDesc}</p>
        </div>
        }
      </div>
    );
  }
}
