# Gutsy.js
Gutsy node server

# A simple way to create a node server

# Usage
const Gutsy = require('./gutsy');
const app = new Gutsy();

## Methods present on Gutsy;
- get
- post
- put
- delete
*These methods take 2 arguments each, first is path and second is function/object.*

- listen - takes 2 arguments: port, callback - allows the created server to listen to the specified port.
- handle: takes 2 arguments: request and response - checks if the url from which the request is coming exists in routeMap map as a key, if it exists then checks if the value of this key is a function, if yes, calls the function with the 2 arguments.

## Some methods were added to the Request and Response classes as well
# Request class methods:
- getBody: 

# Response class methods:
- toJSON
- toHTML
- render
- redirectTo
- html
- json