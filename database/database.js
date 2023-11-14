// const mysql = require('mysql2');
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  database: 'user_data',
  password: "Pankajbaseline77"
});

//connection//
connection.connect(err => {
  if (err) {
    throw err
  } else {
    console.log("db mysql connected")
  }
})

module.exports = connection
