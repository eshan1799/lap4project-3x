import React from 'react';
import { connect } from 'react-redux';
import { getAuthComparison } from '../actions/Actions';

class AuthPreviewOthers extends React.Component {
    componentDidMount() {
        this.props.getComparison()
    }

    roundDP(number, decimalPlaces) {
        return (number * 100).toFixed(decimalPlaces);
    }

    render() {
        return(
            <>
            <h1>Preview Users' Portfolios</h1>

            <div>{ this.props.comparison.map((user, index) => {
                    return (
                            <div key={ index }>
                                <h2>Username: { user.username }</h2>
                                <h3>Total Breakdown:</h3>
                                <p>Cash: { this.roundDP(user.total_breakdown.balance, 2) }%</p>
                                <p>Equity: { this.roundDP(user.total_breakdown.stock, 2) }%</p>
                                <h3>Portfolio</h3>
                                <div>{ user.stock_breakdown.map((stock, stockIndex) => {
                                    return (
                                        <div key={ stockIndex }>
                                            <p>Name: { stock.name }</p>
                                            <p>Ticker: { stock.ticker }</p>
                                            <p>Exchange: { stock.exchange }</p>
                                            <p>Position: { this.roundDP(stock.position, 2) }%</p>
                                            <br />
                                        </div>
                                    )
                                }) }
                                </div>
                            </div>
                    )
                })}</div>
            </>
        )
    }
}

const mSTP = state => ({
    comparison: state.comparison
})

const mDTP = dispatch => ({
    getComparison: () => dispatch(getAuthComparison())
})

export default connect(mSTP, mDTP)(AuthPreviewOthers)