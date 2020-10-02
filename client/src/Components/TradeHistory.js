import React from 'react';
import { connect } from 'react-redux';
import { IndividualHistory } from "./index/index"
import { getHistory } from '../actions/Actions'

class TradeHistory extends React.Component {
    componentDidMount() {
        this.props.getHistory()
    }
    render() {
        return(
            <>
                <h2 className='lefth2'>Trade History</h2>
                {this.props.history.slice().reverse().map((trade, idx) => <IndividualHistory key={idx} trade={trade}/>)}
            </>
        )
    }
}

const mSTP = state => ({
    history: state.history
})

const mDTP = dispatch => ({
    getHistory: () => dispatch(getHistory())
})


export default connect(mSTP,mDTP)(TradeHistory);