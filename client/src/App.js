import React from "react";
import "./styles/App.css";
import { NavLink, Switch, Route } from "react-router-dom";
import { LandingPage, LogIn, SignUp, UnauthPreviewOthers, PrivateRoute, UnauthRoute } from './Components/index/index';
import { Error404, Dashboard } from './Containers/index/index';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Route exact path='/' component={ LandingPage } />
          <Route path='/login' component={ LogIn } />
          <Route path='/signup' component={SignUp} />
          <Route path='/unauthpreviewothers' component={UnauthPreviewOthers} /> */}

          <UnauthRoute exact path='/' component={LandingPage} />
          <UnauthRoute path='/login' component={LogIn} />
          <UnauthRoute path='/signup' component={SignUp} />
          <UnauthRoute path='/unauthpreviewothers' component={UnauthPreviewOthers} />
        
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;