import './App.css';
import SignInScreen from './login'


function Home() {
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
                    <div class="column">
                        <p>Puerto Rico</p>
                        <img src="/img/login.jpg" width="200" height="200" alt="none"></img>
                    </div>
                    <div class="column">
                        <p>Denver</p>
                        <img src="/img/login.jpg" width="200" height="200" alt="none"></img>
                    </div>
            </div>


            <div class="columns">
                <div class="column">
                    <strong>Past Trips</strong>
                </div>
                <div class="column"></div>
                <div class="column"></div>

            </div>
            
            <div class="columns">
                    <div class="column">
                        <p>Munich</p>
                        <img src="img/login.jpg" width="200" alt="none"></img>
                    </div>
                    <div class="column"></div>
            </div>
        
            <button class="button is-warning">+ New Trip</button>
            <button class="button is-warning" onClick="{() => SignInScreen.SignOut()}"> Sign Out</button>
        </div>
    </div>
  );
}


export default Home;