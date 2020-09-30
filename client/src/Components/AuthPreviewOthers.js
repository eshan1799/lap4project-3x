import React from 'react';
import { connect } from 'react-redux';
import { getAuthComparison } from '../actions/Actions';

class AuthPreviewOthers extends React.Component {
    componentDidMount() {
        this.props.getComparison()
    }

    // roundToDecimalPlace(number, decimalPlaces) {
    //     return (Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + 3) * 100)
    // }

    render() {
        return(
            <>
            <h1>Preview Users' Portfolios</h1>

            <div>{ this.props.comparison.map((user, index) => {
                    return (
                            <div key={ index }>
                                <h2>Username: { user.username }</h2>
                                <h3>Total Breakdown:</h3>
                                <p>Cash: { (user.total_breakdown.balance*100).toFixed(2)}%</p>
                                <p>Equity: { (user.total_breakdown.stock*100).toFixed(2)}%</p>
                                <h3>Portfolio</h3>
                                <div>{ user.stock_breakdown.map((stock, stockIndex) => {
                                    return (
                                        <div key={ stockIndex }>
                                            <p>Name: { stock.name }</p>
                                            <p>Ticker: { stock.ticker }</p>
                                            <p>Exchange: { stock.exchange }</p>
                                            <p>Position: { (stock.position*100).toFixed(2) }%</p>
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