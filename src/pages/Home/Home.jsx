import Bike from '../../assets/Bike.svg';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Bike} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;