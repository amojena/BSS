import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';
import Home from './Home.js';

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

      else {
          <div>
              <h1> Welcome</h1>
          </div>
      }
    }
  }

  
export default SignInScreen;