import UserService from '../../services/v1/user';
import OrganizationService from '../../services/v1/organization';
import Helper from '../../utils/helpers';

const { generateToken } = Helper;

/**
 * A collection of methods that controls the success response
 * for CRUD operations on a Auth Instance.
 *
 * @class AuthController
 */
export default class AuthController {
  /**
   * Registers a new user.
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details and a JWT.
   * @memberof AuthController
   */
  static async userSignup(req, res, next) {
    try {
      const user = new UserService(req.body);
      const { id } = await user.save();
      const token = generateToken({ id });
      delete user.plain_password;
      res.status(201).json({
        status: 'Success',
        message: 'New user has been created',
        data: { id, ...user, token }
      });
    } catch (e) {
      const err = new Error('Error creating new user');
      next(err);
    }
  }

  /**
   * Registers a new organization.
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The response returned by the method.
   * @returns { JSON } A JSON response with the registered organizations's details and a JWT.
   * @memberof AuthController
   */
  static async organizationSignup(req, res, next) {
    try {
      const organization = new OrganizationService(req.body);
      const { id } = await organization.save();
      const token = generateToken({ id });
      delete organization.plain_password;
      res.status(201).json({
        status: 'Success',
        message: 'New organization has been created',
        data: { id, ...organization, token }
      });
    } catch (e) {
      const err = new Error('Error creating new organization');
      next(err);
    }
  }

  /**
   * Log in a user.
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details and a JWT.
   * @memberof AuthController
   */
  static userAndOrganizationSignin(req, res) {
    const { user } = req;
    const { id, role, is_confirmed, is_active } = user;
    const token = generateToken({ id, role, is_confirmed, is_active });
    res.status(200).json({
      status: 'Success',
      message: 'sign in successful',
      data: { ...user, token }
    });
  }

  /**
   * Log in an admin.
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details and a JWT.
   * @memberof AuthController
   */
  static adminSignin(req, res) {
    const { admin } = req;
    const { id, role, is_confirmed, is_active } = admin;
    const token = generateToken({ id, role, is_confirmed, is_active });
    res.status(200).json({
      status: 'Success',
      message: 'Welcome Admin',
      data: { ...admin, token }
    });
  }
}
