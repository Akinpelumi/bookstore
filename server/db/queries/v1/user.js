const userQueries = {
  createUser: `
    INSERT INTO users
        (first_name,
        last_name,
        email,
        phone_number,
        password)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`,
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
    WHERE phone_number = $1`
};

export default userQueries;
