const should = require('should');
const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const httpstatus = require('http-status-codes');
const Book = require('../models/bookModel');

const agent = request.agent(app);

describe('Book Post test', () => {
	it('Should allow a book to be posted and returns id', (done) => {
		const bookPost = {
			title: 'Test book',
			author: 'Test author',
			genre: 'Fiction',
		};
		agent.post('/api/books')
			.send(bookPost)
			.expect(httpstatus.CREATED)
			.end((err, result) => {
				result.body.should.have.property('_id');
				result.body.read.should.equal(false);
				done();
			});
	});
	afterEach((done) => {
		Book.remove().exec();
		done();
	});
});
