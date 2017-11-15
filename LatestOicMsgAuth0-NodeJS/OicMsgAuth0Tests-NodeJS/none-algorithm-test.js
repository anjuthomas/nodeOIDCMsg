var jwt = require('../index');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var assert = require('chai').assert;
var ms = require('ms');
var BasicIdToken = require('../node_modules/tokenProfiles/basicIdToken');
var decode = require('../node_modules/jsonwebtoken/decode');
var jwt = require('../node_modules/jsonwebtoken');

function loadKey(filename) {
  return fs.readFileSync(path.join(__dirname, filename));
}

describe('Asymmetric Algorithms', function(){

  /*
      describe('when signing a token with none algorithm', function () {
        var clockTimestamp = 1000000000;
        
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 2, clockTimestamp + 3, "jti");
        basicIdToken.setNoneAlgorithm(true);
        var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'none'});
        
        
        it('should check if explicitly set', function (done) {
          try{
            var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh',  {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {}, {algorithms: ['none']});
            assert.isNotNull(decodedPayload);            
          }catch(err){
            console.log(err);
            console.log("____________________");
            assert.isNull(err);
          }
          done();
        });
      });    */
      
      describe('when signing a token with none algorithm', function () {
        it('should throw if none algorithm not set by choice', function (done) {
          try{
            var clockTimestamp = 1000000000;
            
            var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
            var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'none'});
          }catch(err){
              assert.isNotNull(err);
          }
          done();
        });
      });  
    
    
  
});
