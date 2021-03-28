import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';
import Home from './Home.js';
import App from './App.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


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
  
  try{
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    firebase.app(firebaseConfig);
  }
  
  
  class SignInScreen extends React.Component{
    state = { isSignedIn: false };
  
    uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/home',
  
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

      return (
        <div>
        <div class="columns is one-third">
          <div class="column">
          <h3>Welcome, {firebase.auth().currentUser.displayName}!</h3>
          </div>
          <div class="column">
        <Link to="/app">
          <button class="button is-danger is-light" onClick={() =>firebase.auth().signOut()}>Sign Out</button>
        </Link>
          </div>
          <div class="column">
          <h3>{firebase.auth().currentUser.email}</h3>
            </div>
        </div>
        <Home/>
          
        </div>
      );
    }
  }

  
export default SignInScreen;