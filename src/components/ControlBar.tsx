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
  useDisclosure
} from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const algorithms = [
    {
      name: "Dijkstra",
      symbol: "Dijkstra",
      description: `How does Dijkstra’s Algorithm work?
      In a summarized way, the algorithm…
      Starts at the node that we give as a parameter and it will return the shortest path between this node and all the other nodes (or vertexes) in the graph.
      It calculates the shortest distance from each node to the source and saves this value if it finds a shorter path that the path that it had saved before. It calculates the distance between a node and the origin node, if this distance is less than it has been saved before, the new minimum distance will be the new distance.
      Once Dijkstra’s algorithm has found the shortest path between the origin node and another node, it marks the node as visited (if it didn’t do it the algorithm could enter into an infinite loop).
      Steps 2 and 3 are repeated until all the nodes are visited. This way, we have visited all the nodes and we’ve saved the shortest path possible to reach each node.`
    },
    {
      name: "A Star",
      symbol: "Astar",
      description: "A* desc"
    },
    {
      name: "Greedy Best First Search",
      symbol: "GBFS",
      description: "GBFS desc"
    },

    {
      name: "Bidirectional Swarm",
      symbol: "BS",
      description: "BS desc"
    },
    {
      name: "Depth First Search",
      symbol: "DFS",
      description: "DFS desc"
    },
    {
      name: "Best First Search",
      symbol: "BFS",
      description: "BFS desc",
    }
  ]

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const symbol = event.target.value
    algorithms.forEach(alg => {
      if (alg.symbol == symbol) setSelectedAlgorithm(alg);
    })

  };

  const handleLearnMore = () => {

  };

  const handleClearBoard = () => {
    console.log(wallNodes)
    setWallNodeCoords([]);
    console.log(wallNodes)

    let newState = generateGrid(
      boardH,
      boardW,
      startingNodeCoords,
      endNodeCoords,
      []//fix wall coords here
    );
    setBoardState(newState);
  };

  const onStartCoordsChange = (x = startingNodeCoords.x, y = startingNodeCoords.y) => {
    setStartNodeCoords({ x, y });
  }

  const onTargetCoordsChange = (x = endNodeCoords.x, y = endNodeCoords.y) => {
    setEndNodeCoords({ x, y });
  }

  const handleStartVisualization = () => {
    setAlgorithmIsExecuting(true);
  };

  return (
    <>
      <Flex p="4" bg="gray.200" align="center">
        <Select value={selectedAlgorithm.symbol} onChange={handleAlgorithmChange}>
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
          Clear Board
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
            <ModalBody>
              {selectedAlgorithm.description}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex p="2" bg="gray.200">
        <Box bg="green">
          <NumberInput size="sm" defaultValue={startingNodeCoords.x} maxW={20} min={0} max={boardW - 1} onChange={(x) => onStartCoordsChange(Number(x))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput size="sm" defaultValue={startingNodeCoords.y} maxW={20} min={0} max={boardH - 1} onChange={(y) => onStartCoordsChange(Number(y))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>Target Node:</Box>
      </Flex>
    </>
  );
};

export default ControlBar;
