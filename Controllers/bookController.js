const httpStatus = require('http-status-codes');
const Book = require('../models/bookmodel');

const bookConroller = function bookConroller() {
	const getBooks = function getBooks(req, res) {
		const query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		if (req.query.language) {
			query.language = req.query.language;
		}
		Book.find(query, (err, books) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.OK).send(books);
			}
		});
	};
	const addBook = function addBook(req, res) {
		if (!req.body.title) {
			res.status(httpStatus.BAD_REQUEST);
			res.send('Title is mandatory');
		} else {
			const book = new Book(req.body);
			book.save((err) => {
				if (err) {
					res.status(httpStatus.INTERNAL_SERVER_ERROR);
					res.send(err);
				} else {
					res.status(httpStatus.CREATED);
					res.send(book);
				}
			});
		}
	};
	const findBook = function findBook(req, res, next) {
		Book.findById(req.params.Id, (err, book) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else if (book) {
				req.book = book;
				next();
			} else {
				res.status(httpStatus.NOT_FOUND).send('Book not found');
			}
		});
	};
	const replaceBook = function replaceBook(req, res) {
		req.book.title = req.body.title;
		req.book.author = req.body.author;
		req.book.price = req.body.price;
		req.book.read = req.body.read;
		req.book.genre = req.body.genre;
		req.book.language = req.body.language;
		req.book.save((err) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.OK).json(req.book);
			}
		});
	};
	const updateBook = function updateBook(req, res) {
		if (req.body._id) {
			delete req.body._id;
		}
		Object.keys(req.body).forEach((key) => {
			req.book[key] = req.body[key];
		});
		req.book.save((err) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.OK).json(req.book);
			}
		});
	};
	const removeBook = function removeBook(req, res) {
		req.book.remove((err) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.NO_CONTENT).send('Deleted successfully');
			}
		});
	};
	const getBookbyId = function getBookbyId(req, res) {
		res.status(httpStatus.OK).json(req.book);
	};

	return {
		getBooks,
		addBook,
		replaceBook,
		updateBook,
		findBook,
		getBookbyId,
		removeBook,
	};
};

module.exports = bookConroller;
