'use strict';
var jwt = require('jsonwebtoken');


function Message(){
};

Message.prototype.SERIALIZATION_TYPE = {JWT: "JWT", JSON: "JSON", URL_ENCODED:"URL_ENCODED"};

Message.prototype.format = function(serializationType){
    /**  Returns a list of all known parameters for this message type.
        :return: list of parameter names  */
    if (Message.prototype.SERIALIZATION_TYPE.JWT == serializationType){
        return jwt;
    }else if (Message.prototype.SERIALIZATION_TYPE.JSON == serializationType){
        // return JSON Object
    }else{
        // return URL Encoded Object
    }        
};

module.exports = Message;

