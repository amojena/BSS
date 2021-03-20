import './App.css';

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