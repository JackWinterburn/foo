import './App.css';
import Board from './components/Board';

import ControlBar from './components/ControlBar';
import { useAtom } from "jotai";
import { startNodeCoords, targetNodeCoords }
from "./atoms";

function App() {
  const [startNode, setStartNode] = useAtom(startNodeCoords)
  const [targetNode, setTargetNode] = useAtom(targetNodeCoords)
  return (
    <div className="App">
      <ControlBar/>
      <Board startNode={startNode} targetNode={targetNode} />
    </div>
  );
}

export default App;
