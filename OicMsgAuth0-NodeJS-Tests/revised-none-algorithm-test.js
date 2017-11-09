var jwt = require('../index');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var assert = require('chai').assert;
var ms = require('ms');
var BasicIdToken = require('../basicIdToken');
var decode = require('../decode');

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

      describe('when signing a token with none algorithm', function () {
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);
        var tokentest = jwt.sign(basicIdToken, 'shhhhh', {algorithm : 'none'});

        it('should check if explicitly set', function (done) {
          var modifiedBasicIdToken = new BasicIdToken('issuer','subject', 'audience');
          modifiedBasicIdToken.addNonStandardClaims({"jti" : "test"});
          var decodedToken = decode(tokentest,'shhhhh', modifiedBasicIdToken, {algorithms: ['none']}, function(err, decoded) {
            console.log(decoded)
            console.log(err.message);
            assert.isNotNull(decoded);
            assert.isNull(err);
          });
          done();
        });
      });      
      /*
      describe('when signing a token without standard claim', function () {
        it('should throw error and require standard claim', function (done) {
          try{
            var basicIdToken = new BasicIdToken('issuer','subject');
            basicIdToken.addNonStandardClaims({"jti" : "test"});
            basicIdToken.setNoneAlgorithm(true);
            var tokentest = jwt.sign(basicIdToken, 'shhhhh');
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
        var tokentest = jwt.sign(basicIdToken, 'shhhhh');

        it('should check known non standard claim', function (done) {
          var modifiedBasicIdToken = new BasicIdToken('issuer','subject', 'audience');
          modifiedBasicIdToken.addNonStandardClaims({"jti" : "test"});
          var decodedToken = decode(tokentest,'shhhhh', modifiedBasicIdToken, function(err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
          });
          done();
        });

        it('should throw when invalid known non standard claim', function (done) {
          var modifiedBasicIdToken = new BasicIdToken('issuer','subject', 'audience');
          modifiedBasicIdToken.addNonStandardClaims({"jti" : "testing"});
          try{
            var decodedToken = decode(tokentest,'shhhhh', modifiedBasicIdToken, function(err, decoded) {});
          }catch(err){
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          }
        });
      });*/
    });
  });
});
