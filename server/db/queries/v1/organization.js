const organizationQueries = {
  createOrganization: `
    INSERT INTO organizations
        (name,
        address,
        state,
        country,
        email,
        phone_number,
        password)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
  loginOrganization: `
    SELECT *
    FROM organizations
    WHERE email=$1`,
  confirmEmail: `
    SELECT email
    FROM organizations
    WHERE email = $1`,
  confirmPhoneNumber: `
    SELECT phone_number
    FROM organizations
    WHERE phone_number = $1`
};

export default organizationQueries;
