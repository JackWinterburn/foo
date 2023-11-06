import { Box } from '@chakra-ui/react';
import React from 'react';
import { Node } from '../types';

function NodeEl({x, y, visited, f, h, g, start, target, weight}: Node) {
  
  const nodeColor = visited ? 'blue.300' : 'white';
  function handleClick() {
    console.log(`clicked at ${x}, ${y}`)
  }
return (
  <Box
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
    {start ? "start" : ""}
    {target? "target" : ""}
  </Box>
);
}

export default NodeEl
