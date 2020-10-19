import { db, organizationQueries } from '../../db';
import { OrganizationModel } from '../../models/v1';
import Helper from '../../utils/helpers';

const { hashPassword, getConfirmationToken } = Helper;
const {
  createOrganization,
  loginOrganization,
  confirmEmail,
  confirmPhoneNumber,
  confirmIfOrgIsConfirmed,
  verifyToken,
  verifyOrgAlreadyConfirmed,
  updateIsConfirmed } = organizationQueries;

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
    const {
      name,
      address,
      state,
      country,
      email,
      phone_number,
      plain_password,
      confirmation_token } = this;
    const hash = await hashPassword(plain_password);
    const confirmationToken = getConfirmationToken(confirmation_token);
    return db.one(createOrganization,
      [name, address, state, country, email, phone_number, hash, confirmationToken]);
  }

  /**
   * This is used to find an organization based on the unique email address
   * @static
   * @param {string} email - organizations email
   * @memberof OrganizationService
   * @returns {Promise<object>} A promise object with organization detail.
   */
  static getOrganizationByEmail(email) {
    return db.oneOrNone(loginOrganization, [email.toLowerCase()]);
  }

  /**
   * This is used check if an email is existing
   * @static
   * @memberof OrganizationService
   * @param {string} email email sent by the user
   * @returns {boolean} - Returns a true if the email is existing in the DB and a false, if not
   */
  static emailConfirmation(email) {
    return db.oneOrNone(confirmEmail, [email.toLowerCase()]);
  }

  /**
   * This is used check if a phone number is existing
   * @static
   * @memberof OrganizationService
   * @param {string} phone_number phone number sent by the user
   * @returns {boolean} - Returns a true if the phone number is
   * existing in the DB and a false, if not
   */
  static phoneNumberConfirmation(phone_number) {
    return db.oneOrNone(confirmPhoneNumber, [phone_number]);
  }

  /**
   * This is used to check if users email has been confirmed
   * @static
   * @memberof OrganizationService
   * @returns {boolean} - Returns a true if the organization account
   * has been confirmed in the DB and a false, if not
   */
  static ifOrgIsConfirmed() {
    return db.oneOrNone(confirmIfOrgIsConfirmed, [true]);
  }

  /**
   * This is used to check if organization account has been confirmed
   * @static
   * @memberof OrganizationService
   * @param {string} confirmation_token organizations registration confirmation
   * tokem to be used to verify user
   * @returns {boolean} - Returns a true if the organization token matches
   */
  static verifyOrgConfirmationToken(confirmation_token) {
    return db.oneOrNone(verifyToken, [confirmation_token]);
  }

  /**
   * This is used to check if user account is already confirmed
   * @static
   * @memberof OrganizationService
   * @param {string} confirmation_token organizations registration confirmation
   * tokem to be used to verify user
   * @returns {boolean} - Returns a true if the organization account is confirmed
   */
  static checkOrgAlreadyVerified(confirmation_token) {
    return db.oneOrNone(verifyOrgAlreadyConfirmed, [confirmation_token]);
  }

  /**
   * This is used to update the users account confirmation status
   * @static
   * @memberof OrganizationService
   * @param {string} confirmation_token organizations registration confirmation
   * tokem to be used to verify user
   * @returns {boolean} - Returns a true if the users token matches
   */
  static updateOrgConfirmationStatus(confirmation_token) {
    return db.one(updateIsConfirmed, [confirmation_token]);
  }
}
