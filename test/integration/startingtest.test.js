import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/index';

const { expect } = chai;
chai.use(chaiHttp);

before('Welcome', () => {
  it('Should Successful welcome to bookstore', done => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('Welcome to Bami-Bookstore');
        expect(res.body.status).to.equal('Ok');
        done();
      });
  });

  it('Should return 404', done => {
    chai.request(app)
      .get('/movies')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('oooops! page not found');
        expect(res.body.status).to.equal('Not Found');
        done();
      });
  });
});
