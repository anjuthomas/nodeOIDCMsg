'use strict';

var mutableMapping = require('./MutableMapping');
var DecodeError = require('./lib/DecodeError');
var InvalidAlgorithmException = require('./lib/InvalidAlgorithmException');
var KeyError = require('./lib/KeyError');
var MissingRequiredAttributeError = require('./lib/MissingRequiredAttributeError');
var NotAllowedValueError = require('./lib/NotAllowedValueError');
var ParameterError = require('./lib/ParameterError');
var TooManyValuesError = require('./lib/TooManyValuesError');
var TypeError = require('./lib/TypeError');
var UnicodeEncodeError = require('./lib/UnicodeEncodeError');

var message = Message.prototype;

function Message(kwargs){
};

message.c_param = {};
message.c_default = {};
message.c_allowed_values = {};

message.parameters = function(){
    /**  Returns a list of all known parameters for this message type.
        :return: list of parameter names  */
    throw new Error("Unsupported Operation Exception");         
};

message.setDefaults = function(){
    /** Based on specification set a parameters value to the default value. */
    throw new Error("Unsupported Operation Exception");    
};

message.toUrlEncoded = function(level){
    /**  Creates a string using the application/x-www-form-urlencoded format
        :return: A string of the application/x-www-form-urlencoded format */
    throw new Error("Unsupported Operation Exception");
};

message.fromUrlEncoded = function(urlEncoded, kwargs){
    /**  Starting with a string of the application/x-www-form-urlencoded format 
        this method creates a class instance
        :param urlencoded: The string
        :return: A class instance or raise an exception on error */
    throw new Error("Unsupported Operation Exception");    
};

message.serialize = function(method="urlencoded", lev=0, kwargs){
    /** Convert this instance to another representation. Which representation 
        is given by the choice of serialization method.
        
        :param method: A serialization method. Presently 'urlencoded', 'json',
            'jwt' and 'dict' is supported.
        :param lev: 
        :param kwargs: Extra key word arguments
        :return: THe content of this message serialized using a chosen method */
    throw new Error("Unsupported Operation Exception");    
};

message.deserialize = function(info, method="urlencoded", kwargs){
    /**  Convert from an external representation to an internal.
        
        :param info: The input  
        :param method: The method used to deserialize the info
        :param kwargs: extra Keyword arguments
        :return: In the normal case the Message instance */
    throw new Error("Unsupported Operation Exception");    
}

message.toDict = function(lev){
    /** Return a dictionary representation of the class
        :return: A dict */
    throw new Error("Unsupported Operation Exception");    
};

message.fromDict = function(dictionary, kwargs){
    /**   Direct translation, so the value for one key might be a list or a
        single value.
        :param dictionary: The info
        :return: A class instance or raise an exception on error*/
    throw new Error("Unsupported Operation Exception");    
};

message.addValue = function(skey, vtyp, key, val,_deser, isNullAllowed){
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

message.toJson = function(lev, indent){
    /** Serialize the content of this instance into a JSON string.
        
        :param lev: 
        :param indent: Number of spaces that should be used for indentation 
        :return:  */
    throw new Error("Unsupported Operation Exception");        
};

message.fromJson = function(txt){
    /** Convert from a JSON string to an instance of this class.
        
        :param txt: The JSON string 
        :param kwargs: extra keyword arguments
        :return: The instantiated instance  */
    throw new Error("Unsupported Operation Exception");        
};

message.toJwt = function(key=None, algorithm="", lev=0){
    /**  Create a signed JWT representation of the class instance
        :param key: The signing key
        :param algorithm: The signature algorithm to use
        :param lev:
        :param lifetime: The lifetime of the JWS
        :return: A signed JWT */
    throw new Error("Unsupported Operation Exception");        
};

message.fromJwt = function(txt, key=None, verify=True, keyjar=None, kwargs){
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

message.toString = function{
    /** Return a string representation of this class
        :return: A string representation of this class */
    throw new Error("Unsupported Operation Exception");        
}

message.addKey = function(keyjar, issuer, key, keyType="", kid="", noKidIssuer=None){
    throw new Error("Unsupported Operation Exception");        
};

message.getVerifyKeys = function(keyjar, key, jso, header, jwt, kwargs){
    throw new Error("Unsupported Operation Exception");        
};

message.typeCheck = function(type, allowed, val, na){
    throw new Error("Unsupported Operation Exception");        
};

message.verify = function(kwargs){
    /** Make sure all the required values are there and that the values are
        of the correct type */
    throw new Error("Unsupported Operation Exception");        
};

message.getKeys= function(){
    /** Return a list of attribute/keys/parameters of this class that has
        values. */
    throw new Error("Unsupported Operation Exception");        
};

message.getItem = function(item){
    /** Return the value of a specified parameter. */
    throw new Error("Unsupported Operation Exception");        
};

message.get = function(item, defaultValue){
    /**   Return the value of a specific parameter. If the parameter does not
        have a value return the default value.
        
        :param item: The name of the parameter 
        :param default: Default value
        :return: The value of the parameter or, if that doesn't exist, 
        the default value  */
    throw new Error("Unsupported Operation Exception");        
};

message.getItems = function(){
    throw new Error("Unsupported Operation Exception");        
};

message.getValues = function(){
    throw new Error("Unsupported Operation Exception");        
};

message.contains = function(item){
    throw new Error("Unsupported Operation Exception");        
};

message.request = function(location, fragment_enc){
    throw new Error("Unsupported Operation Exception");        
};

message.setItem = function(key, value){
    throw new Error("Unsupported Operation Exception");        
};

message.equals = function(other){
    throw new Error("Unsupported Operation Exception");        
};

message.deleteItem = function(key){
    throw new Error("Unsupported Operation Exception");            
};

message.getLength = function(){
    throw new Error("Unsupported Operation Exception");            
};

message.extra = function(){
    throw new Error("Unsupported Operation Exception");            
};

message.onlyExtras = function(){
    throw new Error("Unsupported Operation Exception");            
};

message.update = function(item){
    throw new Error("Unsupported Operation Exception");            
};

message.toJWE = function(keys, enc, alg, lev){
    throw new Error("Unsupported Operation Exception");            
};

message.fromJWE = function(msg, keys){
    throw new Error("Unsupported Operation Exception");            
};

message.weed = function(){
    throw new Error("Unsupported Operation Exception");            
};

message.removeBlanks = function(){
    throw new Error("Unsupported Operation Exception");            
};

module.exports = message;

