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
                <nav className='spaceBetween'>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                    <NavLink to='/dashboard/search'>Search</NavLink>
                    <NavLink to='/dashboard/trade'>Trade</NavLink>
                    <NavLink to='/dashboard/tradehistory'>History</NavLink>
                    <NavLink to='/dashboard/authpreviewothers'>Compare</NavLink>
                    <NavLink to='/' onClick={ this.logOut }>Log Out</NavLink>
                </nav>
                <main>
                    <div id='user-info'>
                        <h2>{ this.props.username }'s Dashboard</h2>
                        <div className='centerRow'>
                            <h3>Cash: ${ this.props.cash }</h3>
                            <h3>Equity: ${ this.props.equity }</h3>
                            <h3>Balance: ${ this.props.balance }</h3>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path='/dashboard' component={ Portfolio } />
                        <Route path='/dashboard/search' component={ Search } />
                        <Route path='/dashboard/trade' component={ Trade } />
                        <Route path='/dashboard/tradehistory' component={ TradeHistory } />
                        <Route path='/dashboard/authpreviewothers' component={ AuthPreviewOthers } />
                    </Switch>
                </main>
                
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
    logOff: () => dispatch(signOut()),
    getPort: () => dispatch(getPortfolio())
})

export default connect(mSTP, mDTP)(Dashboard)