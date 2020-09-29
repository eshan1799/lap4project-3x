import React from 'react'
import connect from 'react-redux'
import {NavLink} from 'react-router-dom'

class Portfolio extends React.Component {
    return(){
        <>
        </>
    }
}

const mSTP = state => ({
    portfolio: state.portfolio
})

export default connect(mSTP)(Portfolio)