var jwt = require('../index');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var assert = require('chai').assert;
var ms = require('ms');

var BasicIdToken = require('../node_modules/src/models/tokenProfiles/basicIdToken');
//var decode = require('../node_modules/jsonwebtoken/decode');
//var jwt = require('../node_modules/jsonwebtoken');

function loadKey(filename) {
  return fs.readFileSync(path.join(__dirname, filename));
}

var algorithms = {
  RS256: {
    pub_key: loadKey('pub.pem'),
    priv_key: loadKey('priv.pem'),
    invalid_pub_key: loadKey('invalid_pub.pem')
  },
  ES256: {
    // openssl ecparam -name secp256r1 -genkey -param_enc explicit -out ecdsa-private.pem
    priv_key: loadKey('ecdsa-private.pem'),
    // openssl ec -in ecdsa-private.pem -pubout -out ecdsa-public.pem
    pub_key: loadKey('ecdsa-public.pem'),
    invalid_pub_key: loadKey('ecdsa-public-invalid.pem')
  }
};

describe('Asymmetric Algorithms', function(){

  Object.keys(algorithms).forEach(function (algorithm) {
    describe(algorithm, function () {
      var clockTimestamp = 1000000000;
      
      var pub = algorithms[algorithm].pub_key;
      var priv = algorithms[algorithm].priv_key;

      describe('when signing a token with a known non standard claim', function () {
        var basicIdToken2 = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
        basicIdToken2.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
        basicIdToken2.setNoneAlgorithm(true);
        var signedJWT = basicIdToken2.toJWT('shhhh');

        it('should check known non standard claim', function (done) {
          try{
            var decodedPayload = basicIdToken2.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{'clockTimestamp' : clockTimestamp});
            assert.isNotNull(decodedPayload);
            done();            
          }catch(err){
            assert.isNull(err);
            done();
          }

        it('should throw when invalid known non standard claim', function (done) {
         
          try{
            var decodedPayload = basicIdToken2.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "wrong-audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});
          }catch(err){
            assert.isNotNull(err);
            done();
          }
        });
      });
    });
       
  
      describe('when signing a token without standard claim', function () {
        it('should throw error and require standard claim', function (done) {
          try{
            var basicIdToken = new BasicIdToken('issuer','subject');
            basicIdToken.addNonStandardClaims({"jti" : "test"});
            basicIdToken.setNoneAlgorithm(true);
            var signedJWT = basicIdToken.toJWT('shhhh');
          }catch(err){
            assert.isNotNull(err);
            assert.instanceOf(err, Error);
            done();
          }
        });
      });

    describe('when adding claims to token profile', function () {
      var dateNow = Math.floor(Date.now() / 1000);
      var iat = dateNow - 30;
      var expiresIn = 50;
      var clockTimestamp = 1000000000;

      var basicIdToken2 = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
      basicIdToken2.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
      basicIdToken2.setNoneAlgorithm(true);        

      it('should be able to access all standard claims', function (done) {
        try{
         var standardClaims = basicIdToken2.getStandardClaims();  
         assert.deepEqual(standardClaims, { "iss" : "issuer", "sub" : 'subject',  "iat" : clockTimestamp,"jti" : "jti"})          
        }catch(err){
          assert.isNull(err);
        }
        done();
      });

      it('should be able to access non standard claims separately', function (done) {
          try{
           var nonStandardClaims = basicIdToken2.getNonStandardClaims();  
           assert.deepEqual(nonStandardClaims, {"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3})          
          }catch(err){
            assert.isNull(err);
          }
          done();
        });
    });      

    describe('when signing a token with standard claim', function () {
      var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, 'jti');
      basicIdToken.setNoneAlgorithm(true);
      var signedJWT = basicIdToken.toJWT('shhhh');

      it('should check standard claim', function (done) {
      
        try{
          var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});
        }catch(err){
          assert.isNotNull(decodedPayload);
          assert.isNull(err);
        }
        done();
      });

      
      it('should throw when invalid standard claim', function (done) {
        try{
          var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "wrong-issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});
        }catch(err){

          assert.isNotNull(err);
          assert.equal(err.name, 'JsonWebTokenError');
          done();
        }
      });
    }); 
  });
});
}); 

