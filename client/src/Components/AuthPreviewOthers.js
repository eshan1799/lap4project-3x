import React from 'react';
import { connect } from 'react-redux';
import { getAuthComparison } from '../actions/Actions';
import { HorizontalBar, Pie } from 'react-chartjs-2';

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

                        <HorizontalBar 
                            data={{
                                labels: ['Cash (%)', 'Equity (%)'],
                                datasets: [
                                    {
                                    label: `${ user.username }'s Portfolio`,
                                    backgroundColor: 'rgba(255,99,132,0.2)',
                                    borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 0.5,
                                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                    hoverBorderColor: 'rgba(255,99,132,1)',
                                    data: [this.roundDP(user.total_breakdown.balance, 2), this.roundDP(user.total_breakdown.stock, 2)]
                                    }
                                ]
                            }} 
                            // width={ 1 } 
                            // height={ 1 } 
                            // options={{ maintainAspectRatio: false }}
                        ></HorizontalBar>

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
                        {/* <Pie 
                            data={{
                                labels: [
                                    user.stock_breakdown.map((stock) => {
                                        return (`${ stock.name } (%)`)
                                    })
                                    // `${ user.stock_breakdown[0].name } (%)`, `${ user.stock_breakdown[1].name } (%)`
                                ],
                                datasets: [{
                                    data: [
                                        user.stock_breakdown.map(stock => {
                                            return stock.position * 100;
                                        })
                                        // this.roundDP(user.stock_breakdown[0].position, 2), this.roundDP(user.stock_breakdown[1].position, 2)
                                    ],
                                    backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56'
                                    ],
                                    hoverBackgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56'
                                    ]
                                }]
                            }}
                        ></Pie> */}
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