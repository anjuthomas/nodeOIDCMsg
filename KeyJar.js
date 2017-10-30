'use strict';

var keyJar = KeyJar.prototype;

function KeyJar(issuerKeys, verifySSL, removeAfter){
};

keyjar.issuerKeys= {};
keyjar.verifySSL = false;
keyjar.removeAfter= 0;

keyjar.repr = function(){
    throw new Error("Unsupported Operation Exception");         
};

keyjar.add = function(issuer, url, args){
    /** Add a set of keys by url. This method will create a 
        :py:class:`oicmsg.oauth2.keybundle.KeyBundle` instance with the
        url as source specification.
        
        :param issuer: Who issued the keys
        :param url: Where can the key/-s be found
        :param kwargs: extra parameters for instantiating KeyBundle
        :return: A :py:class:`oicmsg.oauth2.keybundle.KeyBundle` instance */
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
    /** :param key_use: A key useful for this usage (enc, dec, sig, ver)
        :param key_type: Type of key (rsa, ec, symmetric, ..)
        :param issuer: Who is responsible for the keys, "" == me
        :param kid: A Key Identifier
        :return: A possibly empty list of keys */
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

keyJar.xKeys = function(variable, part){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.verifyKeys = function(part){
    /** Keys for me and someone else.
        :param part: The other part
        :return: dictionary of keys */
    throw new Error("Unsupported Operation Exception");        
}

keyJar.decryptKeys = function(part){
    /** Keys for me and someone else.
        :param part: The other part
        :return: dictionary of keys */
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
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getKeys = function(){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.loadKeys= function(pcr, issuer, replace){
    /**  Fetch keys from another server
        :param pcr: The provider information
        :param issuer: The provider URL
        :param replace: If all previously gathered keys from this provider
            should be replace.
        :return: Dictionary with usage as key and keys as values */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.find = function(source, issuer){
    /** Find a key bundle
    :param source: A url
    :param issuer: The issuer of keys */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.dumpIssuerKeys = function(issuer){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.exportJwks = function(isPrivate, issuer){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.importJwks = function(jwks, issuer){
    /** :param jwks: Dictionary representation of a JWKS
        :param issuer: Who 'owns' the JWKS */
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
    /** Goes through the complete list of issuers and for each of them removes
        outdated keys.
        Outdated keys are keys that has been marked as inactive at a time that
        is longer ago then some set number of seconds.
        The number of seconds a carried in the remove_after parameter.
        :param when: To facilitate testing */
    throw new Error("Unsupported Operation Exception");            
};

keyJar.addKey= function(issuer, key, keyType, kid, noKidIssuer){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.getJwtVerifyKeys= function(key, jso, header, jwt, kwargs){
    /**  Get keys from a keyjar. These keys should be usable to verify a 
        signed JWT.
        :param keyjar: A KeyJar instance
        :param key: List of keys to start with
        :param jso: The payload of the JWT, expected to be a dictionary.
        :param header: The header of the JWT
        :param jwt: A jwkest.jwt.JWT instance
        :param kwargs: Other key word arguments
        :return: list of usable keys */
    throw new Error("Unsupported Operation Exception");            
};

module.exports = keyJar;

