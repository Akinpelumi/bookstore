import UserService from '../../services/v1/user';
import OrganizationService from '../../services/v1/organization';
import Helper from '../../utils/helpers';

const { generateToken } = Helper;
const {
  verifyUserConfirmationToken,
  updateUserConfirmationStatus,
  checkUserAlreadyVerified } = UserService;
const {
  verifyOrgConfirmationToken,
  checkOrgAlreadyVerified,
  updateOrgConfirmationStatus } = OrganizationService;

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
      const { id, role, confirmation_token, is_confirmed } = await user.save();
      delete user.plain_password;
      const token = generateToken({ id, role, confirmation_token, is_confirmed, ...user });
      res.status(201).json({
        status: 'Created',
        message: 'New user has been created',
        data: { id, ...user, role, confirmation_token, is_confirmed, token }
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
      const { id, role, confirmation_token, is_confirmed } = await organization.save();
      delete organization.plain_password;
      const token = generateToken({ id, role, confirmation_token, is_confirmed, ...organization });
      res.status(201).json({
        status: 'Created',
        message: 'New organization has been created',
        data: { id, ...organization, role, confirmation_token, is_confirmed, token }
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
      status: 'Ok',
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
      status: 'Ok',
      message: 'Welcome Admin',
      data: { ...admin, token }
    });
  }

  /**
   * Confirm and update user account status.
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details and a JWT.
   * @memberof AuthController
   */
  static async userAccountStatusUpdating(req, res, next) {
    try {
      const { confirmation_token } = req.query;
      if (!confirmation_token) {
        res.status(400).json({
          status: 'Bad Request',
          message: 'confirmation token is required'
        });
      } else {
        const token = await verifyUserConfirmationToken(confirmation_token);
        if (token === null) {
          res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid confirmation token'
          });
        } else {
          const checkStatus = await checkUserAlreadyVerified(confirmation_token);
          if (checkStatus.is_confirmed === true) {
            res.status(400).json({
              status: 'Bad Request',
              message: 'User account is already verified'
            });
          } else {
            const updateStatus = await updateUserConfirmationStatus(confirmation_token);
            res.status(200).json({
              status: 'Ok',
              updateStatus,
              message: 'User account verified successfully'
            });
          }
        }
      }
    } catch (e) {
      const err = new Error('Error Confirming new user status');
      next(err);
    }
  }

  /**
   * Confirm and update user account status.
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details and a JWT.
   * @memberof AuthController
   */
  static async organizationAccountStatusUpdating(req, res, next) {
    try {
      const { confirmation_token } = req.query;
      if (!confirmation_token) {
        res.status(400).json({
          status: 'Bad Request',
          message: 'confirmation token is required'
        });
      } else {
        const token = await verifyOrgConfirmationToken(confirmation_token);
        if (token === null) {
          res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid confirmation token'
          });
        } else {
          const checkStatus = await checkOrgAlreadyVerified(confirmation_token);
          if (checkStatus.is_confirmed === true) {
            res.status(400).json({
              status: 'Bad Request',
              message: 'Organization account is already verified'
            });
          } else {
            const updateStatus = await updateOrgConfirmationStatus(confirmation_token);
            res.status(200).json({
              status: 'Ok',
              updateStatus,
              message: 'Organization account verified successfully'
            });
          }
        }
      }
    } catch (e) {
      const err = new Error('Error Confirming new user status');
      next(err);
    }
  }
}
