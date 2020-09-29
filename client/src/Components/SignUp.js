import React from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../actions/Actions'

class SignUp extends React.Component {
    state = {}

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
            <h2>Register</h2>
            <form onSubmit={ this.handleSubmit }>
                <label htmlFor='username'>Username</label>
                <input type='text' name="username" onChange={ this.handleInput } ></input>
                <label htmlFor='password'>Password</label>
                <input type='password' name="password" onChange={ this.handleInput }></input>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onchange={ this.handleInput}></input>
                <input type='submit'></input>
            </form>
            </>
        )
    }
}

const mDTP = dispatch => ({
    signUp: (details) => dispatch(registerUser(details))
})

export default connect(null, mDTP)(SignUp)