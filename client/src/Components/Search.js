import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { News, Stats } from './index/index'
import { Line } from 'react-chartjs-2';
import { getSearch, getHistoricPrices, getNews, clearSearchResult } from '../actions/Actions'

class Search extends React.Component {
    state = {
        ticker: '',
    }

    componentDidMount() {
        if (this.props.location.stock) {
            this.props.newSearch(this.props.location.stock.stock)
            //Uncomment for real historicStockPrices
                //this.props.newHistory(this.props.location.stock.stock)
                //this.props.newNews(this.props.location.stock.stock)
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
        this.props.newHistory(this.state.ticker)
        this.props.newNews(this.state.ticker)
    }

    render() {
        return(
            <>
                <div id='search'>
                    <form onSubmit={this.handleSubmit}>

                        <input required placeholder='TICKER' type='text' onChange={this.handleInput} maxLength="4"></input>

                        <input className='buttons' type='submit' value='Search' />
                    </form>
                </div>
                <div id='search-results'>
                    <div id='search-upper'>
                        { this.props.search.symbol ? <Stats /> : ''}
                        { this.props.search.symbol ? <h2>graph here</h2> : ''}
                    </div>
                    
                    <News />
                </div>
                
                { this.props.search.symbol ? <Stats /> : ''}

                { this.props.search.symbol ?

                <Line data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

                    //Uncomment for real historicStockPrices
                        // labels: this.props.historicPrices.map(item => {
                        //     return item.label
                        // }),
                    datasets: [{
                        label: `${this.props.search.companyName} daily closing price`,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data:
                            //Uncomment for real historicStockPrices
                                // this.props.historicPrices.map(pricePoint => {
                                //     return pricePoint.close;
                                // })
                            [1, 2, 3, 4, 5, 6, 7]
                    }]
                }} />: '' }

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
    news: state.news,
    historicPrices: state.historicPrices
})

const mDTP = dispatch => ({
    newSearch: ticker => dispatch(getSearch(ticker)),
    newHistory: ticker => dispatch(getHistoricPrices(ticker)),
    newNews: ticker => dispatch(getNews(ticker)),
    clearSearch: () => dispatch(clearSearchResult())
})

export default connect(mSTP, mDTP)(Search);