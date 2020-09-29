import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch, Route } from "react-router-dom"

class Dashboard extends React.Component {
    render() {
        return (
            <>
            <h1>Hello, {this.props.username}!</h1>
            <h2>Cash: ${this.props.cash} Equity: ${this.props.equity} Balance: ${this.props.equity}</h2>
            <Switch>
                <Route path='/portfolio' component={ Portfolio } />
                <Route path='/search' component={ Search } />
                <Route path='/trade' component={ Trade } />
                <Route path='/history' component={ History } />
                <Route path='/authpreviewothers' component={ AuthPreviewOthers } />
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