require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

const PORT = +process.env || 3001;

function getDatabaseUri() {
    return process.env.NODE_ENV === 'test'
        ? 'fitgen_test'
        : process.env.DATABASE_URL || 'fitgen';
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;

console.log('Jobly Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT:'.yellow, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.yellow, BCRYPT_WORK_FACTOR);
console.log('Database:'.yellow, getDatabaseUri());
console.log('---');

export { SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, getDatabaseUri };
