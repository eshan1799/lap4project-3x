import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Portfolio, Search, Trade, TradeHistory, AuthPreviewOthers } from '../Components/index/index';

class Dashboard extends React.Component {
    render() {
        return (
            <>
            <nav>
                <NavLink to='/'>3X</NavLink>
                <NavLink to='/dashboard/portfolio'>Portfolio</NavLink>
                <NavLink to='/dashboard/search'>Search</NavLink>
                <NavLink to='/dashboard/trade'>Trade</NavLink>
                <NavLink to='/dashboard/tradehistory'>History</NavLink>
                <NavLink to='/dashboard/authpreviewothers'>Compare</NavLink>
            </nav>
            <h1>Hello, { this.props.username }!</h1>
            <h2>Cash: ${ this.props.cash } Equity: ${ this.props.equity } Balance: ${ this.props.balance }</h2>
            <Switch>
                <Route path='/dashboard/portfolio' component={ Portfolio } />
                <Route path='/dashboard/search' component={ Search } />
                <Route path='/dashboard/trade' component={ Trade } />
                <Route path='/dashboard/tradehistory' component={ TradeHistory } />
                <Route path='/dashboard/authpreviewothers' component={ AuthPreviewOthers } />
            </Switch>
            </>
        )
    }
}

const mSTP = state => ({
    username: state.username,
    cash: state.cash,
    equity: state.equity,
    balance: state.balance
})

export default connect(mSTP)(Dashboard)