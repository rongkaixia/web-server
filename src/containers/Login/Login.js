import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Querystring from 'querystring';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { routeActions } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';


/* eslint-disable */ 
@asyncConnect([{
  key: 'loginAuthKey',
  promise: ({store: {dispatch, getState}, helpers: {client}}) => {
    return client.get('/api/form_token');
    // return new ApiClient().get('/api/form_token')
  }
}])
@connect(
  state => ({user: state.auth.user,
  					location: state.routing.location,
						loginError: state.auth.loginError,
						loginErrorDesc: state.auth.loginErrorDesc,
						loginAuthKey: state.reduxAsyncConnect.loginAuthKey}),
  {...authActions, redirectTo: routeActions.push}
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    loginError: PropTypes.object,
    loginErrorDesc: PropTypes.object,
    loginAuthKey: PropTypes.object,
    load: PropTypes.func,
    location: PropTypes.object,
    redirectTo: PropTypes.func.isRequired
  };

  contextTypes = {
    router: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps: " + JSON.stringify(nextProps));
    if (!this.props.user && nextProps.user) {
      console.log('login success');
      let redirectPath = '/';
      if (this.props.location.search !== '') {
        const queryParams = Querystring.parse(this.props.location.search.substring(1));
        redirectPath = queryParams.return_to;
      }
      this.props.redirectTo(redirectPath);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const authKey = this.refs.authKey;
    this.props.login(username.value, password.value, authKey.value);
    password.value = '';
  }

  render() {
    const {user, loginAuthKey, loginError, loginErrorDesc} = this.props;
    const styles = require('./Login.scss');
    console.log("===========loginAuthKey=========");
    console.log(loginAuthKey);
    // const authKey = generateCsrfToken();
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group form-inline">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
            </div>
            <div className="form-group form-inline">
              <input type="password" ref="password" placeholder="Enter a password" className="form-control"/>
            </div>
	          <input name="utf8" ref="authKey" type="hidden" value={loginAuthKey.data} />
            <p>{loginError ? loginErrorDesc : ''}</p>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
        </div>
        }
      </div>
    );
  }
}
