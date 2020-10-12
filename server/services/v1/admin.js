import { db, adminQueries } from '../../db';
import { AdminModel } from '../../models/v1';

const { loginAdmin } = adminQueries;

/**
 * This is the interface of the admin service
 *
 * @class AdminService
 */
export default class AdminService extends AdminModel {
  /**
   * This is used to find an admin based on the unique email address
   * @static
   * @param {string} email - admins email
   * @memberof AdminService
   * @returns {Promise<object>} A promise object with admin detail.
   */
  static getAdminByEmail(email) {
    return db.oneOrNone(loginAdmin, [email.toLowerCase()]);
  }
}
