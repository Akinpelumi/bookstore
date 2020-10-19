const userQueries = {
  createUser: `
    INSERT INTO users
        (first_name,
        last_name,
        email,
        phone_number,
        password,
        confirmation_token)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, role, confirmation_token, is_confirmed`,

  loginUser: `
    SELECT *
    FROM users
    WHERE email=$1`,

  confirmEmail: `
    SELECT email
    FROM users
    WHERE email = $1`,

  confirmPhoneNumber: `
    SELECT phone_number
    FROM users
    WHERE phone_number = $1`,

  confirmIfUserIsConfirmed: `
    SELECT is_confirmed
    FROM users
    WHERE is_confirmed = $1`,

  verifyToken: `
    SELECT confirmation_token
    FROM users
    WHERE confirmation_token = $1`,

  verifyUserAlreadyConfirmed: `
    SELECT is_confirmed
    FROM users
    WHERE confirmation_token = $1`,

  updateIsConfirmed: `
    UPDATE users
    SET is_confirmed = TRUE, confirmation_token_at = NOW()
    WHERE confirmation_token = $1 RETURNING id, first_name, last_name, is_confirmed`
};

export default userQueries;
