// this component for about page
import React, { useState, Component, useEffect } from "react";
import "../styles/global.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function AppTODO() {
  const [state, setState] = useState({
    todos: [
      { id: 1, content: "buy some milk" },
      { id: 2, content: "play mario" },
    ],
  });

  useEffect(() => {
    getAllTasks();
  }, []);

  let deleteTodo = (id) => {
    const newtodos = state.todos.filter((todo) => {
      return todo.id !== id;
    });
    setState({ todos: newtodos });
    deleteTask(id);
  };

  let addfn = ({ content }) => {
    addTask(content);
  };

  let addTask = (task) => {
    fetch(`http://${window.location.hostname}:3001/tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: task,
      }),
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then((response) => {
        let newtodolist = [...state.todos, { id: response, content: task }];
        setState({ todos: newtodolist });
        NotificationManager.success("", "Added Successfully", 3000);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          "Error message",
          "Error adding.",
          5000,
          () => {
            alert("callback");
          }
        );
      });
  };

  let deleteTask = (taskId) => {
    fetch(`http://${window.location.hostname}:3001/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then((response) => {
        NotificationManager.success("", "Deleted Successfully", 3000);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          "Error message",
          "Error deleting.",
          5000,
          () => {
            alert("callback");
          }
        );
      });
  };

  let getAllTasks = () => {
    fetch(`http://${window.location.hostname}:3001/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then((response) => {
        setState((state, props) => {
          return {
            ...state,
            todos: response,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="todo-app container">
      <br />
      <h1 className="center text-danger">Todo's</h1>
      <Todos todos={state.todos} deletefn={deleteTodo} />
      <br />
      <br />
      <AddTodo addfn={addfn} />
      <NotificationContainer />
    </div>
  );
}

export default AppTODO;

const Todos = ({ todos, deletefn }) => {
  const todoList =
    todos.length !== 0 ? (
      todos.map((todo) => {
        return (
          <div
            key={todo.id}
            className="row d-table w-100"
            style={{ border: "2px solid #73AD21" }}
          >
            <p className="d-table-cell">{todo.content}</p>
            <div className="d-table-cell tar">
              <button
                className="btn-success"
                onClick={() => {
                  deletefn(todo.id);
                }}
              >
                delete
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <p className="center">You have no todo's left , yay</p>
    );

  return <div className="todos collection">{todoList}</div>;
};

class AddTodo extends Component {
  state = {
    content: "",
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  };

  handelesubmit = (e) => {
    e.preventDefault();
    if (this.state.content === "") return;
    this.props.addfn(this.state);
    this.setState({ content: "" });
    e.target.value = "";
  };

  render() {
    return (
      <form onSubmit={this.handelesubmit}>
        <label>
          <strong>Add new todo:</strong>
        </label>
        <div className="inp">
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.content}
            style={{ border: "none", outline: "none", width: "100%" }}
          />
        </div>
      </form>
    );
  }
}
