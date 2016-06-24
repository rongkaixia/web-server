import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {UserCenterLeftPanel} from 'containers';
import Image from 'react-bootstrap/lib/Image';
import { routeActions } from 'react-router-redux';

import * as authActions from 'redux/modules/auth';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

/* eslint-disable */ 
@connect((state => ({user: state.auth.user})),
        {redirectTo: routeActions.push})
export default class AccountInfo extends Component {
  static propTypes = {
    user: PropTypes.object,
    redirectTo: PropTypes.func.isRequired
  };

  state = {
    isUserModalOpen: false,
    isPasswordModalOpen: false,
    isPhoneModalOpen: false,
    isEmailModalOpen: false,
    isQuestionModalOpen: false,
    isPhoneModalFirstStep: false,
    isPhoneModalSecondStep: false
  }

  openUserModal = (event) => {
    event.preventDefault();
    this.setState({isUserModalOpen: true});
  }

  openPasswordModal = (event) => {
    event.preventDefault();
    this.setState({isPasswordModalOpen: true});
  }

  openPhoneModal = (event) => {
    event.preventDefault();
    this.setState({isPhoneModalOpen: true, isPhoneModalFirstStep: true, isPhoneModalSecondStep: false});
  }

  nextPhoneModal = (event) => {
    event.preventDefault();
    this.setState({isPhoneModalOpen: true, isPhoneModalFirstStep: false, isPhoneModalSecondStep: true});
  }

  openEmailModal = (event) => {
    event.preventDefault();
    this.setState({isEmailModalOpen: true});
  }

  openQuestionModal = (event) => {
    event.preventDefault();
    this.setState({isQuestionModalOpen: true});
  }


