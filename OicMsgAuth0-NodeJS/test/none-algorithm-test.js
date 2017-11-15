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
/*
describe('Asymmetric Algorithms', function(){

      describe('when signing a token with none algorithm', function () {
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);
        var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'none'});
        
        
        it('should check if explicitly set', function (done) {
          var verificationToken = new BasicIdToken('issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "test"});
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh', {algorithms: ['none']});
            assert.isNotNull(decodedPayload);            
          }catch(err){
            assert.isNull(err);
          }
          done();
        });
      });      
      
      describe('when signing a token with none algorithm', function () {
        it('should throw if none algorithm not set by choice', function (done) {
          try{
            var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
            basicIdToken.addNonStandardClaims({"jti" : "test"});
            basicIdToken.setNoneAlgorithm(false);        
            var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'none'});
          }catch(err){
            assert.isNotNull(err);
          }
          done();
        });
      });  
    
    
  
});*/
