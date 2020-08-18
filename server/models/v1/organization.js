/**
 * Contain user method
 * @class UserModel
 *
 */
class OrganizationModel {
  /**
     *This is used to define the users model
     * @param {object} options -contains the major requirements from a user
     */
  constructor(options) {
    this.name = options.name;
    this.address = options.address;
    this.state = options.state;
    this.country = options.country;
    this.email = options.email.toLowerCase();
    this.phone_number = options.phone_number;
    this.plain_password = options.password;
    this.role = options.role;
    this.is_confirmed = options.is_confirmed;
    this.is_active = options.is_active;
  }
}

export default OrganizationModel;
