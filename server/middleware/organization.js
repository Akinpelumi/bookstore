import organizationSchema from '../validations/v1/organization';
import organizationServices from '../services/v1/organization';
import Helper from '../utils/helpers';

const { comparePassword } = Helper;
const {
  getOrganizationByEmail,
  emailConfirmation,
  phoneNumberConfirmation,
  ifOrgIsConfirmed } = organizationServices;

/**
 * A collection of middleware methods used to verify the autheticity
 * of a organizations's request through the Auth route.
 *
 * @class OrganizationAuthMiddleware
 */
export default class OrganizationAuthMiddleware {
  /**
   * This is used to check if the signup fields sent pass the validation test
   * @static
   * @param {Request} req  - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @memberof UserMiddleware
   * @returns {object} - Returns an object (error or response).
   */
  static async organizationSignUpValidator(req, res, next) {
    try {
      await organizationSchema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }
    next();
  }

  /**
   * This is to ensure that the login info supplied tallies with what is in the DB
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @memberof AuthMiddleware
   * @returns {object} - Returns an object (error or response).
   */
  static async validateOrgLoginInfo(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({
        status: 'Fail',
        message: 'email and password are required'
      });
    } else {
      const user = await getOrganizationByEmail(email);
      if (!user) {
        res.status(401).json({
          status: 'Fail',
          message: 'invalid email/password'
        });
      } else {
        const isConfirmed = await ifOrgIsConfirmed(true);
        if (!isConfirmed) {
          res.status(403).json({
            status: 'Forbidden',
            message: 'Confirm your email to log in'
          });
        } else {
          const isCorrectPassword = await comparePassword(password, user.password);
          if (isCorrectPassword) {
            delete user.password;
            req.user = user;
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

  /**
   * This is used to check if the email sent during signup passes every validation written below
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @memberof UserMiddleware
   * @returns {object} -Returns an object (error or response).
   */
  static async orgSignUpEmailValidator(req, res, next) {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        status: 'Fail',
        message: 'Email is a required field, please fill in your email'
      });
    } else {
      try {
        const user = await emailConfirmation(email);
        if (user) {
          res.status(409).json({
            status: 'Fail',
            message: 'Email already exist, use another email address'
          });
        } else next();
      } catch (e) {
        res.status(500).json({
          status: 'Fail',
          message: 'Error occurred while validating email, try again'
        });
      }
    }
  }

  /**
   * This is used to check if the phone number sent during signup
   * passes every validation written below
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @memberof UserMiddleware
   * @returns {object} -Returns an object (error or response).
   */
  static async orgSignUpPhoneNumberValidator(req, res, next) {
    const { phone_number } = req.body;
    if (!phone_number) {
      res.status(400).json({
        status: 'Fail',
        message: 'Phone number is a required field, please fill in your email'
      });
    } else {
      try {
        const user = await phoneNumberConfirmation(phone_number);
        if (user) {
          res.status(409).json({
            status: 'Fail',
            message: 'Phone number already exist, use another phone number'
          });
        } else next();
      } catch (e) {
        res.status(500).json({
          status: 'Fail',
          message: 'Error occurred while validating phone numnber, try again'
        });
      }
    }
  }
}
