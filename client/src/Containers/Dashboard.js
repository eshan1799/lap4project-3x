import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import { getPortfolio, signOut } from '../actions/Actions';
import { Portfolio, Search, Trade, TradeHistory, AuthPreviewOthers } from '../Components/index/index';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.getPort()
    }

    logOut = () => {
        localStorage.clear()
        this.props.logOff()
    }

    render() {
        return (
            <>
                <nav>
                    <NavLink to='/'>3X</NavLink>
                    <NavLink to='/dashboard'>Portfolio</NavLink>
                    <NavLink to='/dashboard/search'>Search</NavLink>
                    <NavLink to='/dashboard/trade'>Trade</NavLink>
                    <NavLink to='/dashboard/tradehistory'>History</NavLink>
                    <NavLink to='/dashboard/authpreviewothers'>Compare</NavLink>
                    <NavLink to='/' onClick={this.logOut}>Log Out</NavLink>
                </nav>
                <h1>Hello, {this.props.username}!</h1>
                <h2>Cash: ${this.props.cash} Equity: ${this.props.equity} Balance: ${this.props.balance}</h2>
                <Switch>
                    <Route exact path='/dashboard' component={Portfolio} />
                    <Route path='/dashboard/search' component={Search} />
                    <Route path='/dashboard/trade' component={Trade} />
                    <Route path='/dashboard/tradehistory' component={TradeHistory} />
                    <Route path='/dashboard/authpreviewothers' component={AuthPreviewOthers} />
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

const mDTP = dispatch => ({
    getPort: () => dispatch(getPortfolio()),
    logOff: () => dispatch(signOut())
})

export default connect(mSTP, mDTP)(Dashboard)