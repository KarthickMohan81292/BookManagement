var mongoose = require('mongoose');
var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");
var app = express();
var Book = require("./models/bookModel");
var router = require("./Routes/bookRoutes")(Book);
var db;
if (config.env === 'Test') {
	db = mongoose.connect('mongodb://localhost/bookAPI_Test');
}
else {
	db = mongoose.connect('mongodb://localhost/bookAPI');	
}
var port = config.port;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api", router);


app.listen(port, function() {
	//console.log("Gulp running on port " + port);
});
//console.log("Server listening on " + port);

module.exports = app;