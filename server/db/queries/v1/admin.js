const adminQueries = {
  loginAdmin: `
      SELECT *
      FROM admins
      WHERE email=$1`
};

export default adminQueries;
