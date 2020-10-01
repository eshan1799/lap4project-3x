import React from 'react'
import { connect } from 'react-redux'
import { newShare, updateShares } from '../actions/Actions'

class Buy extends React.Component {
    state = {
            name: this.props.search.companyName,
            exchange: this.props.search.primaryExchange,
            ticker: this.props.search.symbol,
            shares: 0,
            price: this.props.search.latestPrice
    }
    
    handleInput = (e) => {
        let shares = this.state.shares
        shares = e.target.value
        this.setState({ shares })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.portfolio.find(pos => pos['ticker'] == this.state.ticker)) {
            this.props.updatePos(this.state)
        } else {
            this.props.buyNew(this.state)
        }
    }

    render() {
        return(
            <>
             <form onSubmit={this.handleSubmit}>
                 <input required type='number' max={this.props.cash/this.props.search.latestPrice} min="0.001" step="any" onChange={this.handleInput}></input>
                 <input type='submit' value='BUY'/>
             </form>
            </>
        )
    }
}

const mSTP = state => ({
    cash: state.cash,
    search: state.searchResult,
    portfolio: state.portfolio
})

const mDTP = dispatch => ({
    buyNew: order => dispatch(newShare(order)),
    updatePos: order => dispatch(updateShares(order))
})

export default connect(mSTP, mDTP)(Buy);