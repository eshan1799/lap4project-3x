import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUnauthComparison } from '../actions/Actions';
import { HorizontalBar } from 'react-chartjs-2';

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

            <div>{ this.props.comparison.map((user, index) => {
                return (
                    <div key={ index }>
                        <h2>User { index + 1 }</h2>
                        <h4>Total Breakdown</h4>
                        <p>Balance: { this.roundDP(user.balance, 2) }%</p>
                        <p>Stock: { this.roundDP(user.stock, 2) }%</p>

                        <HorizontalBar 
                            data={{
                                labels: ['Cash (%)', 'Equity (%)'],
                                datasets: [
                                    {
                                    label: `User ${ index + 1 }'s Portfolio`,
                                    backgroundColor: 'rgba(255,99,132,0.2)',
                                    borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 0.5,
                                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                    hoverBorderColor: 'rgba(255,99,132,1)',
                                    data: [this.roundDP(user.balance, 2), this.roundDP(user.stock, 2), 0]
                                    }
                                ]
                            }} 
                            width={ 40 } 
                            height={ 20 } 
                            options={{ maintainAspectRatio: false }}>
                        </HorizontalBar>
                
                    </div>
                )
            }) }</div>
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