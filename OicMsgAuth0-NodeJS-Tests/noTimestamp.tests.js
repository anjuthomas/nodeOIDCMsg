
var jwt = require('../index');
var expect = require('chai').expect;
var fs = require('fs');
var jwt = require('../index');
var JsonWebTokenError = require('../node_modules/src/controllers/messageTypes/jwt/jsonwebtoken/lib/JsonWebTokenError');
var expect = require('chai').expect;

var BasicIdToken = require('../node_modules/src/models/tokenProfiles/basicIdToken');

describe('noTimestamp', function() {
    
  it('should work with string', function () {
    /*var token = jwt.sign({foo: 123}, '123', { expiresIn: '5m' , noTimestamp: true });
    var result = jwt.verify(token, '123');
    expect(result.exp).to.be.closeTo(Math.floor(Date.now() / 1000) + (5*60), 0.5);*/

    /*
    var clockTimestamp = 1000000000;
    
    var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");
    basicIdToken.addNonStandardClaims({"foo": "123", "aud" : "audience"});
    basicIdToken.setNoneAlgorithm(true);
    var signedJWT = basicIdToken.toJWT('123', {expiresIn: '5m' , noTimestamp: true });

    var result = basicIdToken.fromJWT(signedJWT, '123', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"}, {'clockTimestamp' : clockTimestamp});        
    expect(result.exp).to.be.closeTo(Math.floor(Date.now() / 1000) + (5*60), 0.5);
    */

});
});