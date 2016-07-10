
import Express from 'express';
import BodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import CaptainClient from './helpers/CaptainClient';
import ErrorMessage from './error';
import Cookies from './cookies';
import { generateCsrfToken, validateCsrfToken, VALIDATE_RESULT } from 'utils/AuthenticityToken';
import FormAuthenticator from 'middleware/FormAuthenticator';
const protocol = require('../lib/protocol/com.echo.protocol_pb');
const captainClient = new CaptainClient();

const SIGNUP_API_PATH = '/signup';
const LOGIN_API_PATH = '/login';
const LOGOUT_API_PATH = '/logout';
const VALIDATE_TOKEN_API_PATH = '/auth';
const USER_INFO_API_PATH = '/user/info';

const USERNAME_API_SUFFIX = 'username';
const PASSWORD_API_SUFFIX = 'password';
const PHONENYM_API_SUFFIX = 'phonenum';
const EMAIL_API_SUFFIX = 'email';
const ADD_ADDRESS_API_SUFFIX = 'addressadd';
const UPDATE_ADDRESS_API_SUFFIX = 'addressupdate';
const DELETE_ADDRESS_API_SUFFIX = 'addressdelete';

function checkPassword(password){
	return true
}

function checkPhonenum(phonenum){
	return true
}

let router = Express.Router();
router.use(BodyParser.json()); // for parsing application/json
router.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(CookieParser())

// FormAuthenticator middleware
router.post('*', FormAuthenticator);

// get form authenticity token
router.get('/api/form_token', (req, res) => {
  console.log("==============/api/form_token===========");
  let playload = {};
  if (req && req.cookies && req.cookies[Cookies.session]) {
    playload[Cookies.session] = req.cookies[Cookies.session];
  }
  console.log("/api/form_token::playload: " + JSON.stringify(playload));
  let token = generateCsrfToken(playload);
  let result = {data: token};
  res.json(result);
})

// clear cookie function
let clearCookie = (req, res) => {
  if (req.cookies && req.cookies[Cookies.username])
    res.clearCookie(Cookies.username);
  if (req.cookies && req.cookies[Cookies.session])
    res.clearCookie(Cookies.session);
  if (req.cookies && req.cookies[Cookies.userID])
    res.clearCookie(Cookies.userID);
  if (req.cookies && (req.cookies[Cookies.loggedIn] == 'true' || req.cookies[Cookies.loggedIn] == true))
    res.cookie(Cookies.loggedIn, false);
}

router.post(SIGNUP_API_PATH, (req, res) => {
  console.log("handle signup request: " + req.body);
  // check input
  
  // construct signup request
  let signupReq = new protocol.Request.SignupRequest();
  signupReq.setPhonenum(req.body.username);
  signupReq.setPassword(req.body.password);
  let request = new protocol.Request();
  request.setSignupRequest(signupReq);
  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(request.toObject()))

  // send request to backend server
  captainClient.post(request)
  .then((response)=>{
		console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
		let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
		let result = {};
		if (response.getResult() != protocol.ResultCode.SUCCESS){
			result = {...result, ...errorMsg};
  	}else{
      let data = response.getSignupResponse().toObject();
  		result = {...result, ...errorMsg, ...{data:data}};
  	}
  	console.log("send response: " + JSON.stringify(result));
  	res.json(result);
  })
  .catch(err => {
    console.log("handle response from Captain Server error: " + err);
  	let errorMsg = new ErrorMessage(protocol.ResultCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
  	console.log(errorMsg.toObject());
  	res.json(errorMsg.toObject());
  })
})

router.post(LOGIN_API_PATH, (req, res) => {
  console.log("handle login request: " + req.body);
  // check input
  
  // construct login request
  let loginReq = new protocol.Request.LoginRequest();
  loginReq.setPhonenum(req.body.username);
  loginReq.setPassword(req.body.password);
  let request = new protocol.Request();
  request.setLoginRequest(loginReq);
  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(request.toObject()))

  // send request to backend server
  captainClient.post(request)
  .then((response)=>{
		console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
		let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
		let result = {};
		if (response.getResult() != protocol.ResultCode.SUCCESS){
			result = {...result, ...errorMsg};
  	}else{
      let data = response.getLoginResponse().toObject();
  		result = {...result, ...errorMsg, ...{data:data}};
      res.cookie(Cookies.username, data.username);
      res.cookie(Cookies.session, data.token);
      res.cookie(Cookies.userID, data.userId);
      res.cookie(Cookies.loggedIn, true);
  	}
  	console.log("send response: " + JSON.stringify(result));
  	res.json(result);
  })
  .catch(err => {
    console.log("handle response from Captain Server error: " + err);
  	let errorMsg = new ErrorMessage(protocol.ResultCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
  	console.log(errorMsg.toObject());
  	res.json(errorMsg.toObject());
  })
})

router.get(VALIDATE_TOKEN_API_PATH, (req, res) => {
  console.log("handle validate token request: " + JSON.stringify(req.cookies));
  // check input
  
  // construct login request
  let authReq = new protocol.Request.AuthenticationRequest();
  authReq.setToken(req.cookies[Cookies.session]);
  let request = new protocol.Request();
  request.setAuthenticationRequest(authReq);
  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(request.toObject()))

  // send request to backend server
  captainClient.post(request)
  .then((response)=>{
    console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
    let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
    let result = {};
    if (response.getResult() != protocol.ResultCode.SUCCESS){
      result = {...result, ...errorMsg};
      // TODO: clear cookies
      // clearCookie(req, res);
    }else{
      let data = response.getAuthenticationResponse().toObject();
      result = {...result, ...errorMsg, ...{data:data}};
      if (data.isExpired == true) {
        clearCookie(req, res);
      }
    }
    console.log("send response: " + JSON.stringify(result));
    res.json(result);
  })
  .catch(err => {
    console.log("handle response from Captain Server error: " + err);
    let errorMsg = new ErrorMessage(protocol.ResultCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
    console.log(errorMsg.toObject());
    // TODO: clear cookies
    // clearCookie(req, res);
    res.json(errorMsg.toObject());
  })
})

