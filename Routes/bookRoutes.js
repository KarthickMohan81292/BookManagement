const express = require('express');
const bookControllerfn = require('../Controllers/bookController');

const bookRouter = function bookRouter(Book) {
	const router = express.Router();
	const bookController = bookControllerfn(Book);
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
