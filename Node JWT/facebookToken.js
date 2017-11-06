'use strict';

/* An example token type */ 
function FacebookToken(name, age, email){
    this.name = name;
    this.age = age;
    this.email = email;
    this.validateRequiredFields();
    
};
FacebookToken.prototype.standard_claims = {};

FacebookToken.prototype.non_standard_claims = {};

FacebookToken.prototype.options_to_payload = {
    'name': 'name',
    'age': 'age',
    'email': 'email',
  };
  
FacebookToken.prototype.options_for_objects = [
    'expiresIn',
    'notBefore',
    'noTimestamp',
    'audience',
    'issuer',
    'subject',
    'jwtid',
  ];

/* Requires all standard claims */ 
FacebookToken.prototype.validateRequiredFields = function(){
    if (this.name == undefined){
        throw new Error("You are missing a required parameter : name");
    }else if (this.age == undefined){
        throw new Error("You are missing the required parameter : age");
    }else if (this.email == undefined){
        throw new Error("You are missing the required parameter : email");        
    }
};

/* Distinguishes non standard claims from standard claims */ 
FacebookToken.prototype.addNonStandardClaims = function(nonStandardClaims){
    FacebookToken.prototype.non_standard_claims = nonStandardClaims;
};

/* Called by the verify and sign functions to dynamically generate and check payload */ 
FacebookToken.prototype.getStandardClaims = function(){
    FacebookToken.prototype.standard_claims = { "name" : this.name, "age" : this.age, "email" : this.email};
    return FacebookToken.prototype.standard_claims;         
};

FacebookToken.prototype.getNonStandardClaims = function(nonStandardClaims){
    return FacebookToken.prototype.non_standard_claims;
};

/* User explicitly wants to set None Algorithm attribute */
FacebookToken.prototype.setNoneAlgorithm = function(boolVal){
    FacebookToken.prototype.NoneAlgorithm = boolVal;
};

FacebookToken.prototype.getNone = function(boolVal){
    return FacebookToken.prototype.NoneAlgorithm;
};

module.exports = FacebookToken;