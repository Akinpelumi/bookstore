import { db, userQueries } from '../../db';
import { UserModel } from '../../models/v1';
import Helper from '../../utils/helpers';

const { hashPassword } = Helper;
const { createUser, loginUser, confirmEmail, confirmPhoneNumber } = userQueries;

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
    const { first_name, last_name, email, phone_number, plain_password } = this;
    const hash = await hashPassword(plain_password);
    return db.one(createUser, [first_name, last_name, email, phone_number, hash]);
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
}
