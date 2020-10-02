import React from 'react'
import { connect } from 'react-redux'
import { Stock } from './index/index'
import { resetPortfolio } from '../actions/Actions'

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

    confirmReset = () => {
        if (confirm('Are you sure?')) { this.props.clearPortfolio() }
        
    }

    render() {
        return (
            <>
                <div id='portfolio'>
                    <h2 className='lefth2'>Portfolio</h2>
                    { this.props.portfolio  ? this.renderStocks(this.props.portfolio) : 'There are no stocks' }
                </div>
                <button className='buttons' onClick={this.confirmReset}>Reset Portfolio</button>
                
            </>
        )
    }
}

const mSTP = state => ({
    portfolio: state.portfolio
})

const mDTP = dispatch => ({
    clearPortfolio: () => dispatch(resetPortfolio())
})

export default connect(mSTP, mDTP)(Portfolio)