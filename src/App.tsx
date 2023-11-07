import './App.css';
import Board from './components/Board';
import { Node } from './types';

import ControlBar from './components/ControlBar';
import { useAtom } from "jotai";
import { startNodeCoords, targetNodeCoords }
from "./atoms";

function App() {
  const [startNode, setStartNode] = useAtom(startNodeCoords)
  const [targetNode, setTargetNode] = useAtom(targetNodeCoords)

  const start: Node = {
    h: 0,
    ...startNode,
    f: 0,
    g:0,
    visited: false,
    start: true,
    weight: 0,
    parent: null,
    shortestPath: false,
  }

  const target: Node = {
    h: 0,
    ...targetNode,
    f: 0,
    g:0,
    visited: false,
    start: true,
    weight: 0,
    parent: null,
    shortestPath: false,

  }

  return (
    <div className="App">
      <ControlBar/>
      <Board startNode={start} targetNode={target} />
    </div>
  );
}

export default App;
