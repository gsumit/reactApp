import React, { Component } from "react";
import _ from "lodash";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Button from "react-bootstrap/Button";

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      value: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleClick(e) {
    if (e) e.preventDefault();

    let symbol = this.state.value;
    this.callAPI(symbol);
    this.addSymbol(symbol);
    this.setState({
      value: "",
    });
  }

  componentDidMount() {
    //TODO: need to get saved list from aws and call for each
    this.getAllSymbols();
  }

  callAPI(symbol) {
    const key = "QLWEA85J0OZ0RRLP";
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json()) // Transform the data into json
      .then((response) => {
        let quote = response["Global Quote"];
        let stock = {
          symbol: quote["01. symbol"],
          price: quote["05. price"],
          date: quote["07. latest trading day"],
          changepct: quote["10. change percent"],
        };
        this.setState((state, props) => {
          return {
            ...state,
            stocks: [...state.stocks, stock],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addSymbol(symbol) {
    fetch(`http://${window.location.hostname}:3001/symbols`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: symbol,
      }),
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then((response) => {
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
  }

  deleteTask(symbol) {
    fetch(`http://${window.location.hostname}:3001/symbols/${symbol}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then((response) => {
        const newstocks = this.state.stocks.filter((stock) => {
          return stock.symbol !== symbol;
        });
        this.setState({ stocks: newstocks });
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
  }

  render() {
    return (
      <div className="col-sm-4">
        <br />
        <h2>Latest Stock Market Quote:</h2>
        <br />
        <SearchBar
          value={this.state.value}
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <StockList stockItems={this.state.stocks} deletefn={this.deleteTask} />
        <NotificationContainer />
      </div>
    );
  }

  getAllSymbols() {
    fetch(`http://${window.location.hostname}:3001/symbols`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then((response) => {
        response.map((s) => this.callAPI(s.ticker));
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default Portfolio;

function SearchBar(props) {
  return (
    <div className="SearchBar">
      <form className="SearchBar_Form">
        Search:
        <input
          className="SearchBar__Input"
          value={props.value}
          onChange={props.onChange}
        />
        <button
          className="SearchBar__Button btn-success"
          onClick={props.onClick}
        >
          search
        </button>
      </form>
    </div>
  );
}

const StockList = (props) => {
  const stockItem = props.stockItems.map((stock) => {
    return (
      <StockListItem
        key={stock.symbol}
        symbol={stock.symbol}
        price={stock.price}
        changepct={stock.changepct}
        date={stock.date}
        deletefn={props.deletefn}
      />
    );
  });

  return (
    <table className="table table-sm table-bordered table-hover" width="40">
      <thead className="thead-dark">
        <tr>
          <th>Stock</th>
          <th>Price</th>
          <th>changepct</th>
          <th>date</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>{stockItem}</tbody>
    </table>
  );
};

const StockListItem = (stock) => {
  return (
    <tr className="StockListItem1">
      <td className="StockListItem_Symbol1">{stock.symbol}</td>
      <td className="StockListItem_Price1">
        ${parseInt(stock.price).toFixed(2)}
      </td>
      <td className="StockListItem_changepct1">{stock.changepct}</td>
      <td className="StockListItem_date1">{stock.date}</td>
      <td>
        <Button
          onClick={() => stock.deletefn(stock.symbol)}
          style={{ "background-color": "red", float: "left" }}
        >
          <i class="fa fa-trash" />
        </Button>
      </td>
    </tr>
  );
};
