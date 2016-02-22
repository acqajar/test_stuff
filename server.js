var express = require('express');

var app = express();

// Can also type -- express().listen();

// add validation to server to see if it's running 
app.listen(3000, function(err){
	if(err) throw err;
	console.log("Server is Running");
})