var jwt = require('../index');
var expect = require('chai').expect;
var path = require('path');
var assert = require('chai').assert;
var BasicIdToken = require('../node_modules/tokenProfiles/basicIdToken');
var decode = require('../node_modules/jsonwebtoken/decode');
var jwt = require('../node_modules/jsonwebtoken');
/*
describe('iat', function () {

  it('should work with a exp calculated based on numeric iat', function (done) {
    var dateNow = Math.floor(Date.now() / 1000);
    var iat = dateNow - 30;
    var expiresIn = 50;
    var basicIdToken = new BasicIdToken('issuer','subject', 'audience', iat, iat + expiresIn, 10, "test");
    var signedJWT = basicIdToken.toJWT('shhhh');

    try{
      var verificationClaims = {'iss': 'issuer','sub' : 'subject', 'aud' : 'audience', 'maxAge': '1d', 'clockTolerance' : 10, 'jti': 'test'};
      var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, {algorithms: ['HS256']});
    
      console.log(decodedPayload);
      expect(decodedPayload.exp).to.be.closeTo(iat + expiresIn, 0.2);
      
    }catch(err){
      console.log(err);
      assert.isNotNull(decodedPayload);
      assert.isNull(err);
    }
    done();
  });
});*/

