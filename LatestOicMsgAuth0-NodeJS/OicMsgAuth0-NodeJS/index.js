  /* Main */

  var clockTimestamp = 1000000000; 
  var BasicIdToken = require('./node_modules/tokenProfiles/basicIdToken');  
  var GoogleIdToken = require('./node_modules/tokenProfiles/googleIdToken');
  

  var basicIdToken2 = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
  basicIdToken2.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
  basicIdToken2.setNoneAlgorithm(true);
  var signedJWT = basicIdToken2.toJWT('shhhh');

  var decodedPayload = basicIdToken2.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});

  var googleIdToken = new GoogleIdToken('name', 'email@google.com', '/pathToPic', 'issuer','subject', clockTimestamp);
  googleIdToken.addNonStandardClaims({"aud" : "audience", "exp" : clockTimestamp + 3});
  googleIdToken.setNoneAlgorithm(true);        

 
  var standardClaims = googleIdToken.getStandardClaims();  
  console.log(standardClaims);

 var nonStandardClaims = googleIdToken.getNonStandardClaims();  
 console.log(nonStandardClaims);


 var basicIdToken2 = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
 basicIdToken2.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
 basicIdToken2.setNoneAlgorithm(true);        
 var nonStandardClaims = basicIdToken2.getNonStandardClaims();  
 console.log(nonStandardClaims);

 var googleIdToken = new GoogleIdToken('name', 'email@google.com', '/pathToPic', 'issuer','subject', clockTimestamp);
 googleIdToken.setNoneAlgorithm(true);
 var signedJWT = googleIdToken.toJWT('shhhh');

 var decodedPayload = googleIdToken.fromJWT(signedJWT, 'shhhh', {"name":"name", "email": "email@google.com", "picture":"/pathToPic", "iss" : "issuer", "sub": "subject", 'maxAge': '1d'}, {'clockTimestamp' : clockTimestamp});
 console.log(decodedPayload);
  /*
  var clockTimestamp = 1000000000; 
  var BasicIdToken = require('./node_modules/tokenProfiles/basicIdToken');  

  var basicIdToken2 = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 2, clockTimestamp + 3, "jti");
  basicIdToken2.addNonStandardClaims({"knownNonStandardClaim" : "test", "intNonStandard" : 1, "floatNonStandard" : 5.0});
  basicIdToken2.setNoneAlgorithm(true);
  var signedJWT = basicIdToken2.toJWT('shhhh');

  var decodedPayload = basicIdToken2.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{ "knownNonStandardClaim" : "test", "intNonStandard" : 1, "floatNonStandard" : 5.0}, {'clockTimestamp' : clockTimestamp});
  
  var basicIdToken2 = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 2, clockTimestamp + 1, "jti");
  basicIdToken2.addNonStandardClaims({'knownNonStandardClaim': 'test', "intNonStandard" : 1, "floatNonStandard" : 5.0});
  basicIdToken2.setNoneAlgorithm(true);        

  var nonStandardClaims = basicIdToken2.getNonStandardClaims();  

  var basicIdToken = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 2, clockTimestamp + 3, "jti");
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh');

  var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {}, {'clockTimestamp' : clockTimestamp});
  
  
  
  var clockTimestamp = 1000000000; 
  var BasicIdToken = require('./node_modules/tokenProfiles/basicIdToken');  

  var basicIdToken = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 2, clockTimestamp + 3, "jti");
  basicIdToken.addNonStandardClaims({"userId" : "test"});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh');
  var standardClaims = basicIdToken.getStandardClaims();
  console.log(standardClaims);
  var nonStandardClaims = basicIdToken.getNonStandardClaims();
  console.log(nonStandardClaims);

  var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {}, {'clockTimestamp' : clockTimestamp});
  


  var basicIdToken = new BasicIdToken('issuer','subject', 'aud', clockTimestamp, clockTimestamp + 2, clockTimestamp + 3, "jti");
  basicIdToken.addNonStandardClaims({'intNonStandard' : 'intNonStandard'});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh');
  var standardClaims = basicIdToken.getStandardClaims();
  console.log(standardClaims);
  var nonStandardClaims = basicIdToken.getNonStandardClaims();
  console.log(nonStandardClaims);

  var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "aud", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'intNonStandard' : 'intNonStandard'}, {'clockTimestamp' : clockTimestamp});
  console.log("dECODED PAYLOAD");
  console.log(decodedPayload);

  var basicIdToken = new BasicIdToken('issuer','subject', 'adding new stuff', clockTimestamp, clockTimestamp + 2, clockTimestamp + 3, "jti");
  basicIdToken.addNonStandardClaims({"testnonstandard" : "test", "test2": "non standard claim", 'intNonStandard' : 'intNonStandard'});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh');
  var standardClaims = basicIdToken.getStandardClaims();
  console.log(standardClaims);
  var nonStandardClaims = basicIdToken.getNonStandardClaims();
  console.log(nonStandardClaims);

  var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "adding new stuff", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {"test2": "non", 'intNonStandard' : 'intNonStandard'}, {'clockTimestamp' : clockTimestamp});
  
  
  try{
    var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {}, {'clockTimestamp' : clockTimestamp});
  }catch(err){
    console.log("+++++++++++++++++++++++++++++++")
    console.log(err);
  }
  /*
  var basicIdToken = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 2, clockTimestamp + 3, "jti");
  basicIdToken.addNonStandardClaims({"test" : 5.0});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh');
 var verificationClaims = {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"};
 var nonStandardVerificationClaims = {};
  var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, nonStandardVerificationClaims, {'clockTimestamp' : clockTimestamp});
  console.log("no errorrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

/*
  var BasicIdToken = require('./node_modules/tokenProfiles/basicIdToken');  
  var clockTimestamp = 1600000000;
  
  var basicIdToken = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 20, clockTimestamp + 10, "test");
  basicIdToken.addNonStandardClaims({"test" : "test"});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'HS256'});

  var verificationClaims = {'iss': 'issuer','sub' : 'subject', 'aud' : 'audience', 'maxAge': 10, 'clockTolerance' : 10, 'jti': 'test'};
  var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', verificationClaims, {algorithms: ['HS256'], "clockTimestamp" : clockTimestamp});

  console.log(decodedPayload);*/


  /* Extended Id Token Test */
  /*var ExtendedIdToken = require('./node_modules/tokenProfiles/extendedIdToken');  
  
  var extendedIdToken = new ExtendedIdToken("test", 'issuer','subject', 'audience', "test", "test", "test", "test", "test");
  extendedIdToken.addNonStandardClaims({"jti" : "test"});
  extendedIdToken.setNoneAlgorithm(true);
  var signedJWT = extendedIdToken.toJWT('', {algorithm : 'none'});

  var verificationToken = new ExtendedIdToken("test", 'issuer','subject', 'audience', "test", "test", "test", "test", "test");
  verificationToken.addNonStandardClaims({"jti" : "test"});
  var decodedPayload = verificationToken.fromJWT(signedJWT, '', {algorithms: ['none']});

  console.log(decodedPayload);
  
    /* Facebook Id Token Test */
    /*var FacebookIDToken = require('./node_modules/tokenProfiles/facebookToken');  
    
    var facebookToken = new FacebookIDToken("test", "test", "test", "test");
    facebookToken.addNonStandardClaims({"jti" : "test"});
    facebookToken.setNoneAlgorithm(true);
    var signedJWT = facebookToken.toJWT('', {algorithm : 'none'});
  
    var verificationToken = new FacebookIDToken( "test", "test", "test", "test");
    verificationToken.addNonStandardClaims({"jti" : "testing"});
    var decodedPayload = verificationToken.fromJWT(signedJWT, '', {algorithms: ['none']});
  
    console.log(decodedPayload);
    */