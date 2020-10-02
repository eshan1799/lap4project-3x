import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUnauthComparison } from '../actions/Actions';
import { HorizontalBar } from 'react-chartjs-2';

class UnauthPreviewOthers extends React.Component {

    componentDidMount() {
        this.props.getComparison()
    }

    roundDP(number) {
        return (number * 100).toFixed(2);
    }

    render() {
        return(
            <>
            <nav>
                <NavLink className='threeX' to='/'>3X</NavLink>
                <NavLink to='/login'>
                    <button className='buttons'>Log In</button>
                </NavLink>
                <NavLink to='/signup'>
                    <button className='buttons'>Register</button>
                </NavLink>
            </nav>
            <h2>Preview Users' Portfolios</h2>

            <div>{ this.props.comparison.map((user, index) => {
                return (
                    <div key={ index }>
                        <h3>User { index + 1 }'s Breakdown</h3>
                        {/* <h4>Total Breakdown:</h4> */}

                        <HorizontalBar 
                            data={{
                                labels: ['Cash (%)', 'Equity (%)'],
                                datasets: [
                                    {
                                    label: `User ${ index + 1 }'s Cash & Equity Allocation`,
                                    backgroundColor: 'rgba(111, 179, 184, 1)',
                                    borderColor: 'rgba(56, 128, 135, 1)',
                                    borderWidth: 0.5,
                                    hoverBackgroundColor: 'rgba(186, 223, 231, 1)',
                                    hoverBorderColor: 'rgba(56, 128, 135, 1)',
                                    data: [this.roundDP(user.balance), this.roundDP(user.stock), 0]
                                    }
                                ]
                            }} 
                            width={ 40 } 
                            height={ 20 } 
                            options={{ maintainAspectRatio: false }}>
                        </HorizontalBar>
                        <p>.</p>
                        <div className='centre'>
                            <hr />
                        </div>
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