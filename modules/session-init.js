const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const storeOptions = {
	host: process.env.DB_Host,
	port: process.env.DB_POST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
};


const options = {
  secret: process.env.SESSTION_SALT,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new  MySQLStore(storeOptions)
}

module.exports = () => session(options);