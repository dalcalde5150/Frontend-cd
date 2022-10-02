import './App.css';
import Routes1 from './Routes';

function App() {
  return (
    <div>
      <header>
      <div id="logo1">
          <nav>
            <a href="/"><div className="navi">Home</div></a>
            <a href="/signin"><div className="navi">Sign In</div></a>
            <a href="/register"><div className="navi">Register</div></a>
            <a href="/event"><div className="navi">Event</div></a>
          </nav>
      </div>
    </header>
    <Routes1 />
    </div>
  );
}

export default App;
