import "./App.css";
import DebouncedSearchInput from "./components/DebouncedSearchInput";
import DebouncedSearchResult from "./components/DebouncedSearchResult";

function App() {
  return (
    <div className="center-container">
      <h2>NPM search</h2>
      <div className="container">
        <div className="column">
          <h3>Debounced search API example</h3>
          <DebouncedSearchResult />
        </div>
        <div className="column">
          <h3>Debounced search input example</h3>
          <DebouncedSearchInput />
        </div>
      </div>
    </div>
  );
}

export default App;
