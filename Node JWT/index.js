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
var jws = require('jws');
var decode = require('./decode');

/* var messageFactory = new Message();
var jwtObj = messageFactory.format(messageFactory.SERIALIZATION_TYPE.JWT);
jwtObj.sign({ foo: 'bar' }, "shhh", {audience : 'aud', issuer: 'urn:foo', }) */ 

//Create a token profile and sign the jwt
var fbToken = new FacebookToken('bacon','accounts.fake.com', 123);
fbToken.addNonStandardClaims({"gender" : "female", "iat" : 0.001});
fbToken.setNoneAlgorithm(true);
var tokentest = jwt.sign(fbToken, 'shhhhh');

var modifiedFbToken = new FacebookToken('bacon','accounts.fake.com', 123);
modifiedFbToken.addNonStandardClaims({"gender" : "male", "iat" : 0.001});

// Decode a JWT using a modified token and it should verify
var decodedToken;
decodedToken = decode(tokentest,'shhhhh', modifiedFbToken, function(err, decoded) {
  if (err){
    console.log(err);
    return;
  }else{
    console.log("No change found. Verified.")
  }
});
  
console.log(decodedToken);
/*
var token = jwt.sign({foo: 'bar'}, 'secret', {algorithm: 'HS256'});
jwt.verify(token, 'some secret', {algorithms: ['HS384']}); */ 

// verify issuer
/*var modifiedFbToken = new FacebookToken('bacon','accounts.fake.com', 123);

jwt.verify(tokentest, 'shhhhh', modifiedFbToken, function(err, decoded) {
  if (err){
    console.log(err);
  }else{
    console.log("No change found. Verified.")
  }
});*/