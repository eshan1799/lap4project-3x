import React from 'react';
import { TradeOptions, TradeSearch } from './index/index';
import { connect } from 'react-redux';
import { getSearch } from '../actions/Actions';

class Trade extends React.Component {
    componentDidMount() {
        if (this.props.location.stock) {this.props.newSearch(this.props.location.stock.stock)}
    }

    render() {
        return(
            <>
            <TradeSearch />
            {this.props.search.symbol ? <TradeOptions /> : ''}
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