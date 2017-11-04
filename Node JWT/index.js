module.exports = {
  decode: require('./decode'),
  verify: require('./verify'),
  sign: require('./sign'),
  JsonWebTokenError: require('./lib/JsonWebTokenError'),
  NotBeforeError: require('./lib/NotBeforeError'),
  TokenExpiredError: require('./lib/TokenExpiredError'),
};

var fs = require('fs');
var FacebookToken = require('./facebookToken');
// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');

var Message = require('./message');

/* var messageFactory = new Message();
var jwtObj = messageFactory.format(messageFactory.SERIALIZATION_TYPE.JWT);
jwtObj.sign({ foo: 'bar' }, "shhh", {audience : 'aud', issuer: 'urn:foo', }) */ 

//backdate a jwt 30 seconds
var fbToken = new FacebookToken('bacon','accounts.fake.com', 123);
fbToken.addNonStandardClaims({"gender" : "female"});
var tokentest = jwt.sign(fbToken, 'shhhhh');


console.log("***** Verify token with no change ****")
// verify issuer
var modifiedFbToken = new FacebookToken('bacon','accounts.fake.com', 123);

jwt.verify(tokentest, 'shhhhh', modifiedFbToken, function(err, decoded) {
  if (err){
    console.log(err);
  }else{
    console.log("No change found. Verified.")
  }
});


