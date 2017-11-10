  /* Main */

  var BasicIdToken = require('./node_modules/tokenProfiles/basicIdToken');  
  
  var basicIdToken = new BasicIdToken('issuer','subject', 'audience', "test", "test", "test", "test");
  basicIdToken.addNonStandardClaims({"test" : "test"});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'HS256'});

  var verificationToken = new BasicIdToken('issuer','subject', 'audience', 'test', 'test', 'test', 'test');
  verificationToken.addNonStandardClaims({"test" : "wrong-jti1"});
  var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh', {algorithms: ['HS256']});

  console.log(decodedPayload);


  /* Extended Id Token Test */
  var ExtendedIdToken = require('./node_modules/tokenProfiles/extendedIdToken');  
  
  var extendedIdToken = new ExtendedIdToken("test", 'issuer','subject', 'audience', "test", "test", "test", "test", "test");
  extendedIdToken.addNonStandardClaims({"jti" : "test"});
  extendedIdToken.setNoneAlgorithm(true);
  var signedJWT = extendedIdToken.toJWT('', {algorithm : 'none'});

  var verificationToken = new ExtendedIdToken("test", 'issuer','subject', 'audience', "test", "test", "test", "test", "test");
  verificationToken.addNonStandardClaims({"jti" : "test"});
  var decodedPayload = verificationToken.fromJWT(signedJWT, '', {algorithms: ['none']});

  console.log(decodedPayload);
  
    /* Facebook Id Token Test */
    var FacebookIDToken = require('./node_modules/tokenProfiles/facebookToken');  
    
    var facebookToken = new FacebookIDToken("test", "test", "test", "test");
    facebookToken.addNonStandardClaims({"jti" : "test"});
    facebookToken.setNoneAlgorithm(true);
    var signedJWT = facebookToken.toJWT('', {algorithm : 'none'});
  
    var verificationToken = new FacebookIDToken( "test", "test", "test", "test");
    verificationToken.addNonStandardClaims({"jti" : "testing"});
    var decodedPayload = verificationToken.fromJWT(signedJWT, '', {algorithms: ['none']});
  
    console.log(decodedPayload);