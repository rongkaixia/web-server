
import Express from 'express';
import BodyParser from 'body-parser';
import CaptainClient from './helpers/CaptainClient';
import ErrorMessage from './error';
import Cookies from './cookies';
const protocol = require('../lib/protocol/com.echo.protocol_pb')
const captainClient = new CaptainClient();

const SIGNUP_API_PATH = "/signup";
const LOGIN_API_PATH = "/login";

function checkPassword(password){
	return true
}

function checkPhonenum(phonenum){
	return true
}

let router = Express.Router();
router.use(BodyParser.json()); // for parsing application/json
router.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.post(SIGNUP_API_PATH, (req, res) => {
  console.log("handle signup request: " + req.body);
  // check input
  
  // construct signup request
  let signupReq = new protocol.Request.SignupRequest();
  signupReq.setPhonenum(req.body.username);
  signupReq.setPassword(req.body.password);
  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(signupReq.toObject()))

  // send request to backend server
  captainClient.post(SIGNUP_API_PATH, signupReq)
  .then((response)=>{
		console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
		let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
		let result = {};
		if (response.getResult() != protocol.ResultCode.SUCCESS){
			result = {...result, ...errorMsg};
  	}else{
  		result = {...result, ...errorMsg, ...response.getSignupResponse().toObject()};
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
  console.log("send request to Captain Server")
  console.log("request: " + JSON.stringify(loginReq.toObject()))

  // send request to backend server
  captainClient.post(LOGIN_API_PATH, loginReq)
  .then((response)=>{
		console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()))
		let errorMsg = new ErrorMessage(response.getResult(), response.getErrorDescription()).toObject();
		let loginRes = response.getLoginResponse().toObject();
		let result = {};
		if (response.getResult() != protocol.ResultCode.SUCCESS){
			result = {...result, ...errorMsg};
  	}else{
  		result = {...result, ...errorMsg, ...loginRes};
  	}
  	console.log("send response: " + JSON.stringify(result));
  	res.cookie(Cookies.username, req.body.username);
  	res.cookie(Cookies.session, loginRes.token);
  	res.cookie(Cookies.loggedIn, true);
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