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
        if (this.state.details.password === this.state.details.confirm) {
            this.props.signUp(this.state.details)
        } else {
            alert('Passwords don\'t match!')
            e.target.reset()
        }
        
      }
    
      handleInput = (e) => {
        let details = this.state.details;
        details[e.target.name] = e.target.value
        this.setState({ details })
      }

    render() {
        return (
            <section className='wholeSection'>
                <nav>
                    <NavLink className='threeX' to='/'>3X</NavLink>
                </nav>
                <main className='loginCentre' className='centre'>
                <h2 id='registerH2' className='loginRegisterH2'>Register</h2>
                <form onSubmit={ this.handleSubmit }>
                    <label htmlFor='username'>Username</label>
                    <input required type='text' name="username" onChange={ this.handleInput } autoFocus required></input>
                    <label htmlFor='password'>Password</label>
                    <input required type='password' name="password" onChange={ this.handleInput } required></input>
                    <label htmlFor='confirm'>Confirm Password</label>
                    <input required type='password' name="confirm" onChange={ this.handleInput }required></input>
                    <label htmlFor='email'>Email</label>
                    <input required type='email' name='email' onChange={ this.handleInput} required></input>
                    <div className='centre'>
                        <input className='buttons' type='submit' value='Sign Up'></input>
                    </div>
                </form>
                <Link className='classicLink' to='/login'>
                    Already have an account?
                </Link>
                </main>
                <div>
                    <NavLink className='nav' to='/login'>
                        <button className='homepageButtons'>Login</button>
                    </NavLink>
                    <footer className='end'>
                        {/* <Link to='/unauthpreviewothers'>
                            <button className='homepageButtons'>User Portfolios</button>
                        </Link> */}
                    </footer>
                </div>  
            </section>
        )
    }
}

const mDTP = dispatch => ({
    signUp: (details) => dispatch(registerUser(details))
})

export default connect(null, mDTP)(SignUp)