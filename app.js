const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const Book = require('./models/bookModel');
const router = require('./Routes/bookRoutes')(Book);


if (config.env === 'Test') {
	mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
	mongoose.connect('mongodb://localhost/bookAPI');
}
const { port } = config;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);


app.listen(port, () => {
	// console.log("Gulp running on port " + port);
});
// console.log("Server listening on " + port);

module.exports = app;
