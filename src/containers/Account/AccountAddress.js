import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import {UserCenterLeftPanel} from 'containers';
import {AddressCard} from 'components';
import { routeActions } from 'react-router-redux';
import * as userAction from 'redux/modules/userInfo';

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
@asyncConnect([{
  promise: ({store: {dispatch, getState}, helpers: {client}}) => {
    return dispatch(userAction.loadInfo());
    // return loadInfo();
  }
},{
  key: 'accountAddressAuthKey',
  promise: ({store: {dispatch, getState}, helpers: {client}}) => {
    return client.get('/api/form_token');
    // return new ApiClient().get('/api/form_token')
  }
}])
@connect((state =>  ({user: state.userInfo.user,
                      authKey: state.reduxAsyncConnect.accountAddressAuthKey,
                      loadInfoError: state.userInfo.loadInfoError,
                      loadInfoErrorDesc: state.userInfo.loadInfoErrorDesc,
                      updateInfoError: state.userInfo.updateInfoError,
                      updateInfoErrorDesc: state.userInfo.updateInfoErrorDesc})),
        {loadInfo: userAction.loadInfo,
        addAddress: userAction.addUserAddress,
        updateAddress: userAction.updateUserAddress,
        deleteAddress: userAction.deleteUserAddress,
        redirectTo: routeActions.push})
export default class AccountAddress extends Component {
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
    const styles = require('./AccountAddress.scss');
    const {leftPanel, rightPanel} = require('../UserCenter/UserCenter.scss');
    const {user, loadInfo, authKey, addAddress, updateAddress, deleteAddress} = this.props;
    // const address = {id: '1111', username: '小明', phonenum: '15002029322', address: "深圳市南山区鸿瑞花园4-702"}
    let addressCards = [];
    if (user.addressarrayList) {
      user.addressarrayList.forEach((address) => {
        addressCards.push(
          <AddressCard 
          loadInfo={loadInfo}
          update={updateAddress} 
          add={addAddress} 
          delete={deleteAddress} 
          address={address} 
          authKey={authKey} />
        );
      })
    }
    addressCards.push(
      <AddressCard 
      loadInfo={loadInfo}
      update={updateAddress} 
      add={addAddress} 
      delete={deleteAddress} 
      authKey={authKey} />
    );
    return (
      <div className={'container'}>
        <h1>User Center</h1>
        <div className={leftPanel}>
          <UserCenterLeftPanel/>
        </div>
        <div className={rightPanel}>
          <div className={styles.AddressPanel}>
            <div className="form-group form-inline">
              <ul>{addressCards}</ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
