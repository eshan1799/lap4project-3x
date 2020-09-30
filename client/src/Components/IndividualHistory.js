import React from "react";

class IndividualHistory extends React.Component {
  render() {
    return (
      <>
        <h2>
          Action: {this.props.trade.action == "buy" ? "Buy" : "Sell"}{" "}
          {this.props.trade.ticker}
        </h2>
        <h3>Shares: {this.props.trade.shares}</h3>
        <h3>Share Price: ${this.props.trade.price}</h3>
        <h4>Date: {this.props.trade.datetime}</h4>
      </>
    );
  }
}

export default IndividualHistory;
