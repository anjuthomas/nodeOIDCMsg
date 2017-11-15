var jwt = require('../index');
var expect = require('chai').expect;
var path = require('path');
var assert = require('chai').assert;
var BasicIdToken = require('../node_modules/tokenProfiles/basicIdToken');
var decode = require('../node_modules/jsonwebtoken/decode');
var jwt = require('../node_modules/jsonwebtoken');

describe('iat', function () {

  it('should work with a exp calculated based on numeric iat', function (done) {
    var dateNow = Math.floor(Date.now() / 1000);
    var iat = dateNow - 30;
    var expiresInVal = 50;
    var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
    basicIdToken.addNonStandardClaims({"aud" : "audience"});
    var signedJWT = basicIdToken.toJWT('shhhh', {expiresIn: expiresInVal});

    try{
      var verificationClaims = {'iss': 'issuer','sub' : 'subject', 'aud' : 'audience', 'maxAge': '1d', 'jti': 'jti'};
      var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, {algorithms: ['HS256']});
    
      console.log(decodedPayload);
      expect(decodedPayload.exp).to.be.closeTo(iat + expiresInVal, 0.2);
      
    }catch(err){
      assert.isNotNull(decodedPayload);
      assert.isNull(err);
    }
    done();
  });
});

