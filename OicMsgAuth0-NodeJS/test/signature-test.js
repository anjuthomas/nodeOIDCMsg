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

    describe('when signing a token with incorrect secret', function () {
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);
        var signedJWT = basicIdToken.toJWT('wrong-secret');
        
        it('should throw invalid signature error', function () {
          var verificationToken = new BasicIdToken('issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "test"});
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'secret');
          }catch(err){
            console.log(err)            
            assert.isNotNull(err);
            
          }
        });
      });      

      describe('when signing a token with empty signature', function () {
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);
        var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'none'});
        

        it('should throw with secret and token not signed', function (done) {
          var verificationToken = new BasicIdToken('issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "test"});
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh', {algorithms: ['none']});
          }catch(err){
            console.log(err)            
            assert.isNotNull(err);
          }
          done();
        });
      });      
      
      describe('when signing a token with empty signature', function () {
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);
        var signedJWT = basicIdToken.toJWT(null, {algorithm : 'none'});
        

        it('should throw with falsy secret and token not signed', function (done) {
          var verificationToken = new BasicIdToken('issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "test"});
          verificationToken.setNoneAlgorithm(true);
          
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh', {algorithms: ['none']});
          }catch(err){
            console.log(err)
            assert.isNotNull(err);
          }
          done();
        });

        it('should work with no secret and token not signed', function (done) {
            var verificationToken = new BasicIdToken('issuer','subject', 'audience');
            verificationToken.addNonStandardClaims({"jti" : "test"});
            verificationToken.setNoneAlgorithm(true);
            try{
              var decodedPayload = verificationToken.fromJWT(signedJWT, null, {algorithms: ['none']});
            }catch(err){
              console.log(err)                
              assert.isNull(err);
            }
            done();
          });
      });  
});
