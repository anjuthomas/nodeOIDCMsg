var jwt = require('../index');
var expect = require('chai').expect;
var BasicIdToken = require('../node_modules/src/models/tokenProfiles/basicIdToken');
var assert = require('chai').assert;

describe('expires option', function() {

  it('should work with a number of seconds', function (done) {
    /*var token = jwt.sign({foo: 123}, '123', { expiresIn: 10 });
    var result = jwt.verify(token, '123');
    expect(result.exp).to.be.closeTo(Math.floor(Date.now() / 1000) + 10, 0.2);*/
    var dateNow = Math.floor(Date.now() / 1000);    
    var iat = dateNow;
    var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
    basicIdToken.addNonStandardClaims({"aud" : "audience"});
    var signedJWT = basicIdToken.toJWT('shhhh', {expiresIn: 10});
    try{
      var verificationClaims = {'iss': 'issuer','sub' : 'subject', 'aud' : 'audience', 'maxAge': '1d', 'jti': 'jti', 'clockTolerance' : 10};
      var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, {algorithms: ['HS256'], clockTimestamp : dateNow});
      expect(decodedPayload.exp).to.be.closeTo(iat + 10, 0.2);
    }catch(err){
      assert.isNotNull(decodedPayload);
      assert.isNull(err);
    }
    done();
  });

  it('should work with a string', function (done) {
    /*var token = jwt.sign({foo: 123}, '123', { expiresIn: '2d' });
    var result = jwt.verify(token, '123');
    expect(result.exp).to.be.closeTo(Math.floor(Date.now() / 1000) + two_days_in_secs, 0.2);*/

    var two_days_in_secs = 2 * 24 * 60 * 60;

    var dateNow = Math.floor(Date.now() / 1000);    
    var iat = dateNow - 30;
    var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
    basicIdToken.addNonStandardClaims({"aud" : "audience"});
    var signedJWT = basicIdToken.toJWT('shhhh', {expiresIn: '2d' });

    try{
      var verificationClaims = {'iss': 'issuer','sub' : 'subject', 'aud' : 'audience', 'maxAge': '1d', 'jti': 'jti'};
      var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, {algorithms: ['HS256']});
      expect(decodedPayload.exp).to.be.closeTo(iat + two_days_in_secs, 0.2);
    }catch(err){
      assert.isNotNull(decodedPayload);
      assert.isNull(err);
    }
    done();
  });

  it('should work with a string second example', function (done) {
    /*var token = jwt.sign({foo: 123}, '123', { expiresIn: '36h' });
    var result = jwt.verify(token, '123');
    var day_and_a_half_in_secs = 1.5 * 24 * 60 * 60;
    expect(result.exp).to.be.closeTo(Math.floor(Date.now() / 1000) + day_and_a_half_in_secs, 0.2);*/

    var day_and_a_half_in_secs = 1.5 * 24 * 60 * 60;
    
    var dateNow = Math.floor(Date.now() / 1000);    
    var iat = dateNow - 30;
    var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
    basicIdToken.addNonStandardClaims({"aud" : "audience"});
    var signedJWT = basicIdToken.toJWT('shhhh', {expiresIn: '36h'});

    try{
      var verificationClaims = {'iss': 'issuer','sub' : 'subject', 'aud' : 'audience', 'maxAge': '1d', 'jti': 'jti'};
      var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, {algorithms: ['HS256']});
    
      expect(decodedPayload.exp).to.be.closeTo(iat + day_and_a_half_in_secs, 0.2);
      
    }catch(err){
      assert.isNotNull(decodedPayload);
      assert.isNull(err);
    }
    done();
  });

  it('should throw if expires has a bad string format', function (done) {

    
    expect(function () {

        var dateNow = Math.floor(Date.now() / 1000);    
        var iat = dateNow - 30;
        var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
        basicIdToken.addNonStandardClaims({"aud" : "audience"});
        var signedJWT = basicIdToken.toJWT('shhhh', {expiresIn: '1 monkey'});
      //jwt.sign({foo: 123}, '123', { expiresIn: '1 monkey' });
      done();      
    }).to.throw(/"expiresIn" should be a number of seconds or string representing a timespan/);
    done();
    
    
  });

  it('should throw if expires is not an string or number', function (done) {
    expect(function () {
        var dateNow = Math.floor(Date.now() / 1000);    
        var iat = dateNow - 30;
        var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
        basicIdToken.addNonStandardClaims({"aud" : "audience"});
        var signedJWT = basicIdToken.toJWT('shhhh', {expiresIn: { crazy : 213 }});
      //jwt.sign({foo: 123}, '123', { expiresIn: { crazy : 213 } });
      done();
    }).to.throw(/"expiresIn" should be a number of seconds or string representing a timespan/);
    done();
    
  });

  it('should throw an error if expiresIn and exp are provided', function (done) {
    expect(function () {

        var dateNow = Math.floor(Date.now() / 1000);    
        var iat = dateNow - 30;
        var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
        basicIdToken.addNonStandardClaims({"aud" : "audience", exp: 839218392183});
        var signedJWT = basicIdToken.toJWT('shhhh', {expiresIn: '5h'});
        done();
    }).to.throw(/Bad "options.expiresIn" option the payload already has an "exp" property./);
    done();
  });


  it('should throw on deprecated expiresInSeconds option', function (done) {
    expect(function () {
        var dateNow = Math.floor(Date.now() / 1000);    
        var iat = dateNow - 30;
        var basicIdToken = new BasicIdToken('issuer','subject', iat, "jti");
        basicIdToken.addNonStandardClaims({"aud" : "audience", exp: 839218392183});
        var signedJWT = basicIdToken.toJWT('shhhh', { expiresInSeconds: 5 });
        done();
    }).to.throw('"expiresInSeconds" is not allowed');
    done();
    
  });


});
