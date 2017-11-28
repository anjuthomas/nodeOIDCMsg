  /* Main */

  var clockTimestamp = 1000000000; 
  var BasicIdToken = require('./node_modules/src/models/tokenProfiles/basicIdToken');  
  //var GoogleIdToken = require('./node_modules/src/models/tokenProfiles/googleIdToken');
  //var RefreshToken = require('./node_modules/src/models/tokenProfiles/refreshToken');
  var clockTimestamp = 1000000000; 
  var expect = require('chai').expect;
  var atob = require('atob');
  var assert = require('chai').assert;  

  function b64_to_utf8 (str) {
    return decodeURIComponent(escape(atob( str )));
  }

  /*
  var clockTimestamp = 1511783267;
  
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jwtid");
  basicIdToken.addNonStandardClaims({"foo": 'bar', "aud" : "audience"});
  basicIdToken.setNoneAlgorithm(true);
  var token = basicIdToken.toJWT("shh", {algorithm: 'HS256' });

  try{
    var decoded = basicIdToken.fromJWT(token, "shh", {"foo": "bar","aud" : "audience", "iss" : "issuer", "sub": "subject", 'maxAge': '3s', 'clockTolerance' : 10, "jti": "jwtid"}, {"clockTimestamp" : clockTimestamp, jwtid: 'jwtid' });
  }catch(err){
      console.log(err);
    assert.isNotNull(decoded);
    assert.isNull(err);
  }*/
  /*
  var clockTimestamp = 1511783267;
  
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"foo": 'bar', "aud": 'urn:foo'});
  basicIdToken.setNoneAlgorithm(true);
  var token = basicIdToken.toJWT("shh", {algorithm: 'HS256'});

  try{
    var decoded = basicIdToken.fromJWT(token, "shh", {"foo": "bar", "aud" :  /urn:f[o]{2}/ , "iss" : "issuer", "sub": "subject", 'maxAge': '3s', 'clockTolerance' : 10, "jti": "jti"}, {"clockTimestamp" : clockTimestamp});
  }catch(err){
    console.log(err);
    assert.isUndefined(decoded);
    assert.isNotNull(err);
    assert.equal(err.name, 'JsonWebTokenError');
  } 

  try{
    var decoded = basicIdToken.fromJWT(token, "shh", {"foo": "bar","aud" : 'urn:wrong', "iss" : "issuer", "sub": "subject", 'maxAge': '3s', 'clockTolerance' : 10, "jti": "jti"}, {"clockTimestamp" : clockTimestamp });
  }catch(err){
    console.log(err);
    assert.isUndefined(decoded);
    assert.isNotNull(err);
    assert.equal(err.name, 'JsonWebTokenError');
  } */

  /*
  var clockTimestamp = 1520000000;
  
  //token = jwt.sign({ foo: 'bar' }, priv, { algorithm: algorithm, notBefore: 0 });

  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"foo": 'bar', "aud" : "audience"});
  basicIdToken.setNoneAlgorithm(true);
  var token = basicIdToken.toJWT("shh", {notBefore: 0, algorithm: 'HS256' });

  try{
    var decoded = basicIdToken.fromJWT(token, "shh", {"foo": "bar", "iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '3s', 'clockTolerance' : 10, "jti": "jti"}, {"clockTimestamp" : clockTimestamp});
  }catch(err){
    assert.isNull(err);
    assert.isNotNull(decoded);
    done();
  } 
  /*
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"foo": 'bar', "aud" : "audience"});
  basicIdToken.setNoneAlgorithm(true);
  var token = basicIdToken.toJWT("shh", { algorithm: "HS256"});
  
  try{
    var decoded = basicIdToken.fromJWT(token, "shh", {"foo": "bar", "iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '3s', 'clockTolerance' : 10, "jti": "jti"}, {"clockTimestamp" : clockTimestamp});
    assert.ok(decoded.issuer);
    assert.equal('issuer', decoded.issuer);
    done();                
  }catch(err){
    console.log(err);
  }*/
  


  /*
  var clockTimestamp = 1437018582;
  //var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.0MBPd4Bru9-fK_HY3xmuDAc6N_embknmNuhdb9bKL_U';
  var options = {algorithms: ['HS256'], clockTimestamp: clockTimestamp, maxAge: '1s'};
  var key = "secret";
  var refreshToken = new RefreshToken('refreshToken','accessToken');
  var token = refreshToken.toJWT(key, {noTimestamp : true});
  try{
      var result = refreshToken.fromJWT(token, key, {"refresh_token" : "refreshToken", "access_token": "accessToken", 'maxAge': '1s'}, options);        
      console.log(result);
      console.log("Result : error messages")
  }catch(err){
      assert.equal(err.name, 'JsonWebTokenError');
      assert.equal(err.message, 'iat required when maxAge is specified');
      assert.isUndefined(result);
      done();
  }*/
  /*

  var options = {algorithms: ['HS256'], clockTimestamp : 1437018587000};
  var key = "secret";
  var basicIdToken = new BasicIdToken('issuer','subject',1437018587000 - 5, "jti");
  basicIdToken.addNonStandardClaims({  'foo': 'bar' , "aud" : "audience", "exp" : 1437018587000 + 5});
  basicIdToken.setNoneAlgorithm(true);
  var token = basicIdToken.toJWT(key);
 
    try{
      var result = basicIdToken.fromJWT(token, key, {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '3s', 'clockTolerance' : 0.001, "jti": "jti"}, options);        
    }catch(err){
        assert.equal(err.name, 'TokenExpiredError');
        assert.equal(err.message, 'maxAge exceeded');
        assert.equal(err.expiredAt.constructor.name, 'Date');
        assert.equal(Number(err.expiredAt), 1437018586998000);
        assert.isUndefined(result);
    }
  
  try{
    var secret = "secret";
    var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
    basicIdToken.addNonStandardClaims({  'foo': 'bar' , "aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : 1});
    basicIdToken.setNoneAlgorithm(true);
    var token = basicIdToken.toJWT(secret, {notBefore: {}});
  }catch(err){
    expect(err).to.be.ok();
  }*/

  /*
  var clockTimestamp = Math.floor(Date.now() / 1000);  
  
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"foo": "123", "aud" : "audience"});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('123', {expiresIn: '5m' , noTimestamp: true });

  var result = basicIdToken.fromJWT(signedJWT, '123', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});        
 
 console.log("RESULTTTTTT!!!!!");
 console.log(result);
 expect(result.exp).to.be.closeTo(Math.floor(Date.now() / 1000) + (5*60), 0.5);*/
 
      /*
      var secret = "shhhh";
      var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
      basicIdToken.addNonStandardClaims({ "foo": "bar", "aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : 1});
      basicIdToken.setNoneAlgorithm(true);
      var token = basicIdToken.toJWT(secret, { algorithm: 'HS256'   });
  
        var malformedToken = token + ' '; // corrupt the token by adding a space
        var decoded = basicIdToken.fromJWT(malformedToken, secret, {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{'clockTimestamp' : clockTimestamp, algorithm: 'HS256', ignoreExpiration: true});
          console.log("NO ERRRRRRRRRRROR")*/
  /*
      var verificationClaims = {'iss': 'issuer','sub' : 'subject', 'aud' : 'audience', 'maxAge': '1d', 'jti': 'jti'};
      var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, {algorithms: ['HS256']});
      expect(decodedPayload.exp).to.be.closeTo(iat + two_days_in_secs, 0.2);
     
      var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
      basicIdToken.addNonStandardClaims({ "foo": "bar", "aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
      basicIdToken.setNoneAlgorithm(true);
      var token = basicIdToken.toJWT(secret, { algorithm: 'HS256' });*/
      /*
  var expected = 'José';
  
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"name" : expected, "aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh', { encoding: 'binary' });
  
  var decoded_name = JSON.parse(atob(signedJWT.split('.')[1])).name;
  expect(decoded_name).to.equal(expected);*/

  /*
  var basicIdToken2 = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken2.addNonStandardClaims({"nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
  basicIdToken2.setNoneAlgorithm(true);
  var signedJWT = basicIdToken2.toJWT('shhhh');

  var decodedPayload = basicIdToken2.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});
*/
  /*
  var fs = require('fs');
  var path = require('path');
  
  var pub = fs.readFileSync(path.join(__dirname, 'pub.pem'), 'utf8');

  var clockTimestamp = 1000000000;
  
  var refreshToken = new RefreshToken('refreshToken', 'accessToken');
  refreshToken.addNonStandardClaims({"foo": "123"});
  refreshToken.setNoneAlgorithm(true);
  var signedJWT = refreshToken.toJWT('123', {expiresIn: '5m' , noTimestamp: true });

  var result = refreshToken.fromJWT(signedJWT, '123', {"refresh_token" : "refreshToken", "access_token": "accessToken"});    */  

  /*
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"foo": "123", "aud" : "audience"});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('123', {expiresIn: '5m' , noTimestamp: true });

  var result = basicIdToken.fromJWT(signedJWT, '123', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"});        
  */
  /*
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT(pub, {algorithm : 'HS256'});

  //var decodedPayload = basicIdToken.fromJWT(signedJWT, pub, {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{'clockTimestamp' : clockTimestamp});        
  */
  /*
  var basicIdToken2 = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken2.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
  basicIdToken2.setNoneAlgorithm(true);
  var signedJWT = basicIdToken2.toJWT('shhhh');

  var decodedPayload = basicIdToken2.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});

  var googleIdToken = new GoogleIdToken('name', 'email@google.com', '/pathToPic', 'issuer','subject', clockTimestamp);
  googleIdToken.addNonStandardClaims({"aud" : "audience", "exp" : clockTimestamp + 3});
  googleIdToken.setNoneAlgorithm(true);        
 
  var standardClaims = googleIdToken.getStandardClaims();  

  var nonStandardClaims = googleIdToken.getNonStandardClaims();  


 var basicIdToken2 = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
 basicIdToken2.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
 basicIdToken2.setNoneAlgorithm(true);        
 var nonStandardClaims = basicIdToken2.getNonStandardClaims();  

 var googleIdToken = new GoogleIdToken('name', 'email@google.com', '/pathToPic', 'issuer','subject', clockTimestamp);
 googleIdToken.setNoneAlgorithm(true);
 var signedJWT = googleIdToken.toJWT('shhhh');

 var decodedPayload = googleIdToken.fromJWT(signedJWT, 'shhhh', {"name":"name", "email": "email@google.com", "picture":"/pathToPic", "iss" : "issuer", "sub": "subject", 'maxAge': '1d'}, {'clockTimestamp' : clockTimestamp});
 console.log(decodedPayload);
 */
 