var jwt = require('../index');
var fs = require('fs');
var path = require('path');

var expect = require('chai').expect;
var assert = require('chai').assert;
var ms = require('ms');

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

      describe('when signing a token with audience', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm, audience: 'urn:foo' });

        it('should check audience', function (done) {
          jwt.verify(token, pub, { audience: 'urn:foo' }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check audience using RegExp', function (done) {
          jwt.verify(token, pub, { audience: /urn:f[o]{2}/  }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check audience in array', function (done) {
          jwt.verify(token, pub, { audience: ['urn:foo', 'urn:other'] }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check audience in array using RegExp', function (done) {
          jwt.verify(token, pub, { audience: ['urn:bar', /urn:f[o]{2}/, 'urn:other'] }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should throw when invalid audience', function (done) {
          jwt.verify(token, pub, { audience: 'urn:wrong' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('should throw when invalid audience using RegExp', function (done) {
          jwt.verify(token, pub, { audience: /urn:bar/ }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('should throw when invalid audience in array', function (done) {
          jwt.verify(token, pub, { audience: ['urn:wrong', 'urn:morewrong', /urn:bar/] }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

      });

      describe('when signing a token with array audience', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm, audience: ['urn:foo', 'urn:bar'] });

        it('should check audience', function (done) {
          jwt.verify(token, pub, { audience: 'urn:foo' }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check other audience', function (done) {
          jwt.verify(token, pub, { audience: 'urn:bar' }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check audience using RegExp', function (done) {
          jwt.verify(token, pub, { audience: /urn:f[o]{2}/ }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check audience in array', function (done) {
          jwt.verify(token, pub, { audience: ['urn:foo', 'urn:other'] }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check audience in array using RegExp', function (done) {
          jwt.verify(token, pub, { audience: ['urn:one', 'urn:other', /urn:f[o]{2}/] }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should throw when invalid audience', function (done) {
          jwt.verify(token, pub, { audience: 'urn:wrong' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('should throw when invalid audience using RegExp', function (done) {
          jwt.verify(token, pub, { audience: /urn:wrong/ }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('should throw when invalid audience in array', function (done) {
          jwt.verify(token, pub, { audience: ['urn:wrong', 'urn:morewrong'] }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('should throw when invalid audience in array', function (done) {
          jwt.verify(token, pub, { audience: ['urn:wrong', 'urn:morewrong', /urn:alsowrong/] }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

      });

      describe('when signing a token without audience', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm });

        it('should check audience', function (done) {
          jwt.verify(token, pub, { audience: 'urn:wrong' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('should check audience using RegExp', function (done) {
          jwt.verify(token, pub, { audience: /urn:wrong/ }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('should check audience in array', function (done) {
          jwt.verify(token, pub, { audience: ['urn:wrong', 'urn:morewrong', /urn:alsowrong/] }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });

        it('does not complain when standard claim is not provided while signing or verifying', function (done) {
          jwt.verify(token, pub, {}, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });
      });

      describe('when signing a token with issuer', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm, issuer: 'urn:foo' });

        it('should check issuer', function (done) {
          jwt.verify(token, pub, { issuer: 'urn:foo' }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should check the issuer when providing a list of valid issuers', function (done) {
          jwt.verify(token, pub, { issuer: ['urn:foo', 'urn:bar'] }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should throw when invalid issuer', function (done) {
          jwt.verify(token, pub, { issuer: 'urn:wrong' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });
      });

      describe('when signing a token without issuer', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm });

        it('should check issuer', function (done) {
          jwt.verify(token, pub, { issuer: 'urn:foo' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });
      });

      describe('when signing a token with subject', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm, subject: 'subject' });

        it('should check subject', function (done) {
          jwt.verify(token, pub, { subject: 'subject' }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should throw when invalid subject', function (done) {
          jwt.verify(token, pub, { subject: 'wrongSubject' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });
      });

      describe('when signing a token without subject', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm });

        it('should check subject', function (done) {
          jwt.verify(token, pub, { subject: 'subject' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });
      });

      describe('when signing a token with jwt id', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm, jwtid: 'jwtid' });

        it('should check jwt id', function (done) {
          jwt.verify(token, pub, { jwtid: 'jwtid' }, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });

        it('should throw when invalid jwt id', function (done) {
          jwt.verify(token, pub, { jwtid: 'wrongJwtid' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            assert.instanceOf(err, jwt.JsonWebTokenError);
            done();
          });
        });
      });

       /* Does not validate signature by default */
       describe('when signing a token with algorithm none', function () {
        var token = jwt.sign({ foo: 'bar' }, null, { algorithm: 'none' });
        
        it('should throw error without verifying', function (done) {
          var payload = jwt.decode(token);
          assert.isNotNull(payload);
          done();
        });
      });


      /** Non standard claims not supported */
      describe('when signing a token with a non standard claim', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm, nonstandardClaim: 'urn:foo' });

        it('should throw when non standard claim provided', function (done) {
          jwt.verify(token, pub, { nonstandardClaim: 'urn:foo' }, function (err, decoded) {
            assert.isUndefined(decoded);
            assert.isNotNull(err);
            assert.equal(err.name, 'JsonWebTokenError');
            done();
          });
        });
      });

      /* Standard claims not required */ 
      describe('when signing a token without a standard claim', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm});

        it('should throw standard claim is required error', function (done) {
          jwt.verify(token, pub, {}, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });
      });


      /* Signature not checked by default */ 
      describe('when signing a token without a standard claim', function () {
        var token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm});

        it('should throw standard claim is required error', function (done) {
          jwt.verify(token, pub, {}, function (err, decoded) {
            assert.isNotNull(decoded);
            assert.isNull(err);
            done();
          });
        });
      });
    });
  });
});
