import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link, Redirect } from 'react-router-dom'
import { logIn } from '../actions/Actions'


class LogIn extends React.Component {
    state = {
        details: {},
        // loggedIn: ""
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.logOn(this.state.details)
        this.setState({ loggedIn: true })
    }

    handleInput = e => {
        let details = this.state.details;
        details[e.target.name] = e.target.value
        this.setState({ details })
    }

    render() {
        if (localStorage.getItem("user")) {
            < Redirect to='/dashboard' />
        }

        return (
            <section className='wholeSection'>
                <nav>
                    <NavLink className='threeX' to='/'>3X</NavLink>
                </nav>
                <main className='loginCentre' className='centre'>
                    <h2 className='loginRegisterH2'>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input required type='text' name="username" onChange={this.handleInput} autoFocus></input>
                        <label htmlFor='password'>Password</label>
                        <input required type='password' name="password" onChange={this.handleInput}></input>
                        <div className='centre'>
                            <input className='buttons' type='submit' value='Log In'></input>
                            <Link className='classicLink' to='/signup'>
                                Don't already have an account yet?
                            </Link>
                        </div>
                    </form>
                </main>
                <div>
                    <NavLink className='nav' to='/signup'>
                        <button className='homepageButtons'>Register</button>
                    </NavLink>
                    <footer className='end'>
                        <Link to='/unauthpreviewothers'>
                            <button className='homepageButtons'>User Portfolios</button>
                        </Link>
                    </footer>
                </div>  
            </section>
        )
    }
}

const mDTP = dispatch => ({
    logOn: details => dispatch(logIn(details))
})

export default connect(null, mDTP)(LogIn);