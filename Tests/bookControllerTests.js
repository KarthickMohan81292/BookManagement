const should = require('should');
const sinon = require('sinon');
const httpstatuscode = require('http-status-codes');
const bookControllerfn = require('../Controllers/bookController');
// const bookModel = require('../models/bookModel');

describe('Book Controller Tests', () => {
	describe('Post Test', () => {
		it('Should not allow a book without a title', () => {
			const Book = function Book() {
				this.save = function Test() {};
			};

			const req = {
				body: {
					price: '200',
				},
			};

			const res = {
				status: sinon.spy(),
				send: sinon.spy(),
				json: sinon.spy(),
			};

			const bookController = bookControllerfn(Book);
			bookController.post(req, res);

			res.status.calledWith(httpstatuscode.BAD_REQUEST).should.equal(true, `Bad request${res.status.args[0][0]}`);
			res.send.calledWith('Title is mandatory').should.equal(true);
		});
		it('Should allow a book to be posted', () => {
			const req = {
				body: {
					title: 'Test Book',
					price: '200',
					genre: 'Fantasy',
					author: 'Author',
				},
			};

			const res = {
				status: sinon.spy(),
				send: sinon.spy(),
				json: sinon.spy(),
			};
			const Book = function Book() {
				this.save = function Test(callback) {
					callback();
				};
			};
			const bookController = bookControllerfn(Book);
			bookController.post(req, res);
			res.status.calledWith(httpstatuscode.CREATED).should.equal(true);
		});
	});
});
