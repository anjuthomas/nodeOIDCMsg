var JsonWebTokenError = require('./lib/JsonWebTokenError');
var NotBeforeError    = require('./lib/NotBeforeError');
var TokenExpiredError = require('./lib/TokenExpiredError');
var decode            = require('./decode');
var timespan          = require('./lib/timespan');
var jws               = require('jws');
var xtend             = require('xtend');

module.exports = function (jwtSig, secretOrPublicKey, tokenProfile, options, callback) {
  //options = options || {};
  var otherOptions = options;
  options = tokenProfile.getStandardClaims();
  if ((typeof options === 'function') && !callback) {
    callback = options;
    options = {};
  }

  if (!options) {
    options = {};
  }

  //clone this object since we are going to mutate it.
  options = xtend(options);
  var done;
  
    if (callback) {
      done = callback;
    } else {
      done = function(err, data) {
        if (err) throw err;
        return data;
      };
    }

  var decoded = jws.decode(jwtSig, secretOrPublicKey, tokenProfile, callback, otherOptions);
  if (!decoded) { return null; }
  var payload = decoded.payload;

  //try parse the payload
  if(typeof payload === 'string') {
    try {
      var obj = JSON.parse(payload);
      if(typeof obj === 'object') {
        payload = obj;
      }
    } catch (e) { }
  }

  if (typeof payload.nbf !== 'undefined' && !options.ignoreNotBefore) {
    if (typeof payload.nbf !== 'number') {
      return done(new JsonWebTokenError('invalid nbf value'));
    }
    if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
      return done(new NotBeforeError('jwt not active', new Date(payload.nbf * 1000)));
    }
  }

  if (typeof payload.exp !== 'undefined' && !options.ignoreExpiration) {
    if (typeof payload.exp !== 'number') {
      return done(new JsonWebTokenError('invalid exp value'));
    }
    if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
      return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));
    }
  }

  Object.keys(tokenProfile.options_to_payload).forEach(function (key) {
    var claim = tokenProfile.options_to_payload[key];
    if (options[key]) {
      if (payload[claim] != options[key]) {
        return done(new JsonWebTokenError('jwt option invalid. expected: ' + options[key]));
      }
    }
  });
  
  if (options.jwtid) {
    if (payload.jti !== options.jwtid) {
      return done(new JsonWebTokenError('jwt jwtid invalid. expected: ' + options.jwtid));
    }
  }

  if (options.maxAge) {
    if (typeof payload.iat !== 'number') {
      return done(new JsonWebTokenError('iat required when maxAge is specified'));
    }

    var maxAgeTimestamp = timespan(options.maxAge, payload.iat);
    if (typeof maxAgeTimestamp === 'undefined') {
      return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
    }
    if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
      return done(new TokenExpiredError('maxAge exceeded', new Date(maxAgeTimestamp * 1000)));
    }
  }


  //return header if `complete` option is enabled.  header includes claims
  //such as `kid` and `alg` used to select the key within a JWKS needed to
  //verify the signature
  if (options.complete === true) {
    return {
      header: decoded.header,
      payload: payload,
      signature: decoded.signature
    };
  }
  
  return payload;
};
