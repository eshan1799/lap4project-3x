import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stock } from './index/index';
import { connect } from 'react-redux';
import { getSearch } from '../actions/Actions';

class Trade extends React.Component {
    componentDidMount() {
        this.props.newSearch(this.props.location.stock.stock)
    }

    render() {
        // console.log(this.props.location.stock)
        return(
            <>
            {/* <Stock stock={ this.props.stock } /> */}

            <form>
                <label htmlFor='buy'>Buy</label>
                <input type='number' min='0' name='buy' />
                <label htmlFor='sell'>Sell</label>
                <input type='number' min='0' name='sell' />
            </form>
            
            {/* max={ Math.floor(this.props.cash/this.props.price) } */}
            {/* max={ Math.floor(this.props.position) } */}
            </>
        )
    }
}

const mSTP = state => ({
    cash: state.cash,
    search: state.searchResult
})

const mDTP = dispatch => ({
    newSearch: ticker => dispatch(getSearch(ticker))
})
export default connect(mSTP, mDTP)(Trade)