import React from "react";
import { Select, Button, Flex, Spacer, Box } from "@chakra-ui/react";
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import generateGrid from "../utils/generateBoard";

const ControlBar: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useAtom(
    selectedAlgorithmAtom
  );
  const [algorithmIsExecuting, setAlgorithmIsExecuting] =
    useAtom(algorithmInExecution);
  const [_, setBoardState] = useAtom(BoardState);
  const [startingNodeCoords, setStartNodeCoords] = useAtom(startNodeCoords);
  const [endNodeCoords, setEndNodeCoords] = useAtom(targetNodeCoords);
  const [wallNodes, setWallNodeCoords] = useAtom(wallNodeCoords);
  const [boardH] = useAtom(boardHeight);
  const [boardW] = useAtom(boardWidth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const algorithms = [
    {
      name: "Dijkstra",
      symbol: "Dijkstra",
      description: `Starting Point: Choose a starting point in the maze.

      Initialize Distances: Assign a distance of 0 to the starting point and infinity to all other points.\n
      
      Explore Neighbors: Look at all the points directly connected to the starting point (neighbors) and update their distances. The distance to a neighbor is the sum of the distance to the current point and the length of the path to that neighbor.\n
      
      Choose Shortest Path: Among the unexplored points, choose the one with the shortest distance. Move to that point and repeat the process.\n
      
      Repeat Until Goal: Keep repeating steps 3 and 4 until you reach your goal. At each step, update distances and choose the shortest path.\n
      
      Shortest Path Found: Once you reach your goal, you've found the shortest path from the starting point to the goal.`,
    },
    {
      name: "A Star",
      symbol: "Astar",
      description: `desc`,
    },
    {
      name: "Greedy Best First Search",
      symbol: "GBFS",
      description: "GBFS desc",
    },

    {
      name: "Bidirectional Swarm",
      symbol: "BS",
      description: "BS desc",
    },
    {
      name: "Depth First Search",
      symbol: "DFS",
      description: "DFS desc",
    },
    {
      name: "Best First Search",
      symbol: "BFS",
      description: "BFS desc",
    },
  ];

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const symbol = event.target.value;
    algorithms.forEach((alg) => {
      if (alg.symbol == symbol) setSelectedAlgorithm(alg);
    });
  };

  const handleLearnMore = () => {};

  const handleClearBoard = () => {
    window.location.reload();
  };

  const onStartCoordsChange = (x: number, y: number) => {
    setStartNodeCoords({ x, y });
  };

  const onTargetCoordsChange = (x = endNodeCoords.x, y = endNodeCoords.y) => {
    setEndNodeCoords({ x, y });
  };

  const handleStartVisualization = () => {
    setAlgorithmIsExecuting(true);
  };

  return (
    <>
      <Flex p="4" bg="gray.200" align="center">
        <Select
          value={selectedAlgorithm.symbol}
          onChange={handleAlgorithmChange}
        >
          <option value="Astar">A Star</option>
          <option value="Dijkstra">Dijkstra</option>
          <option value="DFS">Depth First Search</option>
          <option value="GBFS">Greedy Best First Search</option>
        </Select>
        <Spacer />
        <Button
          colorScheme="blue"
          onClick={onOpen}
          isLoading={algorithmIsExecuting}
        >
          Learn More
        </Button>
        <Button
          colorScheme="red"
          onClick={() => handleClearBoard()}
          isLoading={algorithmIsExecuting}
        >
          Reset Board
        </Button>
        <Button
          colorScheme="green"
          onClick={handleStartVisualization}
          isLoading={algorithmIsExecuting}
        >
          Start Visualization
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{`${selectedAlgorithm.name} Algorithm`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{selectedAlgorithm.description}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex p="2" bg="gray.200">
        <Box bg="green">
          <NumberInput
            size="sm"
            defaultValue={startingNodeCoords.x}
            maxW={20}
            min={0}
            max={boardW - 1}
            onChange={(x) =>
              onStartCoordsChange(Number(x), startingNodeCoords.y)
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            size="sm"
            defaultValue={startingNodeCoords.y}
            maxW={20}
            min={0}
            max={boardH - 1}
            onChange={(y) =>
              onStartCoordsChange(startingNodeCoords.x, Number(y))
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>

        <Box bg="red">
          <NumberInput
            size="sm"
            defaultValue={endNodeCoords.x}
            maxW={20}
            min={0}
            max={boardW - 1}
            onChange={(x) => onTargetCoordsChange(Number(x), endNodeCoords.y)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            size="sm"
            defaultValue={endNodeCoords.y}
            maxW={20}
            min={0}
            max={boardH - 1}
            onChange={(y) => onTargetCoordsChange(endNodeCoords.x, Number(y))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Flex>
    </>
  );
};

export default ControlBar;
