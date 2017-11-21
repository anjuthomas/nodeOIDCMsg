
# 0Auth and Open Id Connect Message Protocol - Node JS

This is a module that implements the protocol messages in OAuth2 and OpenID Connect.

## What is the message class?

Since instances of Message will be used in an environment where information are to be sent over a wire it must be possible to serialize the information in such an instance to a format that can be transmitted over-the-wire.

Because of this a number of method has been added to support serialization to and deserialization from a number of representations that are used in the OAuth2 and OIDC protocol exchange.


## Message types 

The format supported are:
  * JSON
  * urlencoded
  * Json Web Token (JWT) signed and/or encrypted.
  
  
## How to serialize and deserialize other types using a token profile

To serialize and deserialize a JWT type :

When a token profile’s toJWT method is called, it calls the JWT classes sign method which extends the message class and serializes the JWT type.

When a token profile’s fromJWT method is called, it calls the JWT classes decode method which extends the message class and deserializes the JWT type.

The Message class' sign and verify methods handle the common task, such as verifying claims, among all the three types.

Similarily, the following following token profile methods can be used to serialize and deserialize other types. 

* toJSON 

* fromJSON

* toUrlEncoded 

* fromUrlEncoded
  

## How to create a token profile and add standard claims 

A token profile is a security token that enables identity and security information to be shared across security domains. Token Profiles folder contains the different types of token profile classes including the Basic ID Token class. A token profile contains the token properties, standard, non standard and verification claims Each token profile can be instantiated with its standard claims. 

If any of the standard claims are not specified such as the iss while creating a token profile, it will throw the following error for example : “You are missing a required parameter : iss”. 

```
var clockTimestamp = 1000000000;
var basicIdToken = new BasicIdToken('issuer','subject', clockTimestamp, "jti");

```


## Supported token profile types

### BasicIdToken

* Standard claims : *iss, sub, iat, jti*

* Nonstandard claims : *aud, exp, nbf*

### ExtendedIdToken

* Standard claims : *name, email, picture, iss, sub, iat*

* Non standard claims : *aud, exp, nbf*

### AccessToken

* Standard claims : *iss, sub, iat*

* Nonstandard claims : *aud, exp*

### FacebookIdToken

* Standard claims : *user_id, app_id, issued_at*

* Nonstandard claims : *expired_at*

### GoogleIdToken

* Standard claims : *name, email, picture, iss, sub, iat*

* Nonstandard claims : *exp, aud*

### ImplicitAccessToken

* Standard claims : *iss, sub, iat*

* Nonstandard claims : *aud*

### RefreshToken

* Standard claims : *refresh_token, access_token*

### RiscToken

* Standard claims : *jti, iss, sub, iat*

* Nonstandard claims : *aud, nbf, exp*

### ScopedAccessToken

* Standard claims : *iss, sub, iat, scope* 

* Nonstandard claims : *aud, exp* 



## How to add non standard claims

Non standard claims can be added separately by creating a new basic id token and then calling the method ‘addNonStandardClaims’.

```
basicIdToken.addNonStandardClaims({"aud" : "audience", "nbf" : clockTimestamp + 2, "exp" : clockTimestamp + 3});
```


## How to access standard & non standard claims

To access the standard claims that were previously added to a token, it can be done as follows : 

```
var standardClaims = basicIdToken.getStandardClaims();  
       
var nonStandardClaims = basicIdToken.getNonStandardClaims(); 
```


## Support for jti & kid
Header includes claims such as kid and can be used to select the key wihtin a JWKS needed to verify the signature. Can also be passed in a non standard claim for each token. Kid can be used to select the key within a JWKS needed to verify the signature.



## How to set none algorithm type 

Each token has a NoneAlgorithm boolean value which is set to False by default unless set explicitly. 

```
basicIdToken.setNoneAlgorithm(true);
```

If the none algorithm property above is not set, the following error will be thrown when algorithm ‘none’ is used : 'Cannot use none algorithm unless explicitly set'



