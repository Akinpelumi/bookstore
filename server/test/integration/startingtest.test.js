import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Welcome', () => {
  it('Should Successful welcome to bookstore', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('Welcome to Bami-Bookstore');
        expect(res.body.status).to.equal('Success');
        done();
      });
  });
});