router.post(LOGOUT_API_PATH, (req, res) => {
  console.log("handle logout request: " + JSON.stringify(req.cookies));
  // check input
  
  // construct login request
  let logoutReq = new protocol.Request.LogoutRequest();
  logoutReq.setToken(req.cookies[Cookies.session]);
  let request = new protocol.Request();
  request.setLogoutRequest(logoutReq);
  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(request.toObject()))

  // send request to backend server
  captainClient.post(request)
  .then((response)=>{
    console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
    let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
    let result = {};
    if (response.getResult() != protocol.ResultCode.SUCCESS){
      result = {...result, ...errorMsg};
    }else{
      let data = response.getLogoutResponse().toObject();
      result = {...result, ...errorMsg, ...{data:data}};
      clearCookie(req, res);
    }
    console.log("send response: " + JSON.stringify(result));
    res.json(result);
  })
  .catch(err => {
    console.log("handle response from Captain Server error: " + err);
    let errorMsg = new ErrorMessage(protocol.ResultCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
    console.log(errorMsg.toObject());
    res.json(errorMsg.toObject());
  })
})

router.get(USER_INFO_API_PATH, (req, res) => {
  console.log("handle query user info request: " + JSON.stringify(req.cookies));
  // check input
  
  // construct login request
  let queryReq = new protocol.Request.QueryUserInfoRequest();
  queryReq.setToken(req.cookies[Cookies.session]);
  let request = new protocol.Request();
  request.setQueryUserInfoRequest(queryReq);
  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(request.toObject()))

  // send request to backend server
  captainClient.post(request)
  .then((response)=>{
    console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
    let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
    let result = {};
    if (response.getResult() != protocol.ResultCode.SUCCESS){
      result = {...result, ...errorMsg};
    }else{
      let data = response.getQueryUserInfoResponse().toObject();
      result = {...result, ...errorMsg, ...{data:data}};
    }
    console.log("send response: " + JSON.stringify(result));
    res.json(result);
  })
  .catch(err => {
    console.log("handle response from Captain Server error: " + err);
    let errorMsg = new ErrorMessage(protocol.ResultCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
    console.log(errorMsg.toObject());
    res.json(errorMsg.toObject());
  })
})

router.post(USER_INFO_API_PATH + '/:suffix', (req, res) => {
  console.log("handle update user info request(" + req.params.suffix + "): " + JSON.stringify(req.cookies));
  // check input
  
  // construct request
  let request = new protocol.Request();
  if (req.params.suffix === USERNAME_API_SUFFIX) {
    let r = new protocol.Request.UpdateUsernameRequest();
    r.setToken(req.cookies[Cookies.session]);
    r.setNewUsername(req.body.newUsername);
    request.setUpdateUsernameRequest(r);
  } else if (req.params.suffix === PHONENYM_API_SUFFIX) {
    let r = new protocol.Request.UpdatePhonenumRequest();
    r.setToken(req.cookies[Cookies.session]);
    r.setNewPhonenum(req.body.newPhonenum);
    request.setUpdatePhonenumRequest(r);
  } else if (req.params.suffix === EMAIL_API_SUFFIX) {
    let r = new protocol.Request.UpdateEmailRequest();
    r.setToken(req.cookies[Cookies.session]);
    r.setNewEmail(req.body.newEmail);
    request.setUpdateEmailRequest(r);
  } else if (req.params.suffix === PASSWORD_API_SUFFIX) {
    let r = new protocol.Request.UpdatePasswordRequest();
    r.setToken(req.cookies[Cookies.session]);
    r.setOldPassword(req.body.oldPassword);
    r.setNewPassword(req.body.newPassword);
    request.setUpdatePasswordRequest(r);
  }else if (req.params.suffix === ADD_ADDRESS_API_SUFFIX) {
    console.log("========add address ===========");
    let r = new protocol.Request.AddUserAddressRequest();
    r.setToken(req.cookies[Cookies.session]);
    r.setRecipientsName(req.body.recipientsName);
    r.setRecipientsPhone(req.body.recipientsPhone);
    r.setRecipientsAddress(req.body.recipientsAddress);
    request.setAddUserAddressRequest(r);
  }else if (req.params.suffix === UPDATE_ADDRESS_API_SUFFIX) {
    console.log("========update address ===========");
    let r = new protocol.Request.UpdateUserAddressRequest();
    r.setToken(req.cookies[Cookies.session]);
    r.setId(req.body.id);
    r.setRecipientsName(req.body.recipientsName);
    r.setRecipientsPhone(req.body.recipientsPhone);
    r.setRecipientsAddress(req.body.recipientsAddress);
    request.setUpdateUserAddressRequest(r);
  }else {
    console.log("ERROR: not supported path " + USER_INFO_API_PATH + req.params.suffix);
  }

  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(request.toObject()))

  // send request to backend server
  captainClient.post(request)
  .then((response)=>{
    // console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
    let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
    let result = {...errorMsg};
    console.log("send response: " + JSON.stringify(result));
    res.json(result);
  })
  .catch(err => {
    console.log("handle response from Captain Server error: " + err);
    let errorMsg = new ErrorMessage(protocol.ResultCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
    console.log(errorMsg.toObject());
    res.json(errorMsg.toObject());
  })
})

export default router