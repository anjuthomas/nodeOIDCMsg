'use strict';

var jwt = JWT.prototype;

function JWT(keyjar, iss='', lifetime=0, signAlg='RS256', msgType=JsonWebToken, encrypt=False, encEnc="A128CBC-HS256", encAlg="RSA1_5"){
};

jwt.encrypt = function(payload, cty="JWT"){
    throw new Error("Unsupported Operation Exception");         
};

jwt.packInit = function(){
    throw new Error("Unsupported Operation Exception");    
};

jwt.packKey= function(owner="", kid=""){
    throw new Error("Unsupported Operation Exception");
};

jwt.pack = function(kid="", owner="", cls_instance=None, kwargs){
    throw new Error("Unsupported Operation Exception");    
};

jwt.verify = function(rj, token){
    throw new Error("Unsupported Operation Exception");    
};

jwt.decrypt = function(rj, token){
    throw new Error("Unsupported Operation Exception");    
}

jwt.unpack = function(token){
    throw new Error("Unsupported Operation Exception");    
};

module.exports = jwt;

