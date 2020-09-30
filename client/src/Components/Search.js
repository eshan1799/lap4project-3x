import React from 'react';
import { connect } from 'react-redux';
import { getSearch, getHistoricPrices } from '../actions/Actions'

class Search extends React.Component {
    state = {
        ticker: ''
    }

    handleInput = (e) => {
        let ticker = this.state.shares
        ticker = e.target.value
        this.setState({ ticker })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.newSearch(this.state.ticker)
        this.props.newHistory(this.state.ticker)
    }

    render() {
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type='text'></input>
                    <input type='submit' value='Search' />
                </form>

            </>
        )
    }
}

const mSTP = state => ({
    search: state.search
})

const mDTP = dispatch => ({
    newSearch: ticker => dispatch(getSearch(ticker)),
    newHistory: ticker => dispatch(getHistoricPrices(ticker))
})

export default connect(mSTP, mDTP)(Search);