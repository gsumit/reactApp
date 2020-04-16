var sql = require("./db.js");

//Task object constructor
var Task = function (task) {
  this.content = task.content;
  this.created_at = new Date();
};
Task.createTask = function (newTask, result) {
  sql.query("INSERT INTO todos set ?", newTask, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};
Task.getTaskById = function (taskId, result) {
  sql.query("Select content from todos where id = ? ", taskId, function (
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Task.getAllTask = function (result) {
  sql.query("Select * from todos", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Task.updateById = function (id, task, result) {
  sql.query(
    "UPDATE todos SET content = ? WHERE id = ?",
    [task.content, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Task.remove = function (id, result) {
  sql.query("DELETE FROM todos WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Task;
