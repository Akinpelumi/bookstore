import { db, organizationQueries } from '../../db';
import { OrganizationModel } from '../../models/v1';
import Helper from '../../utils/helpers';

const { hashPassword } = Helper;
const {
  createOrganization,
  loginOrganization,
  confirmEmail,
  confirmPhoneNumber
} = organizationQueries;

/**
 * This is the interface of the organization service
 *
 * @class OrganizationService
 */
export default class OrganizationService extends OrganizationModel {
  /**
   * Creates an organization with properties specified in the argument.
   * @memberof OrganizationService
   * @returns {Promise<object>} A promise object with organization detail.
   */
  async save() {
    const { name, address, state, country, email, phone_number, plain_password } = this;
    const hash = await hashPassword(plain_password);
    return db.one(createOrganization, [name, address, state, country, email, phone_number, hash]);
  }

  /**
   * This is used to find an organization based on the unique email address
   * @static
   * @param {string} email - organizations email
   * @memberof UserService
   * @returns {Promise<object>} A promise object with organization detail.
   */
  static getOrganizationByEmail(email) {
    return db.oneOrNone(loginOrganization, [email.toLowerCase()]);
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
   * @returns {boolean} - Returns a true if the phone number is
   * existing in the DB and a false, if not
   */
  static phoneNumberConfirmation(phone_number) {
    return db.oneOrNone(confirmPhoneNumber, [phone_number]);
  }
}
