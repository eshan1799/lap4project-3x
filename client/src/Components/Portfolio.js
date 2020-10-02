import React from 'react'
import { connect } from 'react-redux'
import { Stock } from './index/index'
import { resetPortfolio } from '../actions/Actions'
import { Pie } from 'react-chartjs-2'

class Portfolio extends React.Component {

    renderStocks = portfolio => {
        return portfolio.map((stock, index) => {
            if (stock.shares > 0) {
                return  <div key={ index }>
                            <Stock stock={ stock }/>
                        </div>
                }
            }   
        )
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

    confirmReset = () => {
        if (confirm('Are you sure?')) { this.props.clearPortfolio() } 
    }

    render() {
        return (
            <>
                <div id='portfolio'>
                    <div className='portfolio-left'>
                        <h2 className='lefth2'>Portfolio</h2>
                        <div className='stock-container'>
                            { this.props.portfolio  ? this.renderStocks(this.props.portfolio) : 'There are no stocks' }
                        </div>
                        <button className='buttons' onClick={this.confirmReset}>Reset Portfolio</button>
                    </div>
                    <div className='portfolio-right'>
                        <h2 className='lefth2'>Breakdown</h2>
                    <Pie 
                        data={{
                            labels:
                                this.props.portfolio.map((stock) => {
                                    return (`${ stock.name } (%)`);
                                }),
                            datasets: [{
                                data:
                                    this.props.portfolio.map(stock => {
                                        return this.roundDP(stock.position / this.props.equity);
                                    }),
                                backgroundColor: this.pieBackgroundColours,
                                hoverBackgroundColor: this.pieBackgroundColours
                            }]
                        }}
                    ></Pie>
                    </div>
                </div>
            </>
        )
    }
}

const mSTP = state => ({
    portfolio: state.portfolio,
    equity: state.equity
})

const mDTP = dispatch => ({
    clearPortfolio: () => dispatch(resetPortfolio())
})

export default connect(mSTP, mDTP)(Portfolio)