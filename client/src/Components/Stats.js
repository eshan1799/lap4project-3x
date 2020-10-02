import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Stats extends React.Component {
    render() {
        return(
            <div id="stats">

                <h3>{this.props.search.companyName}</h3>
                <table className="tg">
                <tbody>
                <tr>
                    <td className="tg-0lax">Latest Price</td>
                    <td className="tg-0lax">{this.props.search.latestPrice}</td>
                    <td className="tg-0lax">Exchange</td>
                    <td className="tg-0lax">{this.props.search.primaryExchange}</td>
                    
                </tr>
                <tr>
                    <td className="tg-0lax">Previous Close</td>
                    <td className="tg-0lax">{this.props.search.previousClose}</td>
                    <td className="tg-0lax">Change</td>
                    <td className="tg-0lax">{this.props.search.change}</td>
                </tr>
                <tr>
                    
                    
                    <td className="tg-0lax">YTD Change</td>
                    <td className="tg-0lax">{(this.props.search.ytdChange * 100).toFixed(2)}</td>
                    <td className="tg-0lax">Change %</td>
                    <td className="tg-0lax">{(this.props.search.changePercent * 100).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="tg-0lax">52 Week High</td>
                    <td className="tg-0lax">{this.props.search.week52High}</td>
                    <td className="tg-0lax">52 Week Low</td>
                    <td className="tg-0lax">{this.props.search.week52Low}</td>
                    
                    
                </tr>
                </tbody>
                </table>
                {/* <h5>Latest Price: ${this.props.search.latestPrice}</h5>
                <h5>Exchange: {this.props.search.primaryExchange}</h5>
                <h5>Previous Close: ${this.props.search.previousClose}</h5>
                <h5>Change: ${this.props.search.change}</h5>
                <h5>Change %: {(this.props.search.changePercent * 100).toFixed(2)}</h5>
                <h5>52 Week High: ${this.props.search.week52High}</h5>
                <h5>52 Week Low: ${this.props.search.week52Low}</h5>
                <h5>YTD Change %: {(this.props.search.ytdChange * 100).toFixed(2)}</h5> */}
                { this.props.search.symbol ? <Link to={{
                                pathname:'/dashboard/trade',
                                stock:{ 
                                    stock: this.props.search.symbol
                                }
                            }}>TRADE
                        </Link> : '' }
            </div>
        )
    }
}

const mSTP = state => ({
    search: state.searchResult
})

export default connect(mSTP)(Stats);