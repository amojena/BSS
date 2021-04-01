import React from 'react';
import './App.css';
import testImage from './img/bg5.jpg'

class Home extends React.Component {

    state = {
        requests: null
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:4000/dev/requests")
        const reqs = await response.json()
        this.setState({requests: reqs})
        console.log(reqs)
    }

    render() {
      return (
        <div className="Home">
    
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
            </div>
                     
            
                <button class="button is-warning">+ New Trip</button>
               
            </div>
      );
    }

}


export default Home;