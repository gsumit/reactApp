var mysql = require("mysql");

//local mysql db connection
/*var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "reactui",
  password: "sumit123",
});*/
var connection = mysql.createConnection({
  host: "mysql-1.cmjnvgfprurr.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  database: "reactui",
  password: "sumit123",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
