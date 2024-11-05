import "./styles/main.scss";
import FileBrowser from "./components/FileBrowser";
import SearchBar from "./components/SearchBar";

// Icons made by Freepik, th studio, Gajah Mada, Kiranshastry from Flaticon (https://www.flaticon.com)

function App() {
  return <div className="App">
    <h1>Welcome to the File Browser</h1>
    <SearchBar />
    <FileBrowser/>
  </div>;
}

export default App;
