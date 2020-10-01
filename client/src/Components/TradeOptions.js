import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { clearSearchResult } from '../actions/Actions'
import { Buying, Sell } from './index/index'

class TradeOptions extends React.Component {
    componentWillUnmount() {
        this.props.clearSearch()
    }

    render() {
        return (
            <>
                <h3>{this.props.search.companyName}</h3>
                <h3>Quote: ${this.props.search.latestPrice ? this.props.search.latestPrice : 'loading'}</h3>
                <NavLink to='/dashboard/trade/buy'>Buy</NavLink>
                <NavLink to='/dashboard/trade/sell'>Sell</NavLink>
                <Switch>
                    <Route path='/dashboard/trade/buy' component={ Buying }/>
                    <Route path='/dashboard/trade/sell' component={ Sell }/>
                </Switch>
                { this.props.search.symbol ? <Link to={{
                        pathname:'/dashboard/search',
                        stock:{ 
                            stock: this.props.search.symbol
                        }
                    }}>More Info
                </Link> : '' }

            </>
        )
    }
}

const mSTP = state => ({
    search: state.searchResult
})

const mDTP = dispatch => ({
    clearSearch: () => dispatch(clearSearchResult())
})
export default connect(mSTP, mDTP)(TradeOptions);