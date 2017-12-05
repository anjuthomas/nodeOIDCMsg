  /* Main */

  var clockTimestamp = 1000000000; 
  var BasicIdToken = require('./node_modules/src/models/tokenProfiles/basicIdToken');  
  //var GoogleIdToken = require('./node_modules/src/models/tokenProfiles/googleIdToken');
  //var RefreshToken = require('./node_modules/src/models/tokenProfiles/refreshToken');
  var clockTimestamp = 1000000000; 
  var expect = require('chai').expect;
  var atob = require('atob');
  var assert = require('chai').assert;  
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var jwtDecoder = require('./node_modules/src/controllers/messageTypes/jwt/jsonwebtoken/decode');  
  var conv = require('binstring');

  var clockTimestamp = 1511783267;
  
  var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jwtid");
  basicIdToken.addNonStandardClaims({"foo": 'bar', "aud" : "audience"});
  basicIdToken.setNoneAlgorithm(true);
  var token = basicIdToken.toJWT("shh", {algorithm: 'HS256'});

  var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
  }

  var client = new HttpClient();
  client.get('https://sandrino.auth0.com/.well-known/jwks.json', function(response) {
    // do something with response
    console.log(response);
    jwtDecoder.verifyJwtSignature(token, "test", basicIdToken,  {"clockTimestamp" : clockTimestamp, jwtid: 'jwtid' }, response, "base64");
  });

  /*

  function b64_to_utf8 (str) {
    return decodeURIComponent(escape(atob( str )));
  }

  var urlEncodedVal = basicIdToken.toUrlEncoded();

  var decodedVal = basicIdToken.fromUrlEncoded(urlEncodedVal);

  var jsonStr = basicIdToken.toJSON();
  
  var decodedJson = basicIdToken.fromJSON(jsonStr);
*/


  /*
  try{
    var decoded = basicIdToken.fromJWT(token, "shh", {"foo": "bar","aud" : "audience", "iss" : "issuer", "sub": "subject", 'maxAge': '3s', 'clockTolerance' : 10, "jti": "jwtid"}, {"clockTimestamp" : clockTimestamp, jwtid: 'jwtid' });
  }catch(err){
    assert.isNotNull(decoded);
    assert.isNull(err);
  }*/
  /*
  var certs = {
    "use": "enc",
    "n": "z7TYSonR4KTijDVTJJHBRs_7MUtvy2_aIPOKpkbigerOYxk7DQ9zNeaFUzFt8Pz-SCPItEcFXXIrCOm3IlyDh-yYZsMmSQhdIGneGF7DCr2NnpbF4k25VAne516t9ogCCdxvvFkqVVh2oi_lxZtXEnELqz3SsCzV5fKvxQSo8NycSe3kjBHFmLGwSILzUMeSzYjpbC7SEnYVFpVfz0LmxfDTkLWL8-uE55Qxo7BFkbRIuqUdlpEYrb7lMPKpP7BvCcIy6lXg7tyX1g-wPmsiFJlojXTWU-xWEafEwXLJ7l-YTBMQDyEYSgDBT9f-Motj6ZtwIsB0aG6tHLoXWdFqOQ",
    "q": "_UCFtRnO9UbmxyVLX9Sq2_qI5WhXTTH2G5KWn-tA-j7xuvurqcx6IKm8yxDHKk1iDgORSkFUcOjP5B249jPR8_MpWl9VPbkpc-Kp41hqsI_8tqaTm-nmwG8KGukOnVX98BJ6EyGWlEYDlXPsEU58H1r3M9B6AbXwShCB1qomBf0",
    "e": "AQAB",
    "kty": "RSA",
    "kid": "Jb8ZVEFoN1OZjdMoO6H7csDR8UPRtwgmXV6i2uzbGkY",
    "d": "ESgxk5qlzQYhto4zE3q8ueI1MCG4ltfi70Tex5RkYnHoYXQ0lgQYMrQbgD89gyIKyR-3lPim30yudFqF5583uDMZdaeaEn9P3f0QvPea6di1iYuPxf1AmUoFcRw3h309md3tFuRQpGMdzZDiTHvj6eCPo7IEJMxXUNrGnSIg6GBSf1N4-eV9-hBw0zUNi6qY4DdnK4g9qWkn2xSRORxH7ihUWffakyE_ZWlvxFP70cbYeGE-N9gD9DnIcgGvy-A1cXSXqqaPytzVa9cUzwPV6h5goA86Iq135yKCEeRkvl8r_jU20JQJvXyfQFJC9WHl8coPTI9PQCJFDNjlv5z_uQ",
    "p": "0fXOmXOEAgSMtP6GxgbN-cVYDMQ9_ExyM28Gp_pBwy0EOfpYkhITnaqvdN3H-TTTgZ1XkAlNmC0TqztF6Mmd3mNGWBgUN8vEGpRMinnqXNrUgh5_tWr2crsdqmTRegrZVCyVUm_CQSvQHft8i8yidqzDud5XModLSEC8olyMC-0"
  };*/

    
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
 