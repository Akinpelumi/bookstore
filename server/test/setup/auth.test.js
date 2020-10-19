import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

before('Auth Before Script', () => {
  before('user signup', () => {
    it('should signup user', done => {
      const user = {
        first_name: 'Cyrus',
        last_name: 'Marshall',
        email: 'cyrus58marshall@mail.com',
        phone_number: '+2349038717761',
        password: 'cyrus58Marshall'
      };
      chai.request(app)
        .post('/v1/bookstore-api/auth/user/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('New user has been created');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('confirmation_token');
          expect(res.body.data.role).to.equal('USR');

          chai.request(app)
            .get(`/v1/bookstore-api/auth/user/confirmation?confirmation_token=${res.body.data.confirmation_token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message');
              expect(res.body.updateStatus.is_confirmed).to.equal(true);
              expect(res.body.message).to.equal('User account verified successfully');
            });
          done();
        });
    });
    it('should return error when trying to register user with existing email', done => {
      const user = {
        first_name: 'Markus',
        last_name: 'Marshall',
        email: 'cyrus58marshall@mail.com',
        phone_number: '+2349038717763',
        password: 'markus58Marshall'
      };
      chai.request(app)
        .post('/v1/bookstore-api/auth/user/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('Email already exist, use another email address');
          done();
        });
    });
  });

  before('organization signup', () => {
    it('should signup organization', done => {
      const organization = {
        name: 'Read Spree Quotient plc',
        address: 'Block 2, Alawusa Road, Marina',
        state: 'Califonia',
        country: 'USA',
        email: 'readspree78@gmail.com',
        phone_number: '+2348138717761',
        password: 'readspree'
      };
      chai.request(app)
        .post('/v1/bookstore-api/auth/organization/signup')
        .send(organization)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('New organization has been created');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('confirmation_token');
          expect(res.body.data.role).to.equal('ORG');

          chai.request(app)
            .get(`/v1/bookstore-api/auth/organization/confirmation?confirmation_token=${res.body.data.confirmation_token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message');
              expect(res.body.updateStatus.is_confirmed).to.equal(true);
              expect(res.body.message).to.equal('Organization account verified successfully');
            });
          done();
        });
    });
    it('should return error when trying to register organization with existing email', done => {
      const organization = {
        name: 'Jack Spree Quotient plc',
        address: 'Block 2, Alawusa Road, Marina',
        state: 'Kansas',
        country: 'USA',
        email: 'readspree78@gmail.com',
        phone_number: '+2348138717762',
        password: 'readspreee'
      };
      chai.request(app)
        .post('/v1/bookstore-api/auth/organization/signup')
        .send(organization)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('Email already exist, use another email address');
          done();
        });
    });
  });
});
