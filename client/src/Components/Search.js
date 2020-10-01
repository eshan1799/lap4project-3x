import React from 'react';
import { connect } from 'react-redux';
import { News, Stats } from './index/index'
import { getSearch, getHistoricPrices, getNews } from '../actions/Actions'

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
        // this.props.newHistory(this.state.ticker)
        this.props.newNews(this.state.ticker)
    }

    render() {
        return(
            <>
                <div id='search'>
                    <form onSubmit={this.handleSubmit}>
                        <input required placeholder='TICKER' type='text' onChange={this.handleInput} maxLength="4"></input>
                        <input type='submit' value='Search' />
                    </form>
                </div>
                
                { this.props.search.symbol ? <Stats /> : ''}
                { this.props.search.symbol ? <News /> : ''}
            </>
        )
    }
}

const mSTP = state => ({
    search: state.searchResult,
    news: state.news
})

const mDTP = dispatch => ({
    newSearch: ticker => dispatch(getSearch(ticker)),
    newHistory: ticker => dispatch(getHistoricPrices(ticker)),
    newNews: ticker => dispatch(getNews(ticker))
})

export default connect(mSTP, mDTP)(Search);