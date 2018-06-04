var httpstatus = require('http-status-codes');

var bookConroller = function(Book) {
	var get = function(req, res) {
		var query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		if (req.query.language) {
			query.language = req.query.language;
		}
		Book.find(query, function(err, books) {
			if (err) {
				res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			}
			else {
				res.json(books);
			}
		});
	};
	var post = function(req, res) {
		var book = new Book(req.body);
		book.save(function(err) {
			if (err) {
				res.send(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			}
			else {
				res.status(httpstatus.CREATED).send('Record created successfully');
				res.json(book);
			}
		});
	};
	var use = function(req, res, next) {
		Book.findById(req.params.Id, function(err, book) {
			if (err) {
				res.send(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			}
			else if (book) {
				req.book = book;
				next();
			}
			else {
				res.send(httpstatus.NOT_FOUND).send('Book not found');
			}
		})
	};
	var put = function(req, res) {
		req.book.title = req.body.title;
		req.book.author = req.body.author;
		req.book.price = req.body.price;
		req.book.read = req.body.read;
		req.book.genre = req.body.genre;
		req.book.language = req.body.language;
		req.book.save(function(err) {
			if (err) {
				res.send(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			}
			else {
				res.json(req.book);
			}
		});
		res.json(req.book);
	};
	var patch = function(req, res) {
		if (req.body._id) {
			delete req.body._id;
		}
		for (var attribute in req.body) {
			req.book[attribute] = req.body[attribute];
		}
		req.book.save(function(err) {
			if (err) {
				res.send(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			}
			else {
				res.json(req.book);
			}
		});
	};
	var deletefunction = function(req, res) {
		req.book.remove(function(err) {
			if (err) {
				res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
			}
			else {
				res.status(httpstatus.NO_CONTENT).send('Deleted successfully');
			}
		})
	};
	var getbyId = function(req, res) {
		res.json(req.book);
	};

	return {
		get: get,
		post: post,
		put: put,
		patch: patch,
		use: use,
		getbyId: getbyId,
		deletefunction: deletefunction
	};
};

module.exports = bookConroller;
