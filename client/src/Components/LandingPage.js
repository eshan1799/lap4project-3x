import React from 'react'
import { NavLink, Link } from 'react-router-dom'

class LandingPage extends React.Component {
    render() {
        return (
            <>
            <nav>
                <NavLink to='/'>3X</NavLink>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </nav>
            <h1>
                LANDING PAGE
            </h1>
            <Link to='/unauthpreviewothers'>
                <button>See other users' portfolios</button>
            </Link>
            </>
        )
    }
}

export default LandingPage;