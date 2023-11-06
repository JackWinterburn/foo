import React from 'react';
import { Select, Button, Flex, Spacer } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { selectedAlgorithmAtom } from '../atoms'; // Create this atom in a separate file

const ControlBar: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useAtom(selectedAlgorithmAtom);

  const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleGenerateMaze = () => {
    // Add logic for generating a random maze here
  };

  const handleClearBoard = () => {
    // Add logic for clearing the board here
  };

  const handleStartVisualization = () => {
    // Add logic for starting the visualization here
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
      <Button colorScheme="blue" onClick={handleGenerateMaze}>Generate Maze</Button>
      <Button colorScheme="red" onClick={handleClearBoard}>Clear Board</Button>
      <Button colorScheme="green" onClick={handleStartVisualization}>Start Visualization</Button>
    </Flex>
  );
};

export default ControlBar;
