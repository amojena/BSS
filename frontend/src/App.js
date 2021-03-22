import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';
// import Home from 'Home';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZEl07mkjMsShSgrG4tCGiYypL4FFMS50",
  authDomain: "bss-ll.firebaseapp.com",
  projectId: "bss-ll",
  storageBucket: "bss-ll.appspot.com",
  messagingSenderId: "698544285017",
  appId: "1:698544285017:web:4080953269d808db4d9848",
  measurementId: "G-518NZGXK2W"
};

firebase.initializeApp(firebaseConfig);


class SignInScreen extends React.Component{
  state = { isSignedIn: false };

  uiConfig = {
    signInFlow: 'popup',

    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],

    callbacks: {
      signInSuccessWithAuthResult: () => false
    } 
  };


  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged( (user) => this.setState({isSignedIn: !!user}));
  }

  componentWillUnmount() { this.unregisterAuthObserver(); }

  render () {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>Live Locally Sign in</h1>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
  }
}

function App() {
  return (
    
    <div className="App">

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
                <button class="button is-success is-light">Log In</button>
              </div>
              <div class="column">
                <button class="button is-link is-light">Sign Up</button>
              </div>
            </div>

        </div>
          

        

      </div>

    </div>
  );
}

export default App;