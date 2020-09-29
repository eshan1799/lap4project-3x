import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stock, TradeOptions, TradeSearch } from './index/index';
import { connect } from 'react-redux';
import { getSearch } from '../actions/Actions';

class Trade extends React.Component {
    componentDidMount() {
        this.props.newSearch(this.props.location.stock.stock)
    }

    render() {
        return(
            <>
            {this.props.search ? <TradeOptions /> : <TradeSearch />}
            </>
        )
    }
}

const mSTP = state => ({
    search: state.searchResult
})

const mDTP = dispatch => ({
    newSearch: ticker => dispatch(getSearch(ticker))
})

export default connect(mSTP, mDTP)(Trade)