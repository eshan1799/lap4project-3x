import React from 'react';
import { connect } from 'react-redux';
import { getAuthComparison } from '../actions/Actions';

class AuthPreviewOthers extends React.Component {
    componentDidMount() {
        this.props.getComparison()
    }

    roundToDecimalPlace(number, decimalPlaces) {
        return (Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + 3) * 100)
    }

    render() {
        return(
            <>
            <h1>Preview Users' Portfolios</h1>

            <div>{this.props.comparison.map((user, index) => {
                    return (
                            <div key={ index }>
                                <h2>Username: { user.username }</h2>
                                <h3>Total Breakdown:</h3>
                                {/* <p>{user.total_breakdown.balance}</p> */}
                                <p>Balance: { this.roundToDecimalPlace(user.total_breakdown.balance, 3) }%</p>
                                <p>Stock: { this.roundToDecimalPlace(user.total_breakdown.stock, 3) }%</p>
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