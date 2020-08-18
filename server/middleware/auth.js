import Helper from '../utils/helpers';

const { checkToken, verifyToken } = Helper;

/**
 * A collection of middleware methods used to verify the autheticity
 * of a organizations's request through the Auth route.
 *
 * @class AuthMiddleware
 */
export default class AuthMiddleware {
  /**
   * Verifies the validity of a user's access token or and the presence of it
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @memberof AuthMiddleware
   * @returns {object} - Returns an object (error or response).
   */
  static authenticate(req, res, next) {
    const token = checkToken(req);
    if (!token) {
      res.status(401).json({
        status: 'Fail',
        message: 'Access denied, token is required'
      });
    } else {
      try {
        const decoded = verifyToken(token);
        req.decoded = decoded;
        next();
      } catch (e) {
        res.status(401).json({
          status: 'Fail',
          message: 'Access denied, token is invalid'
        });
      }
    }
  }
}
