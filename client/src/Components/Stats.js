import React from 'react'
import { connect } from 'react-redux'

class Stats extends React.Component {
    render() {
        return(
            <div id="stats">
                <h4>{this.props.search.companyName}</h4>
                <h5>Latest Price: ${this.props.search.latestPrice}</h5>
                <h5>Exchange: {this.props.search.primaryExchange}</h5>
                <h5>Previous Close: ${this.props.search.previousClose}</h5>
                <h5>Change: ${this.props.search.change}</h5>
                <h5>Change %: {(this.props.search.changePercent * 100).toFixed(2)}</h5>
                <h5>52 Week High: ${this.props.search.week52High}</h5>
                <h5>52 Week Low: ${this.props.search.week52Low}</h5>
                <h5>YTD Change %: {(this.props.search.ytdChange * 100).toFixed(2)}</h5>
            </div>
        )
    }
}

const mSTP = state => ({
    search: state.searchResult
})

export default connect(mSTP)(Stats);