import React from "react";
import "./styles/App.css";
import { logIn } from './actions/Actions';
import { connect } from 'react-redux';

class App extends React.Component {
  state = {details: {}};

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
        <h1>New React App</h1>
        <h2>Happy Coding</h2>
        <form onSubmit={ this.handleSubmit }>
          <input type='text' name="username" onChange={ this.handleInput } ></input>
          <input type='password' name="password" onChange={ this.handleInput }></input>
          <input type='submit'></input>
        </form>
        <h1>id:{sessionStorage.getItem('id')}</h1>
      </>
    );
  }
}

const mDTP = dispatch => ({
  logOn: (details) => dispatch(logIn(details))
})

export default connect(null, mDTP)(App);
