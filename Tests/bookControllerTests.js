var should = require('should'),
    sinon = require('sinon'),
    httpstatuscode = require('http-status-codes');

describe('Book Controller Tests', function() {
    describe('Post Test', function() {
        it('Should not allow a book without a title', function() {
            var Book = function() {
                this.save = function() {};
            };

            var req = {
                body: {
                    price: '200',
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };
            
            var bookController = require('../Controllers/bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(httpstatuscode.BAD_REQUEST).should.equal(true, 'Bad request' + res.status.args[0][0]);
            res.send.calledWith('Title is mandatory').should.equal(true);
        })
    })
})