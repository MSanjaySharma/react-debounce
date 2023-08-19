import baseLogo from "/base.svg";
import "./App.css";

function App() {
  return (
    <div className="center-container">
      <div>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img src={baseLogo} className="logo" alt="Base logo" />
        </a>
      </div>
      <h1>GXP</h1>
    </div>
  );
}

export default App;
