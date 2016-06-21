import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {UserCenterLeftPanel} from 'containers';
import Image from 'react-bootstrap/lib/Image';
import { routeActions } from 'react-router-redux';

import * as authActions from 'redux/modules/auth';

/* eslint-disable */ 
@connect((state => ({user: state.auth.user})),
        {redirectTo: routeActions.push})
export default class AccountInfo extends Component {
  static propTypes = {
    user: PropTypes.object,
    redirectTo: PropTypes.func.isRequired
  };

  // componentWillReceiveProps(nextProps) {
  //   const {signingUp, signupError, signupErrorDesc} = nextProps;
  //   if (!signingUp && !signupError) {
  //     console.log('signup success');
  //     // login
  //     this.props.redirectTo('/login');
  //   }
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const username = this.refs.username;
  //   const password = this.refs.password;
  //   this.props.signup(username.value, password.value);
  //   // username.value = '';
  //   password.value = '';
  // }

  render() {
    const styles = require('./AccountInfo.scss');
    const {leftPanel, rightPanel} = require('../UserCenter/UserCenter.scss');
    const userImagePath = require('../../../static/user.png');
    const passIconPath = require('./password.png');
    const emailIconPath = require('./email.png');
    const phoneIconPath = require('./phone.png');
    const questionIconPath = require('./securityQuestion.png');
    const {user} = this.props;
    return (
      <div className={'container'}>
        <h1>User Center</h1>
        <div className={leftPanel}>
          <UserCenterLeftPanel/>
        </div>
        <div className={rightPanel}>
          <div className={styles.InfoPanel}>
            个人信息
            <div className="row">
              <div className="col-md-2">
                <Image href="#" alt="200x200 pull-xs-left" src={userImagePath} responsive rounded/>
              </div>
              <div className="col-md-2">
                <ul className="nav nav-list">
                  <li>{"账户昵称：" + user.name}</li>
                  <li><button className="btn btn-warning btn-sm">修改</button></li>
                </ul>
              </div>
            </div>

            <div className="row" style={{padding: '30px'}}>
              <div className="col-md-1">
                <Image href="#" alt="50x50 pull-xs-left" src={passIconPath} responsive rounded/>
              </div>
                <ul className="nav nav-list">
                  <li>
                    账号密码
                    <button className="btn btn-warning btn-sm">修改</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    用于保护账号信息和安全
                  </li>
                </ul>
            </div>


            <div className="row" style={{padding: '30px'}}>
              <div className="col-md-1">
                <Image href="#" alt="50x50 pull-xs-left" src={emailIconPath} responsive rounded/>
              </div>
                <ul className="nav nav-list">
                  <li>
                    安全邮箱
                    <button className="btn btn-warning btn-sm">绑定</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    安全邮箱可用于登录和重置密码
                  </li>
                </ul>
            </div>


            <div className="row" style={{padding: '30px'}}>
              <div className="col-md-1">
                <Image href="#" alt="50x50 pull-xs-left" src={questionIconPath} responsive rounded/>
              </div>
                <ul className="nav nav-list">
                  <li>
                    安全手机
                    <button className="btn btn-warning btn-sm">绑定</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    安全手机可用于登录和重置密码
                  </li>
                </ul>
            </div>


            <div className="row" style={{padding: '30px'}}>
              <div className="col-md-1">
                <Image href="#" alt="50x50 pull-xs-left" src={passIconPath} responsive rounded/>
              </div>
                <ul className="nav nav-list">
                  <li>
                    密保问题
                    <button className="btn btn-warning btn-sm">绑定</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    密保问题用于安全验证
                  </li>
                </ul>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
