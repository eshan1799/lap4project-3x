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

    pieBackgroundColours = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#469B25',
        '#807982',
        '#27447D',
        '#8C71D8',
        '#BD5146',
        '#557C24',
        '#D6D7D3',
        '#EE0997',
        '#532742',
        '#277D6F',
        '#C4677C',
        '#34C00D'
    ]

    render() {
        return(
            <>
            <h2 className='lefth2'>User Portfolios</h2>
            <div>{ this.props.comparison.map((user, index) => {
                return (
                    <div key={ index }>
                        <h2 className='lefth2'>{ user.username }</h2>
                        <div className='user-breakdowns'>
                            <div> 
                                <h3>Asset Class Breakdown</h3>

                                <HorizontalBar 
                                    data={{
                                        labels: ['Cash (%)', 'Equity (%)'],
                                        datasets: [
                                            {
                                            label: `${ user.username }'s Cash & Equity Allocation`,
                                            backgroundColor: 'rgba(111, 179, 184, 1)',
                                            borderColor: 'rgba(56, 128, 135, 1)',
                                            borderWidth: 0.5,
                                            hoverBackgroundColor: 'rgba(186, 223, 231, 1)',
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
                                            backgroundColor: this.pieBackgroundColours,
                                            hoverBackgroundColor: this.pieBackgroundColours
                                        }]
                                    }}
                                ></Pie>
                                  
                            </div>
                        </div>
                        <hr className='hrCenter' />
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