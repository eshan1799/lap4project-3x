import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { News, Stats } from './index/index'
import { getSearch, getHistoricPrices, getNews, clearSearchResult } from '../actions/Actions'

class Search extends React.Component {
    state = {
        ticker: ''
    }

    componentDidMount() {
        if (this.props.location.stock) {
            this.props.newSearch(this.props.location.stock.stock)
            this.props.newHistory(this.props.location.stock.stock)
            this.props.newNews(this.props.location.stock.stock)
        }
    }

    componentWillUnmount() {
        this.props.clearSearch()
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

                { this.props.search.symbol ? <Link to={{
                        pathname:'/dashboard/trade',
                        stock:{ 
                            stock: this.props.search.symbol
                        }
                    }}>TRADE
                </Link> : '' }
                <News />

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
    newNews: ticker => dispatch(getNews(ticker)),
    clearSearch: () => dispatch(clearSearchResult())
})

export default connect(mSTP, mDTP)(Search);