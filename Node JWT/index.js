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
var jwt = require('jsonwebtoken');
var Message = require('./message');

/* var messageFactory = new Message();
var jwtObj = messageFactory.format(messageFactory.SERIALIZATION_TYPE.JWT); */ 

//Create a facebook token and add non standard claims
var fbToken = new FacebookToken('bacon','accounts.fake.com', 123);
fbToken.addNonStandardClaims({"gender" : "female"});
fbToken.setNoneAlgorithm(true);

// Sign usign facebook token
var tokentest = jwt.sign(fbToken, 'shhhhh');

// Verify using facebook token
var modifiedFbToken = new FacebookToken('bacon','accounts.fake.com', 123);

jwt.verify(tokentest, 'shhhhh', modifiedFbToken, function(err, decoded) {
  if (err){
    console.log(err);
  }else{
    console.log("No change found. Verified.")
  }
});


