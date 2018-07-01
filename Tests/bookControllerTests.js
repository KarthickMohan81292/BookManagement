const sinon = require('sinon');
const httpstatuscode = require('http-status-codes');
const bookControllerfn = require('../controllers/bookcontroller');

describe('Book Controller Tests', () => {
	describe('Post Test', () => {
		it('Should not allow a book without a title', () => {
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

			const bookController = bookControllerfn();
			bookController.addBook(req, res);

			res.status.calledWith(httpstatuscode.BAD_REQUEST).should.equal(true, `Bad request${res.status.args[0][0]}`);
			res.send.calledWith('Title is mandatory').should.equal(true);
		});
	});
});
