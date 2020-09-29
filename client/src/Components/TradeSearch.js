import React from 'react'
import { connect } from 'react-redux'

class TradeSearch extends React.Component {
    state = {
        ticker: ""
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.newSearch(this.state.ticker)
    }
    
    handleInput = (e) => {
        let ticker = this.state.ticker;
        ticker = e.target.value
        this.setState({ ticker })
    }

    render() {
        return (
            <form>
                <input type='text' placeholder="TICKER"></input>
                <input type='submit'/>
            </form>
        )
    }
}

const mDTP = dispatch => ({
    newSearch: ticker => dispatch(getSearch(ticker))
})

export default connect(null, mDTP)(TradeSearch);