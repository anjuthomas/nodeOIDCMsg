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
      var pub = algorithms[algorithm].pub_key;
      var priv = algorithms[algorithm].priv_key;

      describe('when signing a token with standard claim', function () {
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);
        var signedJWT = basicIdToken.toJWT('shhhh');

        it('should check standard claim', function (done) {
          var verificationToken = new BasicIdToken('issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "test"});
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh');
          }catch(err){
            console.log(done);
            assert.isNotNull(decodedPayload);
            assert.isNull(err);
          }
          done();
        });

        
        it('should throw when invalid standard claim', function (done) {
          var verificationToken = new BasicIdToken('wrong-issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "test"});
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh');
          }catch(err){
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            done();
          }
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

      describe('when signing a token with a known non standard claim', function () {
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);
        var signedJWT = basicIdToken.toJWT('shhhh');

        it('should check known non standard claim', function (done) {
          var verificationToken = new BasicIdToken('issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "test"});
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh');
            done();
          }catch(err){
            assert.isNotNull(decodedPayload);
            assert.isNull(err);
            done();
          }

        it('should throw when invalid known non standard claim', function (done) {
          var verificationToken = new BasicIdToken('issuer','subject', 'audience');
          verificationToken.addNonStandardClaims({"jti" : "wrong-val"});
          try{
            var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh');
          }catch(err){
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          }
        });
      });
    });
  });
});
});
