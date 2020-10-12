import adminServices from '../services/v1/admin';
import Helper from '../utils/helpers';

const { comparePassword } = Helper;

const { getAdminByEmail } = adminServices;

/**
 * A collection of middleware methods used to verify the autheticity
 * of a user's request through the Auth route.
 *
 * @class AdminMiddleware
 */
export default class AdminMiddleware {
  /**
   * This is to ensure that the login info supplied tallies with what is in the DB
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @memberof AuthMiddleware
   * @returns {object} - Returns an object (error or response).
   */
  static async validateAdminLoginInfo(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        status: 'Fail',
        message: 'email and password are required'
      });
    } else {
      const admin = await getAdminByEmail(email);
      if (!admin) {
        res.status(401).json({
          status: 'Fail',
          message: 'invalid email/password'
        });
      } else {
        const isCorrectPassword = await comparePassword(password, admin.password);
        if (isCorrectPassword) {
          delete admin.password;
          req.admin = admin;
          next();
        } else {
          res.status(401).json({
            status: 'Fail',
            message: 'invalid email/password'
          });
        }
      }
    }
  }
}
