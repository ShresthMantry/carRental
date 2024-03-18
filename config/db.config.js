const mysql = require('mysql2');

const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Shresth@db',
  database: 'project'
});

connection.query("show tables", (err, result, fields) => {
  if (err) {
    console.log(err);
  }
  return console.log(result);
})

module.exports = connection;