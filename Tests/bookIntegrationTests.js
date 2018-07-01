const should = require('should');
const request = require('supertest');
const app = require('../app.js');
const httpStatus = require('http-status-codes');
const Book = require('../models/bookmodel');


const agent = request.agent(app);

describe('Book API test', () => {
	const bookElement = {
		title: 'Test book',
		author: 'Test author',
		genre: 'Fiction',
		language: 'English',
	};
	it('Should allow a book to be posted and returns id', (done) => {
		agent.post('/api/books')
			.send(bookElement)
			.expect(httpStatus.CREATED)
			.end((err, result) => {
				result.body.should.have.property('_id');
				result.body.read.should.equal(false);
				done();
			});
	});
	it('Should get a book by id', (done) => {
		const book = new Book(bookElement);
		book.save();
		agent.get(`/api/books/${book._id}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.should.have.property('_id');
				result.body.read.should.equal(false);
				result.body.title.should.equal(bookElement.title);
				result.body.author.should.equal(bookElement.author);
				done();
			});
	});
	it('Should get multiple books', (done) => {
		let book = new Book(bookElement);
		book.save();
		const bookElement1 = {
			title: 'Test book 1',
			author: 'Test author 1',
		};
		book = new Book(bookElement1);
		book.save();

		agent.get('/api/books')
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(2);
				result.body[1].title.should.equal(bookElement1.title);
				done();
			});
	});
	it('Should get book by genre and language', (done) => {
		let book = new Book(bookElement);
		book.save();
		const bookElement1 = {
			title: 'Test book 1',
			genre: 'Fantasy',
			language: 'Tamil',
		};
		book = new Book(bookElement1);
		book.save();

		agent.get(`/api/books?genre=${bookElement1.genre}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(1);
				result.body[0].title.should.equal(bookElement1.title);
				result.body[0].genre.should.equal(bookElement1.genre);
			});
		agent.get(`/api/books?language=${bookElement.language}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(1);
				result.body[0].title.should.equal(bookElement.title);
				result.body[0].language.should.equal(bookElement.language);
				done();
			});
	});
	it('Should allow a book to be completely replaced', (done) => {
		const book = new Book(bookElement);
		book.save();
		const bookElement1 = {
			title: 'Test book 1',
			read: true,
		};
		agent.put(`/api/books/${book._id}`)
			.send(bookElement1)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.read.should.equal(true);
				result.body.title.should.equal(bookElement1.title);
				should(result.body).not.have.property('genre');
				done();
			});
	});
	it('Should allow an attribute of book to be updated', (done) => {
		const book = new Book(bookElement);
		book.save();
		const bookProperty = {
			title: 'Test Book 1',
			read: true,
		};
		agent.patch(`/api/books/${book._id}`)
			.send(bookProperty)
			.expect(httpStatus.OK)
			.end((err, result) => {
				// console.log(result);
				result.body.read.should.equal(true);
				result.body.title.should.equal(bookProperty.title);
				result.body.genre.should.equal(bookElement.genre);
				done();
			});
	});
	it('Should allow a book to be deleted', (done) => {
		const book = new Book(bookElement);
		book.save();
		agent.delete(`/api/books/${book._id}`)
			.expect(httpStatus.NO_CONTENT)
			.end(() => {
				// console.log(result);
				Book.findById(book._id, (err, bookObject) => {
					should(bookObject).be.empty;
					done();
				});
			});
	});
	afterEach((done) => {
		Book.remove().exec();
		done();
	});
});
