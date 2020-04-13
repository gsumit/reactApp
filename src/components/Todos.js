// this component for about page
import React, { useState, Component } from "react";
import "../styles/global.css";

function AppTODO() {
  const [state, setState] = useState({
    todos: [
      { id: 1, content: "buy some milk" },
      { id: 2, content: "play mario" },
    ],
  });

  let deleteTodo = (id) => {
    const newtodos = state.todos.filter((todo) => {
      return todo.id !== id;
    });
    setState({ todos: newtodos });
  };

  let addfn = ({ content }) => {
    let newtodolist = [...state.todos, { id: Math.random(), content: content }];

    setState({ todos: newtodolist });
  };

  return (
    <div className="todo-app container">
      <br />
      <h1 className="center text-danger">Todo's</h1>
      <Todos todos={state.todos} deletefn={deleteTodo} />
      <br />
      <br />
      <AddTodo addfn={addfn} />
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
            className="row d-table w-100"
            style={{ border: "2px solid #73AD21" }}
          >
            <p key={todo.id} className="d-table-cell">
              {todo.content}
            </p>
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
