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
} from "../atoms"; // Create this atom in a separate file
import generateGrid from "../utils/generateBoard";

const ControlBar: React.FC = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useAtom(
        selectedAlgorithmAtom
    );
    const [algorithmIsExecuting, setAlgorithmIsExecuting] = useAtom(algorithmInExecution);
    const [boardState, setBoardState] = useAtom(BoardState);
    const [startingNodeCoords, setStartingNodeCoords] = useAtom(startNodeCoords);
    const [endNodeCoords, setEndNodeCoords] = useAtom(targetNodeCoords);
    const [boardH, setBoardH] = useAtom(boardHeight);
    const [boardW, setBoardW] = useAtom(boardWidth);

    const handleAlgorithmChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedAlgorithm(event.target.value);
    };

    const handleGenerateMaze = () => {
        // Add logic for generating a random maze here
    };

    const handleClearBoard = () => {
        let newState = generateGrid(boardH, boardW, startingNodeCoords, endNodeCoords);
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
                onClick={handleClearBoard}
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
