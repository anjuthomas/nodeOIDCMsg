var jwt = require('../index');
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var assert = require('chai').assert;
var ms = require('ms');
var BasicIdToken = require('../node_modules/tokenProfiles/basicIdToken');
var decode = require('../node_modules/jsonwebtoken/decode');
var jwt = require('../node_modules/jsonwebtoken');

function loadKey(filename) {
  return fs.readFileSync(path.join(__dirname, filename));
}

describe('Asymmetric Algorithms', function(){

      describe('when adding claims to token profile', function () {
        var dateNow = Math.floor(Date.now() / 1000);
        var iat = dateNow - 30;
        var expiresIn = 50;
        var clockTimestamp = 1000000000;

        var basicIdToken = new BasicIdToken('issuer','subject', 'audience', clockTimestamp, clockTimestamp + 2, clockTimestamp + 1, "jti");
        basicIdToken.addNonStandardClaims({'knownNonStandardClaim': 'test'});
        basicIdToken.setNoneAlgorithm(true);        

        it('should be able to access all standard claims', function (done) {
          try{
           var standardClaims = basicIdToken.getStandardClaims();  
           assert.deepEqual(standardClaims, { "iss" : "issuer", "sub" : 'subject', "aud" : "audience", "iat" : clockTimestamp, "exp" : clockTimestamp + 2, "nbf" : clockTimestamp + 1,"jti" : "jti"})          
          }catch(err){
            console.log(err);
            assert.isNull(err);
          }
          done();
        });

        it('should be able to access non standard claims separately', function (done) {
            try{
             var nonStandardClaims = basicIdToken.getNonStandardClaims();  
             assert.deepEqual(nonStandardClaims, {'knownNonStandardClaim': 'test'})          
            }catch(err){
              console.log("__________");
              console.log(err);
              assert.isNull(err);
            }
            done();
          });
      });      
});
