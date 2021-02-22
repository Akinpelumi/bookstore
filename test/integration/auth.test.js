import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

const { expect } = chai;
chai.use(chaiHttp);

describe('user login', () => {
  it('Should successfully log in a user', done => {
    chai.request(app)
      .post('/v1/bookstore-api/auth/user/login')
      .send({
        email: 'cyrus58marshall@mail.com',
        password: 'cyrus58Marshall'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('sign in successful');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('role', 'USR');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('Should return 400 when wrong login details is used', done => {
    chai.request(app)
      .post('/v1/bookstore-api/auth/user/login')
      .send({
        email: faker.internet.email(),
        password: faker.random.alphaNumeric()
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('invalid email/password');
        done();
      });
  });
});

describe('Organization login', () => {
  it('Should successfully log in an organization', done => {
    chai.request(app)
      .post('/v1/bookstore-api/auth/organization/login')
      .send({
        email: 'readspree78@gmail.com',
        password: 'readspree'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal('sign in successful');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('role', 'ORG');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('Should return 400 when wrong login details is used', done => {
    chai.request(app)
      .post('/v1/bookstore-api/auth/organization/login')
      .send({
        email: faker.internet.email(),
        password: faker.random.alphaNumeric()
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('invalid email/password');
        done();
      });
  });
});

describe('admin login', () => {
  it('Should return 400 when wrong admin login details is used', done => {
    chai.request(app)
      .post('/v1/bookstore-api/auth/admin/login')
      .send({
        email: faker.internet.email(),
        password: faker.random.alphaNumeric()
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('invalid email/password');
        done();
      });
  });
});
