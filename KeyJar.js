'use strict';

var keyJar = KeyJar.prototype;

function KeyJar(issuerKeys, verifySSL, removeAfter){
};

keyjar.issuerKeys= {};
keyjar.verifySSL = {};
keyjar.removeAfter= {};

keyjar.repr = function(){
    throw new Error("Unsupported Operation Exception");         
};

keyjar.add = function(issuer, url, args){
    throw new Error("Unsupported Operation Exception");    
};

keyJar.addSymmetric = function(issuer, key, args){
    throw new Error("Unsupported Operation Exception");
};

keyJar.addKb = function(issuer, kb){
    throw new Error("Unsupported Operation Exception");    
};

keyJar.setItem = function(issuer, val){
    throw new Error("Unsupported Operation Exception");    
};

keyJar.items = function(){
    throw new Error("Unsupported Operation Exception");    
}

keyJar.get = function(keyUser, keyType, issuer, kid, args){
    throw new Error("Unsupported Operation Exception");    
};

keyJar.getSigningKey = function(keyType, owner, kid, args){
    throw new Error("Unsupported Operation Exception");    
};

keyJar.getVerifyKey = function(keyType, owner, kid, args){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getEncryptKey = function(keyType, owner, kid, args){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getDecryptKey = function(keyType, owner, kid, args){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getKeyByKid = function(kid, owner){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.xKeys = function(var, part){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.verifyKeys = function(part){
    throw new Error("Unsupported Operation Exception");        
}

keyJar.decryptKeys = function(part){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getItem = function(issuer){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.removeKey = function(issuer, keyType, key){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.update= function(kj){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.matchOwner = function(url){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.toString= function(){
    /** Return the value of a specified parameter. */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getKeys = function(){
    /**   Return the value of a specific parameter. If the parameter does not
        have a value return the default value.

        :param item: The name of the parameter 
        :param default: Default value
        :return: The value of the parameter or, if that doesn't exist, 
        the default value  */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.loadKeys= function(pcr, issuer, replace){
    /**  Return a list of tuples (key, value) representing all parameters
        of this class instance that has a value.
        
        :return: iterator  */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.find = function(source, issuer){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.dumpIssuerKeys = function(issuer){
    /** Answers the question: does this parameter have a value?
        
        :param item: The name of the parameter 
        :return: True/False */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.exportJwks = function(isPrivate, issuer){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.importJwks = function(jwks, issuer){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.addKeyJar= function(keyJar){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.dump= function(){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.restore = function(info){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.copy = function(){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.keysByAlgAndUsage = function(issuer, alg, usage){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.getIssuerKeys = function(issuer){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.equals= function(other){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.removeOutdated= function(when){
    throw new Error("Unsupported Operation Exception");            
};

module.exports = keyJar;