  afterOpenModal = (event) => {
    // references are now sync'd and can be accessed.
    event.preventDefault();
    console.log("afterOpenModal");
    console.log("state: " + this.state.modalIsOpen);
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal = (event) => {
    event.preventDefault();
    this.setState({
      isUserModalOpen: false,
      isPasswordModalOpen: false,
      isPhoneModalOpen: false,
      isEmailModalOpen: false,
      isQuestionModalOpen: false,
      isPhoneModalFirstStep: false,
      isPhoneModalSecondStep: false

    });
  }

  // componentWillReceiveProps(nextProps) {
  //   const {signingUp, signupError, signupErrorDesc} = nextProps;
  //   if (!signingUp && !signupError) {
  //     console.log('signup success');
  //     // login
  //     this.props.redirectTo('/login');
  //   }
  // }

  handleModifyUsername = (event) => {
    console.log("handleModifyUsername");
    event.preventDefault();
    const username = this.refs.username;
    this.setState({isUserModalOpen: false});
    // this.props.signup(username.value, password.value);
    // username.value = '';
  }

  handleModifyPassword = (event) => {
    console.log("handleModifyPassword");
    event.preventDefault();
    const username = this.refs.username;
    this.setState({isPasswordModalOpen: false});
    // this.props.signup(username.value, password.value);
    // username.value = '';
  }

  handleModifyEmail = (event) => {
    console.log("handleModifyEmail");
    event.preventDefault();
    const username = this.refs.username;
    this.setState({isEmailModalOpen: false});
    // this.props.signup(username.value, password.value);
    // username.value = '';
  }

  handleModifyPhone = (event) => {
    console.log("handleModifyPhone");
    event.preventDefault();
    const username = this.refs.username;
    this.setState({isPhoneModalOpen: false});
    // this.props.signup(username.value, password.value);
    // username.value = '';
  }

  handleModifyQuestion = (event) => {
    console.log("handleModifyQuestion");
    event.preventDefault();
    const username = this.refs.username;
    this.setState({isQuestionModalOpen: false});
    // this.props.signup(username.value, password.value);
    // username.value = '';
  }

  handleSendPhoneVFCode = (event) => {
    console.log("handleSendPhoneVFCode");
    event.preventDefault();
  }

  renderUserModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.isUserModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">设置账户昵称 <button style={{float: 'right'}} onClick={this.closeModal}>X</button></h4>
          </div>
          <form className="login-form form-horizontal">
            <div className="form-group">
              <input type="text" ref="username" placeholder="昵称" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleModifyUsername}>确定</button>
          </form>
        </Modal>
      </div>
    );
  }

  renderPasswordModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.isPasswordModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">修改密码 <button style={{float: 'right'}} onClick={this.closeModal}>X</button></h4>
          </div>
          <form className="login-form form-horizontal">
            <div className="form-group">
              原密码
              <input type="text" ref="password" placeholder="请输入原密码" className="form-control"/>
            </div>
            <div className="form-group">
              新密码
              <input type="text" ref="newPassword" placeholder="请输入新密码" className="form-control"/>
              <input type="text" ref="confirmedPassword" placeholder="请重复新密码" className="form-control"/>
              <div>密码长度8~16位，其中数字，字母和符号至少包含两种</div>
            </div>
            <button className="btn btn-success" onClick={this.handleModifyPassword}>保存</button>
          </form>
        </Modal>      
      </div>
    );
  }

  renderEmailModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.isEmailModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">绑定邮箱 <button style={{float: 'right'}} onClick={this.closeModal}>X</button></h4>
          </div>
          <form className="login-form form-horizontal">
            <div className="form-group">
              <input type="text" ref="email" placeholder="请输入邮箱地址" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleModifyEmail}>确定</button>
          </form>
        </Modal>
      </div>
    );
  }

  renderPhoneModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.isPhoneModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">修改手机号码 <button style={{float: 'right'}} onClick={this.closeModal}>X</button></h4>
          </div>
          {this.state.isPhoneModalFirstStep &&
            <form className="login-form form-horizontal">
              <div>
                为了您的账号安全，请使用安全手机150******22获取验证码短信
              </div>
              <div className="form-group form-inline">
                <input type="text" ref="vfcode" placeholder="请输入验证码" className="form-control"/>
                <button className="btn btn-success" onClick={this.handleSendPhoneVFCode}>发送短信</button>
              </div>
              <button className="btn btn-success" onClick={this.nextPhoneModal}>下一步</button>
            </form>
          }
          {this.state.isPhoneModalSecondStep &&
            <form className="login-form form-horizontal">
              <div>
                请输入要绑定的手机号码
              </div>
              <input type="text" ref="phonenum" placeholder="请输入手机号码" className="form-control"/>
              <div className="form-group form-inline">
                <input type="text" ref="vfcode" placeholder="请输入验证码" className="form-control"/>
                <button className="btn btn-success" onClick={this.handleSendPhoneVFCode}>发送短信</button>
              </div>
              <button className="btn btn-success" onClick={this.handleModifyPhone}>确定</button>
            </form>
          }
        </Modal>
      </div>
    );
  }

  renderQuestionModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.isQuestionModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">设置密保问题 <button style={{float: 'right'}} onClick={this.closeModal}>X</button></h4>
          </div>
          <form>
            <div className="form-group">
              <select className="form-control">
                <option value="" disabled selected>请选择密保问题</option>
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
              </select>
              <input type="text" ref="email" placeholder="请输入答案" className="form-control"/>
            </div>
            <div className="form-group">
              <select className="form-control">
                <option value="" disabled selected>请选择密保问题</option>
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
              </select>
              <input type="text" ref="email" placeholder="请输入答案" className="form-control"/>
            </div>
            <div className="form-group">
              <select className="form-control">
                <option value="" disabled selected>请选择密保问题</option>
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
              </select>
              <input type="text" ref="email" placeholder="请输入答案" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleModifyQuestion}>确定</button>
          </form>
        </Modal>
      </div>
    );
  }

  render() {
    const styles = require('./AccountInfo.scss');
    const {leftPanel, rightPanel} = require('../UserCenter/UserCenter.scss');
    const userImagePath = require('../../../static/user.png');
    const passIconPath = require('./password.png');
    const emailIconPath = require('./email.png');
    const phoneIconPath = require('./phone.png');
    const questionIconPath = require('./securityQuestion.png');

    const userModal = this.renderUserModal();
    const passwordModal = this.renderPasswordModal();
    const emailModal = this.renderEmailModal();
    const phoneModal = this.renderPhoneModal();
    const questionModal = this.renderQuestionModal();

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
                  <li><button className="btn btn-warning btn-sm" onClick={this.openUserModal}>修改</button></li>
                  {userModal}
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
                    <button className="btn btn-warning btn-sm" onClick={this.openPasswordModal}>修改</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    用于保护账号信息和安全
                  </li>
                  {passwordModal}
                </ul>
            </div>


            <div className="row" style={{padding: '30px'}}>
              <div className="col-md-1">
                <Image href="#" alt="50x50 pull-xs-left" src={emailIconPath} responsive rounded/>
              </div>
                <ul className="nav nav-list">
                  <li>
                    安全邮箱
                    <button className="btn btn-warning btn-sm" onClick={this.openEmailModal}>绑定</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    安全邮箱可用于登录和重置密码
                  </li>
                  {emailModal}
                </ul>
            </div>


            <div className="row" style={{padding: '30px'}}>
              <div className="col-md-1">
                <Image href="#" alt="50x50 pull-xs-left" src={questionIconPath} responsive rounded/>
              </div>
                <ul className="nav nav-list">
                  <li>
                    安全手机
                    <button className="btn btn-warning btn-sm" onClick={this.openPhoneModal}>绑定</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    安全手机可用于登录和重置密码
                  </li>
                  {phoneModal}
                </ul>
            </div>


            <div className="row" style={{padding: '30px'}}>
              <div className="col-md-1">
                <Image href="#" alt="50x50 pull-xs-left" src={passIconPath} responsive rounded/>
              </div>
                <ul className="nav nav-list">
                  <li>
                    密保问题
                    <button className="btn btn-warning btn-sm" onClick={this.openQuestionModal}>设置</button>
                  </li>
                  <li style={{color: 'rgb(183, 179, 179)'}}>
                    密保问题用于安全验证
                  </li>
                  {questionModal}
                </ul>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
