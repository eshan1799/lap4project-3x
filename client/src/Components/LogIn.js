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
            <>
                <nav>
                    <NavLink to='/'>3X</NavLink>
                    <NavLink to='/'>Sign Up</NavLink>
                </nav>
                <main>
                    <h2>Login</h2>
                    <form id="login-form" onSubmit={this.handleSubmit}>
                        <label htmlFor='username'>Username</label>
                        <input required type='text' name="username" onChange={this.handleInput} autoFocus></input>
                        <label htmlFor='password'>Password</label>
                        <input required type='password' name="password" onChange={this.handleInput}></input>
                        <input type='submit' value='Log In'></input>
                        <Link to='/signup'>
                            Don't already have an account yet?
                        </Link>
                    </form>
                    
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

const mDTP = dispatch => ({
    logOn: details => dispatch(logIn(details))
})

export default connect(null, mDTP)(LogIn);