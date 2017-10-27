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

function Message(args){
};

message.ToUrlEncoded = function(level){
    /**  Creates a string using the application/x-www-form-urlencoded format
        :return: A string of the application/x-www-form-urlencoded format */
    throw new Error("Unsupported Operation Exception");
};

message.FromUrlEncoded = function(urlEncoded, kwargs){
/**  Starting with a string of the application/x-www-form-urlencoded format 
        this method creates a class instance
        :param urlencoded: The string
        :return: A class instance or raise an exception on error */
    throw new Error("Unsupported Operation Exception");    
};

message.ToDict = function(lev){
    throw new Error("Unsupported Operation Exception");    
};

message.FromDict = function(dictionary, kwargs){
    throw new Error("Unsupported Operation Exception");    
};

message.AddValue = function(skey, vtyp, key, val, key, avl, _deser, isNullAllowed){
    throw new Error("Unsupported Operation Exception");        
};

message.ToJson = function(lev, indent){
    throw new Error("Unsupported Operation Exception");        
};

message.FromJson = function(txt){
    throw new Error("Unsupported Operation Exception");        
};

message.ToJwt = function(key=None, algorithm="", lev=0){
    throw new Error("Unsupported Operation Exception");        
};

message.AddKey = function(keyjar, issuer, key, keyType="", kid="", noKidIssuer=None){
    throw new Error("Unsupported Operation Exception");        
};

message.GetVerifyKeys = function(keyjar, key, jso, header, jwt, kwargs){
    throw new Error("Unsupported Operation Exception");        
};

message.FromJwt = function(txt, key=None, verify=True, keyjar=None, kwargs){
    throw new Error("Unsupported Operation Exception");        
};

message.TypeCheck = function(type, allowed, val, na){
    throw new Error("Unsupported Operation Exception");        
};

message.Verify = function(args){
    throw new Error("Unsupported Operation Exception");        
};

message.getKeys= function(){
    throw new Error("Unsupported Operation Exception");        
};

message.getItem = function(item){
    throw new Error("Unsupported Operation Exception");        
};

message.get = function(item, defaultValue){
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

