import superagent from 'superagent';
// import unirest from 'unirest';
import config from '../config';
const protocol = require('../../lib/protocol/com.echo.protocol_pb')

const methods = ['get', 'post', 'put', 'patch', 'del'];

class CaptainClient {
  constructor(){
    this.host = 'http://' + config.captainHost + ':' + config.captainPort;

    this.loginPath = "/login";
    this.signupPath = "/signup";
    this.logoutPath = "/logout";
    this.authPath = "/auth";
    this.apiPath = [this.signupPath, this.loginPath, this.logoutPath, this.authPath];
  }

  serialize(req, type){
    let self = this;
    let request = new protocol.Request();
    if (type == this.loginPath){
      request.setLoginRequest(req);
    }else if(type == this.signupPath){
      request.setSignupRequest(req);
    }else if(type == this.authPath){
      request.setAuthenticationRequest(req);
    }else if(type == this.logoutPath){
      request.setLogoutRequest(req);
    }else{
      throw new Error("invalid request");
    }
    let message = new protocol.Message();
    message.setRequest(request);
    if (process.env.NODE_ENV !== 'production')
      console.log("packed message: " + JSON.stringify(message.toObject()));
    let bytes = message.serializeBinary();
    let buffer = Buffer(bytes.length);
    for (let i=0, strLen=bytes.length; i<strLen; i++) {
      buffer[i] = bytes[i];
    }
    return buffer;
  }

  deserialize(stringMessage){
    if (process.env.NODE_ENV !== 'production')
      console.log("deserializing msg: " + stringMessage);
    let buffer = new Buffer(stringMessage, 'binary');
    let uint8Data = new Uint8Array(buffer);
    if (process.env.NODE_ENV !== 'production')
      console.log("deserialized uint8Data: " + uint8Data);
    let msg = protocol.Message.deserializeBinary(uint8Data);
    return msg.getResponse();
  }

  post = (path, data = {}) => new Promise((resolve, reject) => {
    let self = this;
    let request = {};
    let msg = {};
    try{
      const adjustedPath = path[0] !== '/' ? '/' + path : path;
      console.log("recieve request: path = " + path + ", data = " + JSON.stringify(data.toObject()));
      request = superagent["post"](self.host + adjustedPath);
      msg = self.serialize(data, adjustedPath);
      if (process.env.NODE_ENV !== 'production') {
        console.log("serialized msg: " + JSON.stringify(msg));
      }
    }catch(err){
      reject(err);
    }
    request.write(msg);
    request.end((err,res) => {
      if (err){
        console.log("CaptainClient error: " + err);
        reject(err);
        return;
      }
      res.setEncoding('binary');
      res.data = '';
      res.on('data', function (chunk) {
          res.data += chunk;
      });
      res.on('end', function () {
        let response = {};
        try{
          response = self.deserialize(res.data)
        }catch(err){
          reject(err);
        }
        // console.log("recieve response from Captain Server: " + JSON.stringify(response.toObject()));
        resolve(response);
      })
    })
  })//post
}

export default CaptainClient;
