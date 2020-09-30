import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUnauthComparison } from '../actions/Actions';

class UnauthPreviewOthers extends React.Component {
    componentDidMount() {
        this.props.getComparison()
    }

    // renderComparison = user => {
    //     return user.map(index => (
    //         <div key={ index }>
    //             <p>{ user[index].balance }</p>
    //         </div>
    //     ))
    // }

    render() {
        return(
            <>
            <nav>
                <NavLink to='/'>3X</NavLink>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </nav>
            <h1>Preview Users' Portfolios</h1>
            {/* <div>{this.renderComparison(this.props.comparison)}</div> */}
            {/* { this.props.comparison.map(index) } */}

            <div>{this.props.comparison.map((user, index) => {
                    return (
                            <div key={ index }>
                                <h2>{ user.username }</h2>
                                <h4>{ user.balance }</h4>
                                <p >{ user.stock }</p>
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