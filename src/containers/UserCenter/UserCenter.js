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
export default class UserCenter extends Component {
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
  renderUserInfoPanel() {
    const {user} = this.props;
    const styles = require('./UserCenter.scss');
    const imagePath = require('../../../static/user.png');
    return (
      <div className={"well " + styles.boxBackground}>
        <div className="row">
          <div className="col-md-2">
            <Image href="#" alt="200x200 pull-xs-left" src={imagePath} responsive rounded/>
          </div>
          <div className="col-md-2">
            <ul className="nav nav-list">
              <li>{"您好，" + user.name}</li>
              <li>欢迎回来</li>
            </ul>
          </div>
          <div className="col-md-8">
            <ul className="nav nav-list">
              <li>{"账号：" + user.name} </li>
              {user.email &&
              <li>
                {"绑定邮箱：" + user.email}
              </li>
              }
              {!user.email &&
              <li>
                绑定邮箱：未绑定
                <button className="btn btn-warning btn-sm">立即绑定</button>
              </li>
              }
              {user.phone &&
              <li>
                {"绑定手机号：" + user.phone}
              </li>
              }
              {!user.phone &&
              <li>
                绑定手机号：未绑定
                <button className="btn btn-warning btn-sm">立即绑定</button>
              </li>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderUserOrderPanel() {
    const {user} = this.props;
    const styles = require('./UserCenter.scss');
    const unpayOrderIconPath = require('../../../static/unpayOrder.png');
    const payedOrderIconPath = require('../../../static/payedOrder.png');
    const completeOrderIconPath = require('../../../static/completeOrder.png');
    const favCartIconPath = require('../../../static/favCart.png');
    return (
      <div className={"well " + styles.boxBackground}>
        <div className="row">
          <div className="col-md-2">
            <Image href="#" alt="200x200 pull-xs-left" src={unpayOrderIconPath} responsive rounded/>
          </div>
          <div className="col-md-2">
            <div> 待支付订单 </div>
            <div><a href="">查看待支付订单</a></div>
          </div>
          <div className="col-md-2">
            <Image href="#" alt="200x200 pull-xs-left" src={payedOrderIconPath} responsive rounded/>
          </div>
          <div className="col-md-2">
            <div> 待发货订单 </div>
            <div><a href="">查看待发货订单</a></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <Image href="#" alt="200x200 pull-xs-left" src={completeOrderIconPath} responsive rounded/>
          </div>
          <div className="col-md-2">
            <div> 已完成订单 </div>
            <div><a href="">查看已完成订单</a></div>
          </div>
          <div className="col-md-2">
            <Image href="#" alt="200x200 pull-xs-left" src={favCartIconPath} responsive rounded/>
          </div>
          <div className="col-md-2">
            <div> 购物车 </div>
            <div><a href="">查看购物车</a></div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const styles = require('./UserCenter.scss');
    const userInfoPanel = this.renderUserInfoPanel();
    const userOrderPanel = this.renderUserOrderPanel();
    return (
      <div className={styles.userCenterPage + ' container'}>
        <h1>User Center</h1>
        <div className={styles.leftPanel}>
          <UserCenterLeftPanel/>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.userInfoPanel}>
            {userInfoPanel}
          </div>
          <div className={styles.userOrderPanel}>
            {userOrderPanel}
          </div>
        </div>

      </div>
    );
  }
}