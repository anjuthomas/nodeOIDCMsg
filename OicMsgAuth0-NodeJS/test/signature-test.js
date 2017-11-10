var jwt = require('../index');

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('HS256', function() {

  describe('when signing a token', function() {
    var secret = 'shhhhhh';

    var token = jwt.sign({ foo: 'bar' }, secret, { algorithm: 'HS256' });

    it('should be able to validate without options', function(done) {
      var callback = function(err, decoded) {
        assert.ok(decoded.foo);
        assert.equal('bar', decoded.foo);
        done();
      };
      callback.issuer = "shouldn't affect";
      jwt.verify(token, secret, callback );
    });

    it('should validate with secret', function(done) {
      jwt.verify(token, secret, function(err, decoded) {
        assert.ok(decoded.foo);
        assert.equal('bar', decoded.foo);
        done();
      });
    });

    it('should throw with invalid secret', function(done) {
      jwt.verify(token, 'invalid secret', function(err, decoded) {
        assert.isUndefined(decoded);
        assert.isNotNull(err);
        done();
      });
    });

    it('should throw with secret and token not signed', function(done) {
      var signed = jwt.sign({ foo: 'bar' }, secret, { algorithm: 'none' });
      var unsigned = signed.split('.')[0] + '.' + signed.split('.')[1] + '.';
      jwt.verify(unsigned, 'secret', function(err, decoded) {
        assert.isUndefined(decoded);
        assert.isNotNull(err);
        done();
      });
    });

    it('should work with falsy secret and token not signed', function(done) {
      var signed = jwt.sign({ foo: 'bar' }, null, { algorithm: 'none' });
      var unsigned = signed.split('.')[0] + '.' + signed.split('.')[1] + '.';
      jwt.verify(unsigned, 'secret', function(err, decoded) {
        assert.isUndefined(decoded);
        assert.isNotNull(err);
        done();
      });
    });

    it('should throw when verifying null', function(done) {
      jwt.verify(null, 'secret', function(err, decoded) {
        assert.isUndefined(decoded);
        assert.isNotNull(err);
        done();
      });
    });


    it('should default to HS256 algorithm when no options are passed', function() {
      var token = jwt.sign({ foo: 'bar' }, secret);
      var verifiedToken = jwt.verify(token, secret);
      assert.ok(verifiedToken.foo);
      assert.equal('bar', verifiedToken.foo);
    });
  });
});
