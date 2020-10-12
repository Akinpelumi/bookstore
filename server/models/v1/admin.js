/**
 * Contain admin method
 * @class AdminModel
 *
 */
class AdminModel {
  /**
     *This is used to define the admins model
     * @param {object} options -contains the major requirements from an admin
     */
  constructor(options) {
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.email = options.email.toLowerCase();
    this.phone_number = options.phone_number;
    this.plain_password = options.password;
    this.role = options.role;
    this.is_confirmed = options.is_confirmed;
    this.is_active = options.is_active;
  }
}

export default AdminModel;
