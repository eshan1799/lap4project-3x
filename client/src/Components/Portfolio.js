import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Stock } from './index/index'

class Portfolio extends React.Component {

    renderStocks = portfolio => {
        return portfolio.map((stock, index) => (
            <div key={index}>
                <Stock stock={stock} />
            </div>
        ))
    }

    render() {
        return (
            <>
                <div id='portfolio'>
                    <h2>Portfolio</h2>
                    {this.props.portfolio ? this.renderStocks(this.props.portfolio) : 'There are no stocks'}
                </div>
                
            </>
        )
    }
}

const mSTP = state => ({
    portfolio: state.portfolio
})

export default connect(mSTP)(Portfolio)