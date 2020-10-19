const organizationQueries = {
  createOrganization: `
    INSERT INTO organizations
        (name,
        address,
        state,
        country,
        email,
        phone_number,
        password,
        confirmation_token)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, role, confirmation_token, is_confirmed`,

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
    WHERE phone_number = $1`,

  confirmIfOrgIsConfirmed: `
    SELECT is_confirmed
    FROM organizations
    WHERE is_confirmed = $1`,

  verifyToken: `
    SELECT confirmation_token
    FROM organizations
    WHERE confirmation_token = $1`,

  verifyOrgAlreadyConfirmed: `
    SELECT is_confirmed
    FROM organizations
    WHERE confirmation_token = $1`,

  updateIsConfirmed: `
    UPDATE organizations
    SET is_confirmed = TRUE, confirmation_token_at = NOW()
    WHERE confirmation_token = $1 RETURNING id, name, is_confirmed`
};

export default organizationQueries;
