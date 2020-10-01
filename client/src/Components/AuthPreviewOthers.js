import React from 'react';
import { connect } from 'react-redux';
import { getAuthComparison } from '../actions/Actions';
import { HorizontalBar, Pie } from 'react-chartjs-2';

class AuthPreviewOthers extends React.Component {
    componentDidMount() {
        this.props.getComparison()
    }

    roundDP(number) {
        return (number * 100).toFixed(2);
    }

    // getRandomColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //       color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

    render() {
        return(
            <>
            <h1>Preview Users' Portfolios</h1>
            <div>{ this.props.comparison.map((user, index) => {
                return (
                    <div key={ index }>
                        <h2>User: { user.username }</h2>
                        <div className='user-breakdowns'>
                            <div> 
                                <h3>Total Breakdown:</h3>

                                <HorizontalBar 
                                    data={{
                                        labels: ['Cash (%)', 'Equity (%)'],
                                        datasets: [
                                            {
                                            label: `${ user.username }'s Cash & Equity Allocation`,
                                            backgroundColor: 'rgba(255,99,132,0.2)',
                                            borderColor: 'rgba(255,99,132,1)',
                                            borderWidth: 0.5,
                                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                            hoverBorderColor: 'rgba(255,99,132,1)',
                                            data: [this.roundDP(user.total_breakdown.balance), this.roundDP(user.total_breakdown.stock)]
                                            }
                                        ]
                                    }} 
                                    // width={ 1 } 
                                    // height={ 1 } 
                                    // options={{ maintainAspectRatio: false }}
                                ></HorizontalBar>
                            </div>
                            
                            <div>
                                <h3>Portfolio</h3>
                                {/* <div>{ user.stock_breakdown.map((stock, stockIndex) => {
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
                                </div> */}
                                <Pie 
                                    data={{
                                        labels:
                                            user.stock_breakdown.map((stock) => {
                                                return (`${ stock.name } (%)`);
                                            }),
                                        datasets: [{
                                            data:
                                                user.stock_breakdown.map(stock => {
                                                    return this.roundDP(stock.position);
                                                }),
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
                                ></Pie>
                            </div>
                        </div>
                        {/* { console.log(this.getRandomColor()) } */}
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