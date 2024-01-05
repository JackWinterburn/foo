import "./App.css";
import Board from "./components/Board";

import ControlBar from "./components/ControlBar";

function App() {
  return (
    <div className="App">
      <ControlBar />
      <Board />
    </div>
  );
}

export default App;
