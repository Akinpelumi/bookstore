/**
 * Contain user method
 * @class UserModel
 *
 */
class UserModel {
  /**
   *This is used to define the users model
   * @param {object} options -contains the major requirements from a user
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

export default UserModel;
