import { Box } from '@chakra-ui/react';
import { Node } from '../types';
import { useState } from 'react';
import { algorithmInExecution } from '../atoms';
import { useAtom } from 'jotai';

import "../styling/cellAnimations.css"
function NodeEl({x, y, visited, f, h, g, start, target, weight, shortestPath, parent}: Node) {
  const [algorithmIsExecuting, setAlgorithmIsExecuting] = useAtom(algorithmInExecution);

  let nodeColor;  
  let classname = ""

  if (start) {
    nodeColor = 'green.300';
    classname = "start";
  } else if (target) {
    nodeColor = 'red.300';
    classname = "target";

  } else if (shortestPath) {
    nodeColor = 'yellow.300';
    classname = "shortest-path";

  } else if (visited) {
    nodeColor = 'blue.300';
    classname = "visited";

  } else {
    nodeColor = 'white';
    classname = "unvisited";

  }

  const handleClick = () => {console.log(shortestPath, visited, parent)}

return (
  <Box
    className={classname}
    cursor={`${algorithmIsExecuting? "not-allowed": "auto"}`}
    w="41px"
    h="41px"
    border="1px solid #ccc"
    bg={nodeColor}
    display="flex"
    justifyContent="center"
    alignItems="center"
    fontSize="12px"
    onClick={handleClick}
  >
  </Box>
);
}

export default NodeEl
