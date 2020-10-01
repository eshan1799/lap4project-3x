import React from 'react'
import { connect } from 'react-redux'
import { sellShare } from '../actions/Actions'

class Sell extends React.Component {
    state = {
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
            this.props.sellOrder(this.state)
        } else {
            alert('You do not own this stock')
        }
    }

    render() {
        return(
            <>
             <form onSubmit={this.handleSubmit}>
                 <input required type='number' max={this.props.portfolio.find(pos => pos['ticker'] == this.state.ticker) ? this.props.portfolio.find(pos => pos['ticker'] == this.state.ticker)['shares'] : 0} min="0.2" step="0.2" onChange={this.handleInput}></input>
                 <input type='submit' value='SELL'/>
             </form>
            </>
        )
    }
}

const mSTP = state => ({
    search: state.searchResult,
    portfolio: state.portfolio
})

const mDTP = dispatch => ({
    sellOrder: order => dispatch(sellShare(order))
})

export default connect(mSTP, mDTP)(Sell);