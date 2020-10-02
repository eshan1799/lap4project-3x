import React from 'react'
import { connect } from 'react-redux'
import { newShare, updateShares } from '../actions/Actions'

class Buy extends React.Component {
    state = {
            shares: 0
    }
    
    handleInput = (e) => {
        let shares = this.state.shares
        shares = e.target.value
        this.setState({ shares })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const order = {
            name: this.props.search.companyName,
            exchange: this.props.search.primaryExchange,
            ticker: this.props.search.symbol,
            price: this.props.search.latestPrice,
            shares: this.state.shares
        }

        if (this.props.portfolio.find(pos => pos['ticker'] == this.props.search.symbol)) {
            this.props.updatePos(order)
        } else {
            this.props.buyNew(order)
        }
    }

    render() {
        return(
            <>
             <form onSubmit={this.handleSubmit}>
                 <input required type='number' max={this.props.cash/this.props.search.latestPrice} min="0.2" step="0.2" onChange={this.handleInput}></input>
                 <input className='buttons' type='submit' value='BUY'/>
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