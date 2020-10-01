import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { SignUp } from './index/index';

class LandingPage extends React.Component {
    render() {
        return (
            <>
            <nav>
                <NavLink to='/'>3X</NavLink>
                <NavLink to='/login'>Log In</NavLink>
            </nav>
            <main id='landing-main'>
                <div id='intro'>
                    <h1>
                        3X
                    </h1>
                    <p>
                        Introductory para will go here
                    </p>
                </div>
                <div id='signup'>
                    <SignUp />
                </div>
            </main>
            <footer className='landing-footer'>
                <Link to='/unauthpreviewothers'>
                    <button>See other users' portfolios</button>
                </Link>
            </footer>
            </>
        )
    }
}

export default LandingPage;