## How to serialize a JWT type using a token profile

To sign a JWT with the Basic ID Token, call the token’s toJWT method with the secret and any additional options that need to be passed like “algorithm”. A secretOrPublicKey is a string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA

```
var signedJWT = basicIdToken.toJWT('shhhh');
```


## Other options for serialization
Options are other inputs or additional information that might be needed and are not part of the payload, for ex : 'algorithm'. Other options such as follows can be passed as in as the fourth parameter to token profile’s fromJWT method.

  * algorithm (default: HS256)
  * expiresIn: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
  * notBefore: expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
  * audience
  * issuer
  * jwtid
  * subject
  * noTimestamp
  * header
  * keyid
  
 ```
 var signedJWT = basicIdToken.toJWT('shhhh', {algorithm : 'HS256'});
```

If payload is not a buffer or a string, it will be coerced into a string using JSON.stringify.
There are no default values for expiresIn, notBefore, audience, subject, issuer. These claims can also be provided in the payload directly with exp, nbf, aud, sub and iss respectively, but you can't include in both places.
Remember that exp, nbf and iat are NumericDate, see related Token Expiration (exp claim)
The header can be customized via the options.header object.
Generated jwts will include an iat (issued at) claim by default unless noTimestamp is specified. If iat is inserted in the payload, it will be used instead of the real timestamp for calculating other things like exp given a timespan in options.expiresIn.



## How to deserialize & verify standard or non standard claims

A token profile’s fromJWT method can be used to decode a JWT. While the JWT is decoded, the backend also verifies the payload to check if it matches the expected claims.  Claims to be verified can be passed in as key value pairs as the third parameter of the fromJwt method. 

```
var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{'clockTimestamp' : clockTimestamp});
```

Known non standard claims have to be verified by using the following parameters 
Audience ->  aud : if you want to check audience (aud), provide a value here. The audience can be checked against a string
Iat -> maxAge : the maximum allowed age for tokens to still be valid. It is expressed in seconds or a string describing a time span zeit/ms. Eg: 1000, "2 days", "10h", "7d"
exp/ nbf -> clockTolerance : number of seconds to tolerate when checking the nbf and exp claims, to deal with small clock differences among different servers



## Other options for deserialization 

Options are other inputs or additional information that might be needed and are not part of the payload, for ex : 'algorithm'. Other options such as follows can be passed as in as the fourth parameter to token profile’s fromJWT method.


### Options
* algorithms: List of strings with the names of the allowed algorithms. For instance, ["HS256", "HS384"].
* audience: if you want to check audience (aud), provide a value here. The audience can be checked against a string, a regular expression or a list of strings and/or regular expressions. Eg: "urn:foo", /urn:f[o]{2}/, [/urn:f[o]{2}/, "urn:bar"]
* issuer (optional): string or array of strings of valid values for the iss field.
* ignoreExpiration: if true do not validate the expiration of the token.
* ignoreNotBefore...
* subject: if you want to check subject (sub), provide a value here
* clockTolerance: number of seconds to tolerate when checking the nbf and exp claims, to deal with small clock differences among different servers
* maxAge: the maximum allowed age for tokens to still be valid. It is expressed in seconds or a string describing a time span zeit/ms. Eg: 1000, "2 days", "10h", "7d".
* clockTimestamp: the time in seconds that should be used as the current time for all necessary comparisons.

For example, you can use the options algorithm and clockTimestamp as follows :
```
var decodedPayload = basicIdToken.fromJWT(signedJWT, 'shhhh', {"iss" : "issuer", "sub": "subject", "aud" : "audience", 'maxAge': '1d', 'clockTolerance' : 10, "jti": "jti"},{algorithm: 'HS256', 'clockTimestamp' : clockTimestamp});
```

## Callbacks
Callbacks can be provided as one of the parameters for a token profile's toJwt and fromJwt method.

(Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.

(Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.




