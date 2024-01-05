import React from "react";
import { Select, Button, Flex, Spacer } from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  selectedAlgorithmAtom,
  algorithmInExecution,
  BoardState,
  startNodeCoords,
  targetNodeCoords,
  boardHeight,
  boardWidth,
  wallNodeCoords,
} from "../atoms";
import generateGrid from "../utils/generateBoard";

const ControlBar: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useAtom(
    selectedAlgorithmAtom
  );
  const [algorithmIsExecuting, setAlgorithmIsExecuting] =
    useAtom(algorithmInExecution);
  const [_, setBoardState] = useAtom(BoardState);
  const [startingNodeCoords] = useAtom(startNodeCoords);
  const [endNodeCoords] = useAtom(targetNodeCoords);
  const [boardH] = useAtom(boardHeight);
  const [boardW] = useAtom(boardWidth);

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleGenerateMaze = () => {
    // Add logic for generating a random maze here
  };

  const handleClearBoard = () => {
    let newState = generateGrid(
      boardH,
      boardW,
      startingNodeCoords,
      endNodeCoords,
      [] //fix wall coords here
    );
    setBoardState(newState);
  };

  const handleStartVisualization = () => {
    setAlgorithmIsExecuting(true);
  };

  return (
    <Flex p="4" bg="gray.200" align="center">
      <Select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
        <option value="astar">A*</option>
        <option value="dijkstra">Dijkstra</option>
        <option value="dfs">DFS</option>
        <option value="greedy">Greedy Best First Search</option>
      </Select>
      <Spacer />
      <Button
        colorScheme="blue"
        onClick={handleGenerateMaze}
        isLoading={algorithmIsExecuting}
      >
        Generate Maze
      </Button>
      <Button
        colorScheme="red"
        onClick={() => handleClearBoard()}
        isLoading={algorithmIsExecuting}
      >
        Clear Board
      </Button>
      <Button
        colorScheme="green"
        onClick={handleStartVisualization}
        isLoading={algorithmIsExecuting}
      >
        Start Visualization
      </Button>
    </Flex>
  );
};

export default ControlBar;
