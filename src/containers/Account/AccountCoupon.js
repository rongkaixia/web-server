import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import {UserCenterLeftPanel} from 'containers';
import Image from 'react-bootstrap/lib/Image';
import { routeActions } from 'react-router-redux';
import * as authActions from 'redux/modules/auth';

/* eslint-disable */ 
@connect((state => ({user: state.auth.user})),
        {redirectTo: routeActions.push})
export default class AccountCoupon extends Component {
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
  render() {
    const styles = require('./AccountCoupon.scss');
    const {leftPanel, rightPanel} = require('../UserCenter/UserCenter.scss');
    const {user} = this.props;
    return (
      <div className={'container'}>
        <h1>User Center</h1>
        <div className={leftPanel}>
          <UserCenterLeftPanel/>
        </div>
        <div className={rightPanel}>
          <div className={styles.CouponPanel}>
            优惠券

            <a href="http://127.0.0.1:3456">打开危险网站</a>

            <div className="row">
              <div className="col-md-3">
                <div className={"panel panel-default"} style={{width:'250px', height:'180px'}}>
                  <div className={"panel-body"}>
                    优惠券
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
