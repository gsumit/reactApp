import React, { Component } from "react";
import "./styles/global.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Trades";
import AppTODO from "./components/Todos";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/trades" component={Portfolio} />
        <Route path="/todos" component={AppTODO} />
      </Switch>
    </Router>
  );
}

export default App;

class NavLink extends Component {
  render() {
    return (
      <li className="nav-item">
        <Link className="nav-link" to={this.props.path}>
          {this.props.text}
        </Link>
      </li>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        { path: "/trades", text: "Trading", isActive: false },
        { path: "/todos", text: "TODO's", isActive: false },
        { path: "/about", text: "About", isActive: false },
      ],
    };
  }

  handleClick(i) {
    const links = this.state.links.slice();
    for (const j in links) {
      links[j].isActive = i === j;
    }
    this.setState({ links: links });
  }

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-sm navbar-dark  bg-dark"
          style={{ height: "55px" }}
        >
          <Link className="navbar-brand" to="/">
            Sumit
          </Link>
          <ul className="navbar-nav">
            {this.state.links.map((link, i) => (
              <NavLink
                path={link.path}
                text={link.text}
                isActive={link.isActive}
                key={link.path}
                onClick={() => this.handleClick(i)}
              />
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}
