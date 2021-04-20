import React from 'react';
import './App.css';
import testImage from './img/bg5.jpg'
import firebase from 'firebase';

import {addTrip, getTrips} from '../../backend/api'

// const firebaseConfig = {
//     apiKey: "AIzaSyDZEl07mkjMsShSgrG4tCGiYypL4FFMS50",
//     authDomain: "bss-ll.firebaseapp.com",
//     projectId: "bss-ll",
//     storageBucket: "bss-ll.appspot.com",
//     messagingSenderId: "698544285017",
//     appId: "1:698544285017:web:4080953269d808db4d9848",
//     measurementId: "G-518NZGXK2W"
//   };
  
//   try{
//     firebase.initializeApp(firebaseConfig);
//   } catch(err){
//     firebase.app(firebaseConfig);
//   }

class Home extends React.Component {

    state = {
        requests: null
    }

    async componentDidMount() {
        const idToken = await firebase.auth().currentUser?.getIdToken()
        let backendURL = "https://p21qvrgd2i.execute-api.us-east-1.amazonaws.com/dev/requests"

        console.log(window.location.href)

        if (window.location.href.includes('localhost')) {
            backendURL = 'http://localhost:4000/dev/requests'
        }

        console.log(backendURL)
        console.log(getTrips("Puerto Rico"))

        const response = await fetch(backendURL, {
      headers: {
        'Authorization': idToken
      }
    })

    if (response.status === 401) {return console.log("Unauthorized")}

        const reqs = await response.json()
        this.setState({requests: reqs})
        console.log(reqs)
    }


    render() {
      return (
        <div className="Home">
    
            <div class="columns">
                    <div class="column">
                        <strong>Welcome back, {firebase.auth().currentUser.displayName}!</strong>
                    </div>
                    <div class="column"></div>
                    <div class="column">
                        <strong>{firebase.auth().currentUser.email}</strong></div>
            </div>
            
            <div class="box">
                <div class="columns">
                    <div class="column">
                        <strong>Recent Searches</strong>
                    </div>
                    <div class="column"></div>
                    <div class="column"></div>
    
                </div>

                <div class="columns">
                    <div class="column is-one-half">
                        <div class="card">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-128x128">
                                        <img src={testImage} alt="Placeholder"/>
                                        </figure>
                                    </div>
                                    
                                </div>

                                    <div class="media-content">
                                    {
                                        this.state.requests && <div>
                                                    <p class="title is-4">{this.state.requests.location}</p>
                                                    <p class="subtitle is-5">{this.state.requests.status}</p>
                                                </div>                                  
                                    }
                                    </div>

                                    <div class="content">
                                       Traveler: {this.state.requests && <p> {this.state.requests.name}</p>}
                                    </div>

                            
                            </div>

                            <footer class="card-footer">
                                <a href="#" class="card-footer-item">Edit</a>
                                <a href="#" class="card-footer-item">Delete</a>
                            </footer>
                            
                        </div>
                    </div>
                
                    <div class="column is one-half"></div>
                
                </div> 
                <button class="button is-warning" onClick={() => addTrip("Puerto Rico", "Antonio")}>+ New Trip</button>
                <button class="button is-warning" onClick={() => firebase.auth().signOut()}>Sign Out</button>

            </div>
                     
            
               
            </div>
      );
    }

}


export default Home;