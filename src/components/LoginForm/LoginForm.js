import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Querystring from 'querystring';
import {generateCsrfToken} from 'utils/AuthenticityToken'

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    loginError: PropTypes.object,
    loginErrorDesc: PropTypes.object,
    logout: PropTypes.func,
    logoutError: PropTypes.object,
    logoutErrorDesc: PropTypes.object,
    load: PropTypes.func,
    location: PropTypes.object,
    redirectTo: PropTypes.func.isRequired
  };

  contextTypes = {
    router: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
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
    this.props.login(username.value, password.value);
    password.value = '';
  }

  handleLoadAuth = (event) => {
    event.preventDefault();
    this.props.load();
  }

  handleLogout = (event) => {
    event.preventDefault();
    const authKey = this.refs.authKey;
    console.log("authKey: " + authKey.value);
    this.props.logout(authKey.value);
  }

  render() {
    const {user, loginError, loginErrorDesc, logout, logoutError, logoutErrorDesc} = this.props;
    const styles = require('./LoginForm.scss');
    const authKey = generateCsrfToken();
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
            <p>{loginError ? loginErrorDesc : ''}</p>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
            <button className="btn btn-success" onClick={this.handleLoadAuth}><i className="fa fa-sign-in"/>{' '}LoadAuth
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user && !logoutError &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <div>
            <form>
              <input name="utf8" ref="authKey" type="hidden" value={authKey} />
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
