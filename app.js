var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Book = require('./models/bookModel');
var router = require('./Routes/bookRoutes')(Book);
var port = process.env.PORT;
var db = mongoose.connect('mongodb://localhost/jobserverAPI');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', router);


app.listen(port, function() {
	console.log("Gulp running on port " + port);
});
console.log("Server listening on " + port);