const mongoose = require('mongoose');
const config = require('../config');


const dbConnect = function dbConnect() {
	if (config.env === 'test') {
		mongoose.connect('mongodb://localhost/bookAPI_Test');
	} else {
		mongoose.connect('mongodb://localhost/bookAPI');
	}
};

module.exports = dbConnect;
