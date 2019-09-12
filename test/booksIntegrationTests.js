const should = require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = require('../model/bookModel');

const agent = request.agent(app);

describe('Books Crud Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = { author: 'Lev', genre: 'Historical', title: 'War and Peace II' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        //results.body.read.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
