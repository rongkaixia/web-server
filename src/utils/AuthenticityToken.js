let jwt = require('jsonwebtoken');

// Authenticity Token expire time, seconds
const TIME_LIMIT = 30;
const SECRET_KEY = '7trRhA482C4Nrs0R7UxMwXl2HnVyEHd9';
const VALIDATE_RESULT = {SUCCESS: 'SUCCESS', INVALID_TOKEN: 'INVALID_TOKEN', TOKEN_EXPIRED: 'TOKEN_EXPIRED'};
const PADDING = '##<IDS'

// export VALIDATE_RESULT
// define csrf token function
function generateCsrfToken() {
  let randomNum = jwt.sign(Math.random(), SECRET_KEY);
  let playload = {random: randomNum};
  if (TIME_LIMIT) {
    Object.assign(playload, {expires: new Date(Date.now() + TIME_LIMIT * 1000).getTime()});
  }
  console.log('generateCsrfToken playload: ' + playload);
  let token = jwt.sign(playload, SECRET_KEY);
  console.log('generateCsrfToken token: ' + token);
  return randomNum + PADDING + token;
}

function validateCsrfToken(authKey) {
  try {
    let data = authKey.split(PADDING);
    let randomNum = data[0];
    let token = data[1];
    let playload = jwt.verify(token, SECRET_KEY);
    if (!playload.random || playload.random !== randomNum) {
      return VALIDATE_RESULT.INVALID_TOKEN;
    }
    if (TIME_LIMIT) {
      let currentTime = Date.now();
      let expires = playload.expires;
      console.log('currentTime: ' + currentTime);
      console.log('expires: ' + expires);
      if (expires < currentTime) {
        return VALIDATE_RESULT.TOKEN_EXPIRED;
      }
    }
    return VALIDATE_RESULT.SUCCESS;
  } catch (error) {
    return VALIDATE_RESULT.INVALID_TOKEN;
  }
}

module.exports = {
  generateCsrfToken: generateCsrfToken,
  validateCsrfToken: validateCsrfToken,
  VALIDATE_RESULT: VALIDATE_RESULT
}
