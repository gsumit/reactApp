var Symbol = require("../model/pfModel.js");

exports.list_all_symbols = function (req, res) {
  Symbol.getAllSymbol(function (err, symbol) {
    if (err) res.send(err);
    res.send(symbol);
  });
};

exports.add_a_symbol = function (req, res) {
  var new_symbol = new Symbol(req.body);
  //handles null error
  if (!new_symbol.ticker) {
    res.status(400).send({
      error: true,
      message: "Please provide ticker:" + req.body,
    });
  } else {
    Symbol.createSymbol(new_symbol, function (err, symbol) {
      if (err) res.send(err);
      res.json(symbol);
    });
  }
};

exports.delete_a_symbol = function (req, res) {
  Symbol.remove(req.params.symbol, function (err, symbol) {
    if (err) res.send(err);
    res.json({ message: "Symbol successfully deleted" });
  });
};
