import React from 'react'
import { connect } from 'react-redux'
import { getSearch } from '../actions/Actions'

class TradeSearch extends React.Component {
    state = {
        ticker: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.newSearch(this.state.ticker)
    }
    
    handleInput = (e) => {
        let ticker = this.state.ticker;
        ticker = e.target.value
        this.setState({ ticker })
    }

    render() {
        return (
            <form className='search' onSubmit={this.handleSubmit}>
                <input required type='text' placeholder="TICKER" onChange={this.handleInput} maxLength="5" autoFocus></input>
                <input className='buttons' type='submit' value='Search'></input>
            </form>
        )
    }
}

const mDTP = dispatch => ({
    newSearch: ticker => dispatch(getSearch(ticker))
})

export default connect(null, mDTP)(TradeSearch);