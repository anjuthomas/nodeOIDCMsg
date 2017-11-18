var fs = require('fs');
var path = require('path');
var jwt = require('../index');
//var JsonWebTokenError = require('../lib/JsonWebTokenError');
var expect = require('chai').expect;
var JsonWebTokenError = require('../node_modules/src/controllers/messageTypes/jwt/jsonwebtoken/lib/JsonWebTokenError');
var BasicIdToken = require('../node_modules/src/models/tokenProfiles/basicIdToken');

var assert = require('chai').assert;

var pub = fs.readFileSync(path.join(__dirname, 'pub.pem'), 'utf8');
// priv is never used
// var priv = fs.readFileSync(path.join(__dirname, 'priv.pem'));

var TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0MjY1NDY5MTl9.';

describe('when setting a wrong `header.alg`', function () {
  var clockTimestamp = 1000000000;
  
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'HS256'});
  
  describe('signing with pub key as HS256 and whitelisting only RS256', function () {
    it('should not verify', function (done) {

      try{
        var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{algorithm: 'HS256', 'clockTimestamp' : clockTimestamp});
        assert.isNotNull(decodedPayload);
        done();            
      }catch(err){
        console.log(err)
        assert.isNotNull(err);
        done();
      }
    });
  });

  describe('signing with HS256 and checking with HS384', function () {
    it('should not verify', function (done) {
      try{
        var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{algorithm: 'HS384', 'clockTimestamp' : clockTimestamp});
        assert.isNotNull(decodedPayload);
        done();            
      }catch(err){
        console.log(err)
        assert.isNotNull(err);
        done();
      }
    });
  });


});
