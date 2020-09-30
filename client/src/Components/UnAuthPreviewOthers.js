import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUnauthComparison } from '../actions/Actions';

class UnauthPreviewOthers extends React.Component {
    componentDidMount() {
        this.props.getComparison()
    }

    roundDP(number, decimalPlaces) {
        return (number * 100).toFixed(decimalPlaces);
    }

    render() {
        return(
            <>
            <nav>
                <NavLink to='/'>3X</NavLink>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </nav>
            <h1>Preview Users' Portfolios</h1>

            <div>{this.props.comparison.map((user, index) => {
                    return (
                            <div key={ index }>
                                <h2>User {index + 1 }</h2>
                                <h4>Total Breakdown</h4>
                                <p>Balance: { this.roundDP(user.balance, 2) }%</p>
                                <p >Stock: { this.roundDP(user.stock, 2) }%</p>
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
    getComparison: () => dispatch(getUnauthComparison())
})

export default connect(mSTP, mDTP)(UnauthPreviewOthers)