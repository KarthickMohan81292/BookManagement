const express = require('express');
const bookControllerfn = require('../controllers/bookcontroller');

const bookRouter = function bookRouter() {
	const router = express.Router();
	const bookController = bookControllerfn();
	router.route('/books')
		.get(bookController.getBooks)
		.post(bookController.addBook);

	router.use('/books/:Id', bookController.findBook);
	router.route('/books/:Id')
		.get(bookController.getBookbyId)
		.put(bookController.replaceBook)
		.patch(bookController.updateBook)
		.delete(bookController.removeBook);

	return router;
};

module.exports = bookRouter;
