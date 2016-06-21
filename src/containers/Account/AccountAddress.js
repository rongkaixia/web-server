import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
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

@connect(
  state => ({user: state.auth.user})
)
class AddressModal extends Component{
  static propTypes = {
    user: PropTypes.object
  };

  state = {
    modalIsOpen: false
  };

  openModal() {
    console.log("openModal");
    console.log("state: " + this.state.modalIsOpen);
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("afterOpenModal");
    console.log("state: " + this.state.modalIsOpen);
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}
/* eslint-disable */ 
@connect((state => ({user: state.auth.user})),
        {redirectTo: routeActions.push})
export default class AccountAddress extends Component {
  static propTypes = {
    user: PropTypes.object,
    redirectTo: PropTypes.func.isRequired
  };

  state = {
    modalIsOpen: false
  };

  openModal = (event) => {
    event.preventDefault();
    console.log("openModal");
    console.log("state: " + this.state.modalIsOpen);
    this.setState({modalIsOpen: true});
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
    this.setState({modalIsOpen: false});
  }

  // componentWillReceiveProps(nextProps) {
  //   const {signingUp, signupError, signupErrorDesc} = nextProps;
  //   if (!signingUp && !signupError) {
  //     console.log('signup success');
  //     // login
  //     this.props.redirectTo('/login');
  //   }
  // }

  handleAddAddress = (event) => {
    event.preventDefault();
    console.log('handle add address');
    console.log('this.props: ' + this.props);
    const recipientName = this.refs.recipientName;
    const recipientPhone = this.refs.recipientPhone;
    const recipientAddress = this.refs.recipientAddress;
    console.log("recipientName: " + recipientName.value);
    console.log("recipientPhone: " + recipientPhone.value);
    console.log("recipientAddress: " + recipientAddress.value);
    this.setState({modalIsOpen: false});
    // const username = this.refs.username;
    // const password = this.refs.password;
    // this.props.signup(username.value, password.value);
    // // username.value = '';
    // password.value = '';
  }

  renderAddressModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">添加收货地址 <button style={{float: 'right'}} onClick={this.closeModal}>X</button></h4>
          </div>
          <form className="login-form form-horizontal">
            <div className="form-group form-inline">
              收件人
              <input type="text" ref="recipientName" placeholder="长度不超过12个字" className="form-control"/>
            </div>
            <div className="form-group form-inline">
              电话
              <input type="text" ref="recipientPhone" placeholder="请输入11位手机号码" className="form-control"/>
            </div>
            <div className="form-group form-inline">
              地址
              <textarea name="Text1" ref="recipientAddress" cols="40" rows="5" placeholder="请输入收货地址" className="form-control">
              </textarea>
            </div>
            <button className="btn btn-success" onClick={this.handleAddAddress}>保存</button>
          </form>
        </Modal>
      </div>
    );
  }

  render() {
    const styles = require('./AccountAddress.scss');
    const {leftPanel, rightPanel} = require('../UserCenter/UserCenter.scss');
    const addressModal = this.renderAddressModal();
    const {user} = this.props;
    return (
      <div className={'container'}>
        <h1>User Center</h1>
        <div className={leftPanel}>
          <UserCenterLeftPanel/>
        </div>
        <div className={rightPanel}>
          <div className={styles.AddressPanel}>
            收货地址

            <div className="row">
              <div className="col-md-3">
                <div className={"panel panel-default"} style={{width:'250px', height:'180px'}} onClick={this.openModal}>
                  <div className={"panel-heading"}>
                    <span>小明</span><span>15002029322</span>
                  </div>
                  <div className={"panel-body"}>
                    深圳市南山区鸿瑞花园4-702
                  </div>
                </div>
              </div>
            </div>

            {addressModal}

          </div>
        </div>

      </div>
    );
  }
}
