import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { registerUser } from '../actions/Actions'

class SignUp extends React.Component {
    state = {
        details: {}
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.signUp(this.state.details)
      }
    
      handleInput = (e) => {
        let details = this.state.details;
        details[e.target.name] = e.target.value
        this.setState({ details })
      }

    render() {
        return (
            <>
            <nav>
                <NavLink to='/'>3X</NavLink>
                <NavLink to='/login'>Log In</NavLink>
            </nav>
            <h2>Register</h2>
            <form onSubmit={ this.handleSubmit }>
                <label htmlFor='username'>Username</label>
                <input type='text' name="username" onChange={ this.handleInput } ></input>
                <label htmlFor='password'>Password</label>
                <input type='password' name="password" onChange={ this.handleInput }></input>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={ this.handleInput}></input>
                <input type='submit'></input>
            </form>
            <Link to='/login'>
                Already have an account?
            </Link>
            </>
        )
    }
}

const mDTP = dispatch => ({
    signUp: (details) => dispatch(registerUser(details))
})

export default connect(null, mDTP)(SignUp)