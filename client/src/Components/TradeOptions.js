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
            <div className='searchColumn'>
                <h2 id='h2trade' className='lefth2'>{this.props.search.companyName}</h2><br />
                <div>
                <h3>Quote: ${this.props.search.latestPrice ? this.props.search.latestPrice : 'loading'}</h3> <br />
                <NavLink className='margin' to='/dashboard/trade/buy'>Buy</NavLink>
                <NavLink className='margin' to='/dashboard/trade/sell'>Sell</NavLink>
                { this.props.search.symbol ? <Link className='margin' to={{
                        pathname:'/dashboard/search',
                        stock:{ 
                            stock: this.props.search.symbol
                        }
                    }}>More Info
                </Link> : '' }
                </div>
                <Switch>
                    <Route path='/dashboard/trade/buy' component={ Buying }/>
                    <Route path='/dashboard/trade/sell' component={ Sell }/>
                </Switch>
                {/* { this.props.search.symbol ? <Link className='margin' to={{
                        pathname:'/dashboard/search',
                        stock:{ 
                            stock: this.props.search.symbol
                        }
                    }}>More Info
                </Link> : '' } */}
            </div>
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