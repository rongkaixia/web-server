import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import Image from 'react-bootstrap/lib/Image';
import * as Validation from 'utils/validation';

const validate = values => {
  const errors = {}
  if (!values.recipientsName) {
    errors.recipientsName = '收件人不能为空'
  }
  if (!values.recipientsPhone) {
    errors.recipientsPhone = '电话号码不能为空'
  } else if (!Validation.phonenum(values.recipientsPhone)) {
    errors.recipientsPhone = '电话号码不合法'
  }
  if (!values.recipientsAddress) {
    errors.age = '收货地址不能为空'
  }
  return errors
}

/* eslint-disable */
@reduxForm({
  form: 'address',
  fields: ['id', 'recipientsName', 'recipientsPhone', 'recipientsAddress', 'serverError'],
  validate
})
export default class AccountAddress extends Component {
  static propTypes = {
    authKey: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    initialValues: PropTypes.object
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
    const {fields: {id, recipientsName, recipientsPhone, recipientsAddress, serverError}, 
          authKey,
          handleClose,
          handleSubmit} =  this.props;
    return (
      <div>
        <h4 ref="subtitle">添加收货地址 <button style={{float: 'right'}} onClick={handleClose}>X</button></h4>
        <form className="login-form form-horizontal" onSubmit={handleSubmit}>
          <input name="utf8" ref="authKey" type="hidden" value={authKey} />
          <div className="form-group">
            <label>收件人</label>
            <input type="text" placeholder="长度不超过12个字" {...recipientsName}/>
            {recipientsName.touched && recipientsName.error && <div>{recipientsName.error}</div>}
          </div>
          <div className="form-group">
            <label>电话</label>
            <input type="text" placeholder="请输入11位手机号码" {...recipientsPhone}/>
            {recipientsPhone.touched && recipientsPhone.error && <div>{recipientsPhone.error}</div>}
          </div>

          <div className="form-group">
            <label>地址</label>
            <textarea name="Text1" cols="40" rows="5" placeholder="请输入收货地址" {...recipientsAddress}>
            </textarea>}
            {recipientsAddress.touched && recipientsAddress.error && <div>{recipientsAddress.error}</div>}
          </div>
            {serverError.touched && serverError.error && <div>{serverError.error}</div>}
          <button className="btn btn-success" onClick={handleSubmit}>保存</button>
        </form>
      </div>
    );
  }
}
