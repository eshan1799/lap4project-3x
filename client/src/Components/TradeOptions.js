import React from 'react'
import { connect } from 'react-redux'
import { clearSearchResult } from '../actions/Actions'

class TradeOptions extends React.Component {
    componentWillUnmount() {
        this.props.clearSearch()
    }

    render() {
        return (
            <>
                <h3>Quote: {this.props.search.iexRealtimePrice ? this.props.search.iexRealtimePrice : 'loading'}</h3>

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