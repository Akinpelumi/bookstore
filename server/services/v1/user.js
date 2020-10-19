import { db, userQueries } from '../../db';
import { UserModel } from '../../models/v1';
import Helper from '../../utils/helpers';

const { hashPassword, getConfirmationToken } = Helper;
const {
  createUser,
  loginUser,
  confirmEmail,
  confirmPhoneNumber,
  confirmIfUserIsConfirmed,
  verifyToken,
  updateIsConfirmed,
  verifyUserAlreadyConfirmed } = userQueries;

/**
 * This is the interface of the user service
 *
 * @class UserService
 */
export default class UserService extends UserModel {
  /**
   * Creates a user with properties specified in the argument.
   * @memberof UserService
   * @returns {Promise<object>} A promise object with user detail.
   */
  async save() {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      plain_password,
      confirmation_token } = this;
    const hash = await hashPassword(plain_password);
    const confirmationToken = getConfirmationToken(confirmation_token);
    return db.one(createUser,
      [first_name, last_name, email, phone_number, hash, confirmationToken]);
  }

  /**
   * This is used to find a user based on the unique email address
   * @static
   * @param {string} email - users email
   * @memberof UserService
   * @returns {Promise<object>} A promise object with user detail.
   */
  static getUserByEmail(email) {
    return db.oneOrNone(loginUser, [email.toLowerCase()]);
  }

  /**
   * This is used check if an email is existing
   * @static
   * @memberof UserService
   * @param {string} email email sent by the user
   * @returns {boolean} - Returns a true if the email is existing in the DB and a false, if not
   */
  static emailConfirmation(email) {
    return db.oneOrNone(confirmEmail, [email.toLowerCase()]);
  }

  /**
   * This is used check if a phone number is existing
   * @static
   * @memberof UserService
   * @param {string} phone_number phone number sent by the user
   * @returns {boolean} - Returns a true if the phone number
   * is existing in the DB and a false, if not
   */
  static phoneNumberConfirmation(phone_number) {
    return db.oneOrNone(confirmPhoneNumber, [phone_number]);
  }

  /**
   * This is used to check if users email has been confirmed
   * @static
   * @memberof UserService
   * @returns {boolean} - Returns a true if the users account
   * has been confirmed in the DB and a false, if not
   */
  static ifUserIsConfirmed() {
    return db.oneOrNone(confirmIfUserIsConfirmed, [true]);
  }

  /**
   * This is used to check if users account has been confirmed
   * @static
   * @memberof UserService
   * @param {string} confirmation_token users registration confirmation
   * tokem to be used to verify user
   * @returns {boolean} - Returns a true if the users token matches
   */
  static verifyUserConfirmationToken(confirmation_token) {
    return db.oneOrNone(verifyToken, [confirmation_token]);
  }

  /**
   * This is used to check if user account is already confirmed
   * @static
   * @memberof UserService
   * @param {string} confirmation_token users registration confirmation
   * tokem to be used to verify user
   * @returns {boolean} - Returns a true if the users account is confirmed
   */
  static checkUserAlreadyVerified(confirmation_token) {
    return db.oneOrNone(verifyUserAlreadyConfirmed, [confirmation_token]);
  }

  /**
   * This is used to update the users account confirmation status
   * @static
   * @memberof UserService
   * @param {string} confirmation_token users registration confirmation
   * tokem to be used to verify user
   * @returns {boolean} - Returns a true if the users token matches
   */
  static updateUserConfirmationStatus(confirmation_token) {
    return db.one(updateIsConfirmed, [confirmation_token]);
  }
}
