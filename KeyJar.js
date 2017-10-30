'use strict';

var keyJar = KeyJar.prototype;

function KeyJar(issuerKeys, verifySSL, removeAfter){
};

keyjar.issuerKeys= {};
keyjar.verifySSL = {};
keyjar.removeAfter= {};

keyjar.repr = function(){
    /**  Returns a list of all known parameters for this message type.
        :return: list of parameter names  */
    throw new Error("Unsupported Operation Exception");         
};

keyjar.add = function(issuer, url, args){
    /** Based on specification set a parameters value to the default value. */
    throw new Error("Unsupported Operation Exception");    
};

keyJar.addSymmetric = function(issuer, key, args){
    /**  Creates a string using the application/x-www-form-urlencoded format
        :return: A string of the application/x-www-form-urlencoded format */
    throw new Error("Unsupported Operation Exception");
};

keyJar.addKb = function(issuer, kb){
    /**  Starting with a string of the application/x-www-form-urlencoded format 
        this method creates a class instance
        :param urlencoded: The string
        :return: A class instance or raise an exception on error */
    throw new Error("Unsupported Operation Exception");    
};

keyJar.setItem = function(issuer, val){
    /** Convert this instance to another representation. Which representation 
        is given by the choice of serialization method.
        
        :param method: A serialization method. Presently 'urlencoded', 'json',
            'jwt' and 'dict' is supported.
        :param lev: 
        :param kwargs: Extra key word arguments
        :return: THe content of this message serialized using a chosen method */
    throw new Error("Unsupported Operation Exception");    
};

keyJar.items = function(){
    /**  Convert from an external representation to an internal.
        
        :param info: The input  
        :param method: The method used to deserialize the info
        :param kwargs: extra Keyword arguments
        :return: In the normal case the Message instance */
    throw new Error("Unsupported Operation Exception");    
}

keyJar.get = function(keyUser, keyType, issuer, kid, args){
    /** Return a dictionary representation of the class
        :return: A dict */
    throw new Error("Unsupported Operation Exception");    
};

keyJar.getSigningKey = function(keyType, owner, kid, args){
    /**   Direct translation, so the value for one key might be a list or a
        single value.
        :param dictionary: The info
        :return: A class instance or raise an exception on error*/
    throw new Error("Unsupported Operation Exception");    
};

keyJar.getVerifyKey = function(keyType, owner, kid, args){
    /**   Main method for adding a value to the instance. Does all the
        checking on type of value and if among allowed values.
        :param skey: string version of the key 
        :param vtyp: Type of value
        :param key: original representation of the key
        :param val: The value to add
        :param _deser: A deserializer for this value type
        :param null_allowed: Whether null is an allowed value for this key */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getEncryptKey = function(keyType, owner, kid, args){
    /** Serialize the content of this instance into a JSON string.
        
        :param lev: 
        :param indent: Number of spaces that should be used for indentation 
        :return:  */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getDecryptKey = function(keyType, owner, kid, args){
    /** Convert from a JSON string to an instance of this class.
        
        :param txt: The JSON string 
        :param kwargs: extra keyword arguments
        :return: The instantiated instance  */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.getKeyByKid = function(kid, owner){
    /**  Create a signed JWT representation of the class instance
        :param key: The signing key
        :param algorithm: The signature algorithm to use
        :param lev:
        :param lifetime: The lifetime of the JWS
        :return: A signed JWT */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.xKeys = function(var, part){
    /** Given a signed and/or encrypted JWT, verify its correctness and then
        create a class instance from the content.
        :param txt: The JWT
        :param key: keys that might be used to decrypt and/or verify the
            signature of the JWT
        :param verify: Whether the signature should be verified or not
        :param keyjar: A KeyJar that might contain the necessary key.
        :param kwargs: Extra key word arguments
        :return: A class instance */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.verifyKeys = function(part){
    /** Return a string representation of this class
        :return: A string representation of this class */
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
    /** Make sure all the required values are there and that the values are
        of the correct type */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.matchOwner = function(url){
    /** Return a list of attribute/keys/parameters of this class that has
        values. */
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
    /** Given a URL this method will add a fragment, a query part or extend
        a query part if it already exists with the information in this instance.
        
        :param location: A URL 
        :param fragment_enc: Whether the information should be placed in a
            fragment (True) or in a query part (False)
        :return: The extended URL  */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.importJwks = function(jwks, issuer){
    throw new Error("Unsupported Operation Exception");        
};

keyJar.addKeyJar= function(keyJar){
    /** Compare two message instances. This with another instance.
        
        :param other:  The other instance
        :return: True/False */
    throw new Error("Unsupported Operation Exception");        
};

keyJar.dump= function(){
    throw new Error("Unsupported Operation Exception");            
};

keyJar.restore = function(info){
    /** Return the number of parameters that has a value.
        
        :return: Number of parameters with a value. */
    throw new Error("Unsupported Operation Exception");            
};

keyJar.copy = function(){
    /**  Return the extra parameters that this instance. Extra meaning those
        that are not listed in the c_params specification.
        
        :return: The key,value pairs for keys that are not in the c_params
            specification. */
    throw new Error("Unsupported Operation Exception");            
};

keyJar.keysByAlgAndUsage = function(issuer, alg, usage){
    /** Return True if this instance only has key,value pairs for keys
        that are not defined in c_params.
        
        :return: True/False */
    throw new Error("Unsupported Operation Exception");            
};

keyJar.getIssuerKeys = function(issuer){
    /**  Update the information in this instance.
        
        :param item: a dictionary or a Message instance  */
    throw new Error("Unsupported Operation Exception");            
};

keyJar.equals= function(other){
    /** Place the information in this instance in a JSON object. Make that
        JSON object the body of a JWT. Then encrypt that JWT using the
        specified algorithms and the given keys. Return the encrypted JWT.
        :param keys: Dictionary, keys are key type and key is the value or
            simple list.
        :param enc: Content Encryption Algorithm
        :param alg: Key Management Algorithm
        :param lev: Used for JSON construction
        :return: An encrypted JWT. If encryption failed an exception will be
            raised. */
    throw new Error("Unsupported Operation Exception");            
};

keyJar.removeOutdated= function(when){
    /** Decrypt an encrypted JWT and load the JSON object that was the body
        of the JWT into this object.
        :param msg: An encrypted JWT
        :param keys: Dictionary, keys are key type and key is the value or
            simple list.
        :return: The decrypted message. If decryption failed an exception
            will be raised. */
    throw new Error("Unsupported Operation Exception");            
};


module.exports = keyJar;

