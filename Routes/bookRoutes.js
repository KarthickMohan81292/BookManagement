var express = require('express');
var httpstatus = require('http-status-codes');

var bookRouter = function(Book) {
	var router = express.Router();
	var bookController = require('../Controllers/bookController')(Book);
	router.route('/books')
		.get(bookController.get)
		.post(bookController.post);

	router.use('/books/:Id', bookController.use);
	router.route('/books/:Id')
		.get(bookController.getbyId)
		.put(bookController.put)
		.patch(bookController.patch)
		.delete(bookController.deletefunction);

	return router;
};

module.exports = bookRouter;
