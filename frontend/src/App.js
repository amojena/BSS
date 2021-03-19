import './App.css';

function App() {
  return (
    <div className="App">

      <div className="hor-center">
        <div className="column is-half">
          <div className="custom-top-pad">
            <div class="control">
                <input class="input is-rounded is-large" type="text" placeholder="🔍 Where to next?"></input>
                </div>
          </div>
        </div>
      </div>

      <div className= "hor-center">
        <div className= "column is-one-third">
          <form class="box">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
              <input class="input" type="email" placeholder="e.g. alex@example.com"></input>
              </div>
            </div>

            <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="********"></input>
            </div>
          </div>

        <div class="columns is one-quarter">
          <div class="column">
            <button class="button is-success is-light">Log In</button>
          </div>
          <div class="column">
            <button class="button is-link is-light">Sign Up</button>
          </div>
        </div>

          </form>
        </div>
      </div>


    </div>
  );
}

export default App;
