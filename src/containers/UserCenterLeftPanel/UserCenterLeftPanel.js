import React, {Component, PropTypes} from 'react';
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
                    <li><a href="#">我的订单</a></li>
                    <li><a href="#">我的购物车</a></li>
                  </ul>
                </li>
                <li><label className="tree-toggle nav-header">个人中心</label>
                  <ul className="nav nav-list tree">
                    <li><a href="/account">我的商城</a></li>
                    <li><a href="/account/info">个人信息</a></li>
                    <li><a href="#">修改密码</a></li>
                    <li><a href="/account/address">收货地址</a></li>
                    <li><a href="/account/coupon">优惠券</a></li>
                  </ul>
                </li>
                <li><label className="tree-toggle nav-header">售后中心</label>
                  <ul className="nav nav-list tree">
                    <li><a href="#">联系我们</a></li>
                    <li><a href="#">意见反馈</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}
