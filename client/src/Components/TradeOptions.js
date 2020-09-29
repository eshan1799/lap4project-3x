import React from 'react'
import { connect } from 'react-redux'

class TradeOptions extends React.Component {
    render() {
        return (
            <>
                <h3>Quote: {this.props.search.iexRealtimePrice}</h3>
                
            </>
        )
    }
}

const mSTP = state => ({
    search: state.searchResult
})

export default connect(mSTP)(TradeOptions);