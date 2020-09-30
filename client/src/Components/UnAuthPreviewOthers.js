import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUnauthComparison } from '../actions/Actions';

class UnauthPreviewOthers extends React.Component {
    componentDidMount() {
        this.props.getComparison()
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
                                <h2>Username {index + 1 }</h2>
                                <h4>Balance: { user.balance }</h4>
                                <p >Stock: { user.stock }</p>
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