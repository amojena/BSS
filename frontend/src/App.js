import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SignInScreen from './login';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/" component={App}/> */}
          <Route path="/login" component={SignInScreen}/>
          <Route path="/home" component={Home}/>
        </Switch>

        <div class="box">

          <h1 class="title">Live Locally</h1>

          <div class="custom-top-pad">
            <div class="control">
                  <input class="input is-rounded is-large" type="text" placeholder="🔍 Where to next?"></input>
            </div>
          </div>

          <div className="subtitle-top-pad">
            <h2 class="subtitle">Tell us where you're going next and we'll find you a local who can help you during your travel!</h2>
          </div>
            
          <div class="custom-top-pad">
            <div class="columns is one-third">
                <div class="column">
                  <Link to="/login">
                    <button class="button is-success is-light">Log In</button>
                  </Link>
                </div>
                <div class="column">
                  <Link to="/login">
                    <button class="button is-link is-light">Sign Up</button>
                  </Link>
                </div>
              </div>

          </div>
        </div>

      </div>

  </Router>

  );
}

export default App;

// window.location.href = "/login"

// onclick for button
// handler function and put line 53 inside