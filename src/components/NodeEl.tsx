import { Box, Tooltip } from "@chakra-ui/react";
import { Node } from "../types";
import { useState } from "react";
import { algorithmInExecution } from "../atoms";
import { useAtom } from "jotai";

import "../styling/cellAnimations.css";

function NodeEl({
  x,
  y,
  visited,
  f,
  h,
  g,
  start,
  target,
  weight,
  shortestPath,
  parent,
  current,
  delay,
}: Node) {
  const visitedStyle = {
    // border: "1px solid rgb(175, 216, 248)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    animationName: "visitedAnimation",
    animationDuration: "0.3s",
    animationTimingFunction: "ease-out",
    animationDelay: `${delay}ms`,
    animationDirection: "alternate",
    animationIterationCount: 1,
    animationFillMode: "forwards",
    animationPlayState: "running",
  };

  const shortestPathStyle = {
    // border: '1px solid #f6e05e',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    animationName: "shortestPathAnimation",
    animationDuration: "0.3s",
    animationTimingFunction: "ease-out",
    animationDelay: `${delay}ms`,
    animationDirection: "alternate",
    animationIterationCount: 1,
    animationFillMode: "forwards",
    animationPlayState: "running",
  };

  const [algorithmIsExecuting, setAlgorithmIsExecuting] =
    useAtom(algorithmInExecution);
  let nodeColor = "";
  let classname = "";
  let nodeStyle = {};

  if (start) {
    nodeColor = "green.300";
    classname = "start";
  } else if (target) {
    nodeColor = "red.300";
    classname = "target";
  } else if (shortestPath) {
    // nodeColor = 'yellow.300';
    nodeStyle = shortestPathStyle;
    classname = "shortest-path";
  } else if (visited) {
    // nodeColor = 'blue.300';
    nodeStyle = visitedStyle;
    classname = "visited";
  } else if (current) {
    nodeColor = "yellow.300";
    classname = "current";
  } else {
    nodeColor = "white";
    classname = "unvisited";
  }

  const handleClick = () => {
    console.log(shortestPath, visited, parent);
  };

  return (
    <Tooltip label={`x: ${x}, y: ${y}`}>
      <div>
        <Box
          className={`node`}
          style={nodeStyle}
          cursor={`${algorithmIsExecuting ? "not-allowed" : "auto"}`}
          w="25px"
          h="25px"
          bg={nodeColor}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="12px"
          onClick={handleClick}
        ></Box>
      </div>
    </Tooltip>
  );
}

export default NodeEl;
