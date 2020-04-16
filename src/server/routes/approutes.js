module.exports = function (app) {
  var todoList = require("../controller/appController");
  var symbolList = require("../controller/pfController");

  // todoList Routes
  app.route("/tasks").get(todoList.list_all_tasks).post(todoList.create_a_task);

  app
    .route("/tasks/:taskId")
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app
    .route("/symbols")
    .get(symbolList.list_all_symbols)
    .post(symbolList.add_a_symbol);

  app.route("/symbols/:symbol").delete(symbolList.delete_a_symbol);
};
