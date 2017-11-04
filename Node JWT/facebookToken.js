'use strict';


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

FacebookToken.prototype.validateRequiredFields = function(){
    if (this.name == undefined){
        throw new Error("You are missing a required parameter : name");
    }else if (this.age == undefined){
        throw new Error("You are missing the required parameter : age");
    }else if (this.email == undefined){
        throw new Error("You are missing the required parameter : email");        
    }
}

FacebookToken.prototype.addNonStandardClaims = function(nonStandardClaims){
    FacebookToken.prototype.non_standard_claims = nonStandardClaims;
}

FacebookToken.prototype.getStandardClaims = function(){
    FacebookToken.prototype.standard_claims = { "name" : this.name, "age" : this.age, "email" : this.email};
    return FacebookToken.prototype.standard_claims;         
};

FacebookToken.prototype.getNonStandardClaims = function(nonStandardClaims){
    return FacebookToken.prototype.non_standard_claims;
}

module.exports = FacebookToken;