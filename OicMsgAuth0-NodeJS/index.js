  /* Main */

  var BasicIdToken = require('./node_modules/tokenProfiles/basicIdToken');  
  
/*var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
  basicIdToken.addNonStandardClaims({"jti" : "test"});
  //basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'HS256'});

  var verificationToken = new BasicIdToken('issuer','subject', 'audience');
  verificationToken.addNonStandardClaims({"jti" : "test"});
  var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh', {algorithms: ['HS256']});*/

  //console.log(decodedPayload);

  /* None algo test */

  /*
  var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
  basicIdToken.addNonStandardClaims({"jti" : "test"});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'none'});

  var verificationToken = new BasicIdToken('issuer','subject', 'audience');
  verificationToken.addNonStandardClaims({"jti" : "test"});
  try{
    var decodedPayload = verificationToken.fromJWT(signedJWT, 'shhhh', {algorithms: ['none']});
    console.log(decodedPayload);
  }catch(err){
    console.log(err);
    
  }*/


  /* Invalid secret test */

  var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
  basicIdToken.addNonStandardClaims({"jti" : "test"});
  basicIdToken.setNoneAlgorithm(true);
  var signedJWT = basicIdToken.toJWT('shhhh');

  var verificationToken = new BasicIdToken('issuer','subject', 'audience');
  verificationToken.addNonStandardClaims({"jti" : "test"});
  try{
    var decodedPayload = verificationToken.fromJWT(signedJWT, 'wrong-secret');
  }catch(err){
    console.log(err)            
  }