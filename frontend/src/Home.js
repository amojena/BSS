import React from 'react';
import './App.css';
import testImage from './img/bg5.jpg'
import firebase from 'firebase';

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
        requests: []
    }

    async componentDidMount() {
        // const idToken = await firebase.auth().currentUser?.getIdToken()
        // let backendURL = "https://p21qvrgd2i.execute-api.us-east-1.amazonaws.com/dev/requests"

        // if (window.location.href.includes('localhost')) {
        //     backendURL = 'http://localhost:4000/dev/requests'
        // }

        // const response = await fetch(backendURL, {
        //     headers: {
        //         'Authorization': idToken
        //     }
        // })

        // if (response.status === 401) {
        //     return console.log("Unauthorized")
        // }

        // const reqs = await response.json()
        // this.setState({requests: reqs})
        // console.log("GET")
        // console.log(reqs)

        this.fetchAllTrips()
    }

    async makeNewTrip(){
        const idToken = await firebase.auth().currentUser?.getIdToken()
        let backendURL = "https://p21qvrgd2i.execute-api.us-east-1.amazonaws.com/dev/requests"


        if (window.location.href.includes('localhost')) {
            backendURL = 'http://localhost:4000/dev/requests'
        }

        let tripName = document.getElementsByClassName("input is-medium")[0].value
        // const tripName = typeof trip !== 'undefined' ? trip : 'Default';

        // if (tripName === 'Default'){
        //     return;
        // }

        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                'Authorization': idToken
            },
            body: JSON.stringify({
                location: tripName,
                name: "Antonio M",
                status: "Pending"
            })
        }).then(response => response.json())
        
        console.log("POST")

        if (response.status === 401) {
            return console.log("Unauthorized")
        }else if (response.status === 400) {
            return console.log(response.body.message)
        }

        this.fetchAllTrips()
    }

    async fetchAllTrips(){
        const idToken = await firebase.auth().currentUser?.getIdToken()
        let backendURL = "https://p21qvrgd2i.execute-api.us-east-1.amazonaws.com/dev/requests/all"

        if (window.location.href.includes('localhost')) {
            backendURL = 'http://localhost:4000/dev/requests/all'
        }

        const response = await fetch(backendURL, {
            headers: {
                'Authorization': idToken
            }
        })

        if (response.status === 401) {
            return console.log("Unauthorized")
        }

        const reqs = await response.json()
        this.setState({requests: reqs})
        console.log("GET ALL")
        console.log(this.state.requests)
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
                        <ul>
                            {console.log(typeof this.state.requests)}
                            {this.state.requests && this.state.requests.map(request=> {
                                return <li>Location: {request.location_name}</li>
                            })}
                        </ul>
                        
                                
                    </div>
                
                    <div class="column is one-half"></div>
                
                </div> 

                <li>

                </li>
                <input class="input is-medium" on type="text" placeholder="Enter new destination"/>
                <button class="button is-warning" onClick={() => this.makeNewTrip()}>+ New Trip</button>
                <button class="button is-warning" onClick={() => firebase.auth().signOut()}>Sign Out</button>



            </div>
                     
            
               
            </div>
      );
    }

}


export default Home;