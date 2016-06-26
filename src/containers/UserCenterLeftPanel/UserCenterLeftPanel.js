import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

export default class UserCenterLeftPanel extends Component {
  static propTypes = {
  };

  render() {
    const styles = require('./UserCenterLeftPanel.scss');
    return (
        <div className="row">
          <div className="span3">
            <div className="well">
              <ul className="nav nav-list">
                <li><label className="tree-toggle nav-header">订单中心</label>
                  <ul className="nav nav-list tree">
                    <li><Link to="#">我的订单</Link></li>
                    <li><Link to="#">我的购物车</Link></li>
                  </ul>
                </li>
                <li><label className="tree-toggle nav-header">个人中心</label>
                  <ul className="nav nav-list tree">
                    <li><Link to="/account">我的商城</Link></li>
                    <li><Link to="/account/info">个人信息</Link></li>
                    <li><Link to="#">修改密码</Link></li>
                    <li><Link to="/account/address">收货地址</Link></li>
                    <li><Link to="/account/coupon">优惠券</Link></li>
                  </ul>
                </li>
                <li><label className="tree-toggle nav-header">售后中心</label>
                  <ul className="nav nav-list tree">
                    <li><Link to="#">联系我们</Link></li>
                    <li><Link to="#">意见反馈</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}
