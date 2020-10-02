import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { SignUp } from './index/index';

class LandingPage extends React.Component {
    render() {
        return (
            <div className='wholeSection'>
                <div id='flex'>
                    <Link to='/login'>
                        <button className='buttons'>Login</button>
                    </Link>
                    {/* <Link to='/signup'>
                        <button className='landingPageButtons'>Register</button>
                    </Link>
                    <Link to='/unauthpreviewothers'>
                            <button className='buttons'>User Portfolios</button>
                    </Link> */}
                </div>
                <div id='marginTop65px' className='centre'>
                    <div id='title'>
                        <h1 className='landingHeaders'>3X</h1>
                        <h1 className='landingHeaders'>{ '{ FREE' }</h1>
                        <h1 className='landingHeaders'>{ 'EXCHANGE }'}</h1>
                    </div>
                    <div id='slogan'>
                        <p>
                            Real Time. Risk Free.
                        </p>
                    </div>
                </div>
                <div>
                    <Link to='/signup'>
                        <button className='buttons'>Register</button>
                    </Link>
                    <div className='end'>
                        <Link to='/unauthpreviewothers'>
                            <button className='buttons'>User Portfolios</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;