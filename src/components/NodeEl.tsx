import { Box, Tooltip } from '@chakra-ui/react';
import { Node } from '../types';
import { useState } from 'react';
import { algorithmInExecution } from '../atoms';
import { useAtom } from 'jotai';

import "../styling/cellAnimations.css"
function NodeEl({ x, y, visited, f, h, g, start, target, weight, shortestPath, parent, current }: Node, delay: number) {
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

  }
  else if (current) {
    nodeColor = 'yellow.300';
    classname = "current";
  }
  else {
    nodeColor = 'white';
    classname = "unvisited";

  }

  const handleClick = () => { console.log(shortestPath, visited, parent); }
  return (
    <Tooltip label={`x: ${x}, y: ${y}`}>

      <Box
        cursor={`${algorithmIsExecuting ? "not-allowed" : "auto"}`}
        w="25px"
        h="25px"
        bg={nodeColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="12px"
        onClick={handleClick}
      >
        <div
          className={`${classname} node`}
          style={{ animationDelay: `${delay}ms` }}
        >

        </div>
      </Box>
    </Tooltip>
  );
}

export default NodeEl
