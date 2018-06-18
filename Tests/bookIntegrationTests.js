var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app),
    httpstatus = require('http-status-codes');


describe('Book Post test', function() {
    it('Should allow a book to be posted and returns id', function(done) {
        var bookPost = {
            title: 'Test book',
            author: 'Test author',
            genre: 'Fiction'
        };
        agent.post('/api/books')
            .send(bookPost)
            .expect(httpstatus.CREATED)
            .end(function(err, result) {
                console.log(result);
                result.body.should.have.property('_id');
                result.body.read.should.equal(false);
                done();
            })
    });
    afterEach(function(done) {
        Book.remove().exec();
        done();
    })
})
    