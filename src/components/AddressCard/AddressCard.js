import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import Image from 'react-bootstrap/lib/Image';
import * as Validation from 'utils/validation';

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
/**
 * address: {id: xxx, name: xxx, phonenum: xxx, address: xxx}
 */
export default class AccountAddress extends Component {
  static propTypes = {
    address: PropTypes.object,
    update: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    loadInfo: PropTypes.func.isRequired,
    authKey: PropTypes.object.isRequired
  };

  state = {
    modalIsOpen: false,
    usernameError: null,
    phonenumError: null,
    addressError: null,
    updateAddressError: null,
    deleteModalIsOpen: false,
    deleteAddressError: null
  };

  openUpdateModal = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("openUpdateModal");
    console.log("state: " + this.state.modalIsOpen);
    this.setState({modalIsOpen: true});
  }

  openDeleteModel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("openDeleteModel");
    this.setState({deleteModalIsOpen: true});
  }

  afterOpenDeleteModal = (event) => {
    // references are now sync'd and can be accessed.
    // event.preventDefault();
    console.log("afterOpenDeleteModal");
    console.log("state: " + this.state.deleteModalIsOpen);
    // this.refs.subtitle.style.color = '#f00';
  }

  closeDeleteModel = (event) => {
    event.preventDefault();
    console.log("openDeleteModel");
    this.setState({deleteModalIsOpen: false,
                  deleteAddressError: null});
  }

  afterOpenUpdateModal = (event) => {
    // references are now sync'd and can be accessed.
    // event.preventDefault();
    console.log("afterOpenUpdateModal");
    console.log("state: " + this.state.modalIsOpen);
    // this.refs.subtitle.style.color = '#f00';
  }

  closeUpdateModal = (event) => {
    event.preventDefault();
    this.setState({modalIsOpen: false,
                  usernameError: null,
                  phonenumError: null,
                  addressError: null,
                  updateAddressError: null});
  }

  // componentWillReceiveProps(nextProps) {
  //   const {signingUp, signupError, signupErrorDesc} = nextProps;
  //   if (!signingUp && !signupError) {
  //     console.log('signup success');
  //     // login
  //     this.props.redirectTo('/login');
  //   }
  // }

  handleDeleteAddress = (event) => {
    event.preventDefault();
    console.log('handle delete address');
    const addressId = this.refs.addressId;
    const authKey = this.refs.authKey;
    this.props.delete({id: addressId.value, authKey: authKey.value})
    .then(() => {
      this.setState({deleteModalIsOpen: false});
    })
    .then(() => {
      this.props.loadInfo();
    })
    .catch(err => {
      this.setState({deleteAddressError: JSON.stringify(err)})
    })  
  }

  handleUpdateAddress = (event) => {
    event.preventDefault();
    console.log('handle add address');
    const addressId = this.refs.addressId;
    const recipientsName = this.refs.recipientsName;
    if (Validation.empty(recipientsName.value)) {
      this.setState({usernameError: '收件人不能为空'});
      return;
    }
    if (this.state.usernameError) this.setState({usernameError: null});
    const recipientsPhone = this.refs.recipientsPhone;
    if (Validation.empty(recipientsPhone.value)) {
      this.setState({phonenumError: '电话号码不能为空'});
      return;
    }
    if (!Validation.phonenum(recipientsPhone.value)) {
      this.setState({phonenumError: '电话号码不合法'});
      return;
    }
    if (this.state.phonenumError) this.setState({phonenumError: null});
    const recipientsAddress = this.refs.recipientsAddress;
    if (Validation.empty(recipientsAddress.value)) {
      this.setState({addressError: '收货地址不能为空'});
      return;
    }
    if (this.state.addressError) this.setState({addressError: null});
    const authKey = this.refs.authKey;
    console.log("recipientName: " + recipientsName.value);
    console.log("recipientPhone: " + recipientsPhone.value);
    console.log("recipientAddress: " + recipientsAddress.value);
    let promise = []
    if (!Validation.empty(addressId) && !Validation.empty(addressId.value)) {
      console.log("addressId: " + addressId.value);
      promise = this.props.update({id: addressId.value,
                                recipientsName:recipientsName.value, 
                                recipientsPhone:recipientsPhone.value, 
                                recipientsAddress:recipientsAddress.value, 
                                authKey: authKey.value})
    } else {
      promise = this.props.add({recipientsName:recipientsName.value, 
                                recipientsPhone:recipientsPhone.value, 
                                recipientsAddress:recipientsAddress.value, 
                                authKey: authKey.value})
    }
    promise
    .then(() => {
      this.setState({modalIsOpen: false});
    })
    .then(() => {
      this.props.loadInfo();
    })
    .catch(err => {
      this.setState({updateAddressError: JSON.stringify(err)})
    })
    // const username = this.refs.username;
    // const password = this.refs.password;
    // this.props.signup(username.value, password.value);
    // // username.value = '';
    // password.value = '';
  }

  renderAddressModal(data) {
    const {authKey} =  this.props;
    const recipientsName = data ? data.recipientsName : null;
    const recipientsPhone = data ? data.recipientsPhone : null;
    const recipientsAddress = data ? data.recipientsAddress : null;
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenUpdateModal}
          onRequestClose={this.closeUpdateModal}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">添加收货地址 <button style={{float: 'right'}} onClick={this.closeUpdateModal.bind(this)}>X</button></h4>
          </div>
          <form className="login-form form-horizontal">
            <input name="utf8" ref="authKey" type="hidden" value={authKey.data} />
            <div className="form-group">
              收件人
              {!recipientsName &&
              <input type="text" ref="recipientsName" placeholder="长度不超过12个字" className="form-control"/>}
              {recipientsName &&
              <input type="text" ref="recipientsName" value={recipientsName} className="form-control"/>}
              {this.state.usernameError &&
              <div>{this.state.usernameError}</div>}
            </div>
            <div className="form-group">
              电话
              {!recipientsPhone &&
              <input type="text" ref="recipientsPhone" placeholder="请输入11位手机号码" className="form-control"/>}
              {recipientsPhone &&
              <input type="text" ref="recipientsPhone" value={recipientsPhone} className="form-control"/>}
              {this.state.phonenumError &&
              <div>{this.state.phonenumError}</div>}
            </div>

            <div className="form-group">
              地址
              {!recipientsAddress && 
              <textarea name="Text1" ref="recipientsAddress" cols="40" rows="5" placeholder="请输入收货地址" className="form-control">
              </textarea>}
              {recipientsAddress && 
              <textarea name="Text1" ref="recipientsAddress" cols="40" rows="5" value={recipientsAddress} className="form-control">
              </textarea>}
              {this.state.addressError &&
              <div>{this.state.addressError}</div>}
            </div>
            {this.state.updateAddressError &&
            <div>{this.state.updateAddressError}</div>}
            <button className="btn btn-success" onClick={this.handleUpdateAddress.bind(this)}>保存</button>
          </form>
        </Modal>
      </div>
    );
  }

  renderDeleteAddressModal(data) {
    const {authKey} =  this.props;
    return (
      <div>
        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onAfterOpen={this.afterOpenDeleteModal}
          onRequestClose={this.closeDeleteModel}
          style={customStyles} >

          <div>
            <h4 ref="subtitle">添加收货地址 <button style={{float: 'right'}} onClick={this.closeDeleteModel.bind(this)}>X</button></h4>
          </div>
          <form className="login-form form-horizontal">
            <input name="utf8" ref="authKey" type="hidden" value={authKey.data} />
            <div>删除该收货地址吗？</div>
            <button className="btn btn-success" onClick={this.handleDeleteAddress.bind(this)}>确定</button>
          </form>
        </Modal>
      </div>
    );
  }

  render() {
    const styles = require('./AddressCard.scss');
    const {address} = this.props;
    const addressModal = this.renderAddressModal(address);
    const deleteAddressModal = this.renderDeleteAddressModal(address);
    const plusIconPath = require('./plus.png');
    const addressId = address ? address.id : null

    return (
      <div className={styles.AddressCard}>
          <div className="col-md-3" style={{width:'250px', height:'180px'}}>
            <div className={"panel panel-default"} style={{height: '100%'}} onClick={this.openUpdateModal.bind(this)}>
              {!address &&
              <div style={{'padding-left': '35%', 'padding-top': '20%'}}>
                <Image href="#" alt="25x25 pull-xs-left" src={plusIconPath} responsive rounded/>
              </div>}
              {address &&
              <div className={"panel-heading"} style={{height: '20%'}}>
                <input name="utf8" ref="addressId" type="hidden" value={addressId} />
                <span>{address.recipientsName}</span><span>{address.recipientsPhone}</span>
              </div>}
              {address &&
              <div className={"panel-body"} style={{height:'70%'}}>
                {address.recipientsAddress}
              </div>}
              {address && <div class="panel-footer" style={{height:'10%'}}><span onClick={this.openDeleteModel.bind(this)}>删除</span></div>}
            </div>
          </div>
        {addressModal}
        {deleteAddressModal}
      </div>
    );
  }
}
