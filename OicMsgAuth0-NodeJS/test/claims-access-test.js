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
        var basicIdToken = new BasicIdToken('issuer','subject', 'audience');
        basicIdToken.addNonStandardClaims({"jti" : "test"});
        basicIdToken.setNoneAlgorithm(true);        

        it('should be able to access all standard claims', function (done) {
          try{
           var standardClaims = basicIdToken.getStandardClaims();  
           assert.deepEqual(standardClaims, { "iss" : "issuer", "sub" : 'subject', "aud" : "audience"})          
          }catch(err){
            assert.isNull(err);
          }
          done();
        });

        it('should be able to access non standard claims separately', function (done) {
            try{
             var nonStandardClaims = basicIdToken.getNonStandardClaims();  
             assert.deepEqual(nonStandardClaims, { "jti" : "test"})          
            }catch(err){
              assert.isNull(err);
            }
            done();
          });
      });      
});
