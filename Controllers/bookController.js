const httpstatus = require('http-status-codes');

const bookConroller = function bookConroller(Book) {
	const get = function get(req, res) {
		const query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		if (req.query.language) {
			query.language = req.query.language;
		}
		Book.find(query, (err, books) => {
			if (err) {
				res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.json(books);
			}
		});
	};
	const post = function post(req, res) {
		if (!req.body.title) {
			res.status(httpstatus.BAD_REQUEST);
			res.send('Title is mandatory');
		} else {
			const book = new Book(req.body);
			book.save((err) => {
				if (err) {
					res.status(httpstatus.INTERNAL_SERVER_ERROR);
					res.send(err);
				} else {
					res.status(httpstatus.CREATED);
					res.send(book);
				}
			});
		}
	};
	const use = function use(req, res, next) {
		Book.findById(req.params.Id, (err, book) => {
			if (err) {
				res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			} else if (book) {
				req.book = book;
				next();
			} else {
				res.status(httpstatus.NOT_FOUND).send('Book not found');
			}
		});
	};
	const put = function put(req, res) {
		req.book.title = req.body.title;
		req.book.author = req.body.author;
		req.book.price = req.body.price;
		req.book.read = req.body.read;
		req.book.genre = req.body.genre;
		req.book.language = req.body.language;
		req.book.save((err) => {
			if (err) {
				res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.json(req.book);
			}
		});
		res.json(req.book);
	};
	const patch = function patch(req, res) {
		if (req.body._id) {
			delete req.body._id;
		}
		Object.keys(req.body).forEach((key) => {
			req.book[key] = req.body[key];
		});
		req.book.save((err) => {
			if (err) {
				res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.json(req.book);
			}
		});
	};
	const deletefunction = function deletefunction(req, res) {
		req.book.remove((err) => {
			if (err) {
				res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpstatus.NO_CONTENT).send('Deleted successfully');
			}
		});
	};
	const getbyId = function getbyId(req, res) {
		res.json(req.book);
	};

	return {
		get,
		post,
		put,
		patch,
		use,
		getbyId,
		deletefunction,
	};
};

module.exports = bookConroller;
