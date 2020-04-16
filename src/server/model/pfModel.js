var sql = require("./db.js");

//Task object constructor
var Symbol = function (symbol) {
  this.ticker = symbol.ticker;
  this.created_at = new Date();
};
Symbol.createSymbol = function (newSymbol, result) {
  sql.query("INSERT INTO portfolio set ?", newSymbol, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Symbol.getAllSymbol = function (result) {
  sql.query("Select * from portfolio", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Symbol.remove = function (id, result) {
  sql.query("DELETE FROM portfolio WHERE ticker = ?", [id], function (
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Symbol;
