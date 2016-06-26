
import Express from 'express';
import BodyParser from 'body-parser';
import ErrorMessage from '../error';
import CookieParser from 'cookie-parser';
import {validateCsrfToken, VALIDATE_RESULT} from 'utils/AuthenticityToken'
import Cookies from '../cookies';
const protocol = require('../../lib/protocol/com.echo.protocol_pb')

let router = Express.Router();
router.use(BodyParser.json()); // for parsing application/json
router.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(CookieParser())

export default function FormAuthenticator(req, res, next) {
  // get auth key
  console.log("FormAuthenticator");
  let authKey = req.body.authKey;
  if (!authKey) {
  	let errorMsg = new ErrorMessage(protocol.ResultCode.INVALID_FROM_TOKEN, 'invalid authenticity key');
    res.json(errorMsg.toObject());
    return;
  }
  console.log("authKey: " + authKey);

  // get user session
  let playload = {};
  if (req && req.cookies && req.cookies[Cookies.session]) {
    playload[Cookies.session] = req.cookies[Cookies.session];
  }
  let valid = validateCsrfToken(authKey, playload);
  if (valid == VALIDATE_RESULT.INVALID_TOKEN) {
    console.log('invalid authenticity key');
  	let errorMsg = new ErrorMessage(protocol.ResultCode.INVALID_FROM_TOKEN, 'invalid authenticity key');
    res.json(errorMsg.toObject());
    return;
  }
  if (valid == VALIDATE_RESULT.TOKEN_EXPIRED) {
    console.log('authenticity key expired');
  	let errorMsg = new ErrorMessage(protocol.ResultCode.EXPIRED_FROM_TOKEN, 'invalid authenticity key');
    res.json(errorMsg.toObject());
    return;
  }
  console.log('authenticity key passed');
  next();
}