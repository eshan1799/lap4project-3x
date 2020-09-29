import React from 'react';
import { NavLink } from 'react-router-dom'

class UnauthPreviewOthers extends React.Component {
    render() {
        return(
            <>
            <nav>
                <NavLink to='/'>3X</NavLink>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </nav>
            <h1>Preview Users' Portfolios</h1>
            </>
        )
    }
}

export default UnauthPreviewOthers;