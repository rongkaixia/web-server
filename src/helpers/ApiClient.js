import superagent from 'superagent';
// import unirest from 'unirest';
import config from '../config';
import ErrorMessage from '../error';
const protocol = require('../../lib/protocol/com.echo.protocol_pb')

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    console.log("sever");
    return 'http://' + config.host + ':' + config.port + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  // return '/api' + adjustedPath;
  return adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class CApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        // request.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        // request.set('Access-Control-Allow-Credentials', 'true');
        // const request = superagent.agent()[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          // console.log(req);
          console.log("=========cookie========")
          console.log(req.get('cookie'))
          request.set('cookie', req.get('cookie'));
        }
        // else if (document && document.cookie) {
        //   request.set('cookie', document.cookie);
        // }

        if (data) {
          request.send(data);
        }

        // request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
        // unirest
        // request.end(response => {
        //   console.log(response.body);
        //   let body = response.body;
        //   console.log(typeof(body));
        //   if (body && body.errorCode) {
        //     console.log('reject');
        //     reject(body);
        //   }else {
        //     resolve(body);
        //   }
        // })
        // superagent
        request.end((err, { body } = {}) => {
          if (err) {
            console.log("ApiClient recieve error: " + err);
            let errorMsg = new ErrorMessage(protocol.ResultCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR");
            reject(errorMsg);
          }
          if (body && body.errorCode) {
            reject(body);
          }else {
            resolve(body);
          }
        })
      }));
  }
}

const ApiClient = CApiClient;

export default ApiClient;
