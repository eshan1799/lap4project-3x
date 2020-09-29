import React from 'react'
import connect from 'react-redux'
import { logIn } from '../actions/Actions'


class LogIn extends React.Component() {
    state = {}

    handleSubmit = e => {
        e.preventDefault()
        this.props.logOn(this.state.details)
      }
    
      handleInput = (e) => {
        let details = this.state.details;
        details[e.target.name] = e.target.value
        this.setState({ details })
      }

    render() {
        return (
            <>
            <h2>Login</h2>
            <form onSubmit={ this.handleSubmit }>
                <label for='username'>Username</label>
                <input type='text' name="username" onChange={ this.handleInput } ></input>
                <label for='password'>Password</label>
                <input type='password' name="password" onChange={ this.handleInput }></input>
                <input type='submit'></input>
            </form>
            </>
        )
    }
}

const mDTP = dispatch => ({
    logOn: (details) => dispatch(logIn(details))
})

export default connect(null, mDTP)(LogIn);