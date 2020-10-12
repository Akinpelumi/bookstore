import fs from 'fs';
import { join } from 'path';
import cmd from 'node-cmd';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const adminSqlUp = (admins) => {
  const sqlInsertCommand = `INSERT INTO admins
      (first_name, last_name, email, phone_number, password)
      VALUES`;
  const sqlArray = admins.map((admin) => {
    const credentials = process.env[admin].split('/');
    const hash = bcrypt.hashSync(
      credentials.find((value) => value.includes('password')).split(':')[1],
      10
    );
    const firstName = credentials
      .find((value) => value.includes('firstName'))
      .split(':')[1];
    const lastName = credentials
      .find((value) => value.includes('lastName'))
      .split(':')[1];
    const phoneNumber = credentials
      .find((value) => value.includes('phoneNumber'))
      .split(':')[1];
    const email = credentials
      .find((value) => value.includes('email'))
      .split(':')[1];
    return `
      ('${firstName}', '${lastName}', '${email}', '${phoneNumber}', '${hash}')
      `;
  });
  return `${sqlInsertCommand}${sqlArray.join(',')};`;
};

const adminSqlDown = (admins) => {
  const sqlArray = admins.map((admin) => {
    const credentials = process.env[admin].split('/');
    const email = credentials
      .find((value) => value.includes('email'))
      .split(':')[1];
    return `
        DELETE FROM admins
        WHERE
        email='${email}';
        `;
  });
  return sqlArray.join('');
};

const createAdminSeedFiles = (sqlDir, admins) => {
  const sqlFiles = fs.readdirSync(sqlDir);
  sqlFiles.forEach((fileName) => {
    if (fileName.includes('admin-up')) {
      const sqlQuery = adminSqlUp(admins);
      fs.writeFileSync(join(sqlDir, fileName), sqlQuery);
    }
    if (fileName.includes('admin-down')) {
      const sqlQuery = adminSqlDown(admins);
      fs.writeFileSync(join(sqlDir, fileName), sqlQuery);
    }
  });
  console.log('SUCCESSFULLY CREATED SEED FILES');
};

const seedAdmin = (admins) => {
  cmd.get('npm run seed:down', (err) => {
    if (err) {
      console.log(`Something broke with the following message: ${err.message}`);
      process.exit(1);
    }
    const dbSeedDir = join(__dirname, './server/db/migrations/seeds/sqls');
    const sqlDir = fs.existsSync(dbSeedDir);
    let sqlFiles = null;
    if (sqlDir) {
      sqlFiles = fs.readdirSync(dbSeedDir);
      const isFileExist = sqlFiles.length && sqlFiles.find((fileName) => /admin/.test(fileName));
      if (isFileExist) {
        console.log('SEED FILES ALREADY EXIST \n UPDATING ADMIN SEED FILES');
        createAdminSeedFiles(dbSeedDir, admins);
      }
    } else {
      cmd.get('npm run seed:create admin', (err) => {
        if (err) {
          console.log(
            `Something broke with the following message: ${err.message}`
          );
          process.exit(1);
        }
        createAdminSeedFiles(dbSeedDir, admins);
      });
    }
  });
};

seedAdmin(['ADMIN1', 'ADMIN2', 'ADMIN3']);
