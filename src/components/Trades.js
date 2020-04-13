import React, { Component } from "react";
import _ from "lodash";

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      term: null,
      value: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleClick(e) {
    if (e) e.preventDefault();
    this.setState({
      value: "",
      term: this.state.value,
    });

    let term = this.state.value;
    this.callAPI(term);
  }

  componentDidMount() {
    //TODO: need to get saved list from aws and call for each
    this.callAPI("IBM");
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

  render() {
    const value = this.state.value;
    return (
      <div>
        <br />
        <h2>Latest Stock Market Quote:</h2>
        <br />
        <SearchBar
          value={value}
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <StockList stockItems={this.state.stocks} />
      </div>
    );
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
      />
    );
  });

  return (
    <table className="table table-sm table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Stock</th>
          <th>Price</th>
          <th>changepct</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>{stockItem}</tbody>
    </table>
  );
};

const StockListItem = (stock, props) => {
  return (
    <tr className="StockListItem1">
      <td className="StockListItem_Symbol1">{stock.symbol}</td>
      <td className="StockListItem_Price1">
        ${parseInt(stock.price).toFixed(2)}
      </td>
      <td className="StockListItem_changepct1">{stock.changepct}</td>
      <td className="StockListItem_date1">{stock.date}</td>
    </tr>
  );
};
