/* eslint-disable no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import Helper from '../../server/utils/helpers';

const { hashPassword, comparePassword } = Helper;

const { expect } = chai;
chai.use(chaiHttp);

describe('Basic utility functions', () => {
  it('should return true when the hash password creeated is compared with the plain password', async () => {
    const hashObj = await hashPassword('originText');
    expect(hashObj).to.be.a('string');
    it('should return false when a string is compared with the hash and salt values of another string', () => {
      const isTrue = comparePassword(hashObj, 'originText');
      expect(isTrue).to.eql(true);
    });
  });
});
