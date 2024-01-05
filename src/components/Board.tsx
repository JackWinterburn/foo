import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Node, node } from "../types";
import { useAtom } from "jotai";
import { BoardState, algorithmInExecution } from "../atoms";
import NodeEl from "./NodeEl";
import { Dijkstra } from "../algorithms/Djikstra";
import { AStar } from "../algorithms/Astar";
import { GreedyBestFirstSearch } from "../algorithms/Greedy";
import { DepthFirstSearch } from "../algorithms/Dfs";
import { BreadthFirstSearch } from "../algorithms/Bfs";
import { BiDirectionalSwarm } from "../algorithms/BiDirectionalSwarm";

import { startNodeCoords, targetNodeCoords } from "../atoms";

const Board = () => {
  const [startCoords] = useAtom(startNodeCoords);
  const [targetCoords] = useAtom(targetNodeCoords);

  const [startNode] = useState<Node>({
    ...node,
    x: startCoords.x,
    y: startCoords.y,
    start: true,
  });
  const [targetNode] = useState<Node>({
    ...node,
    x: targetCoords.x,
    y: targetCoords.y,
    target: true,
  });

  const [algorithmIsExecuting, setAlgorithmIsExecuting] =
    useAtom(algorithmInExecution);
  const [boardState, setBoardState] = useAtom(BoardState);
  const [visitedCells, setVisitedCells] = useState<Node[]>([]);
  const [shortestPathCells, setShortestPathCells] = useState<Node[]>([]);

  useEffect(() => {
    if (algorithmIsExecuting) {
      let bs = boardState;
      let visitedNodes: Node[] = [];
      let shortestPathNodes: Node[] = [];
      console.log(bs[9][4]);
      const dijkstraAlgorithm = () => {
        [visitedNodes, shortestPathNodes] = GreedyBestFirstSearch(
          bs,
          startNode,
          targetNode
        );
        console.log(visitedNodes);
        console.log(shortestPathNodes);
        setShortestPathCells(shortestPathNodes);
        setVisitedCells(visitedNodes);
        animateAlgorithm(visitedCells, shortestPathCells);
      };
      dijkstraAlgorithm();
      setAlgorithmIsExecuting(false);
    }
  }, [algorithmIsExecuting]);

  useEffect(() => {
    console.log("board state has changed");
  }, [boardState]);

  const animateAlgorithm = (
    visitedNodes: Node[],
    shortestPathNodes: Node[]
  ) => {
    const animateStep = (nodes: Node[], delayMultiplier: number) => {
      setTimeout(() => {
        setBoardState((prevGrid) => {
          const newGrid = prevGrid.map((row) =>
            row.map((node) => ({ ...node }))
          );

          nodes.forEach((node, i) => {
            const newNode = {
              ...node,
              visited: nodes === visitedNodes,
              shortestPath: nodes === shortestPathNodes,
              delay: 30 * i,
            };
            newGrid[node.y][node.x] = newNode;
          });

          return newGrid;
        });
      }, delayMultiplier * 33);
    };

    animateStep(visitedNodes, 0);
    animateStep(shortestPathNodes.reverse(), visitedNodes.length);
  };

  const handleNodeClick = (x: number, y: number) => {
    setBoardState((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      const clickedNode = newGrid[y][x];

      // Check if the clicked node is not the start or target node
      if (!clickedNode.start && !clickedNode.target) {
        // Update the weight to infinity to make it a wall node
        const newNode = {
          ...clickedNode,
          weight: Infinity,
          visited: false, // Ensure visited status is reset for walls
        };
        newGrid[y][x] = newNode;
      }

      return newGrid;
    });
  };

  return (
    <>
      <Box
        margin="auto"
        pointerEvents={`${algorithmIsExecuting ? "none" : "auto"}`}
      >
        {boardState.map((row, rowIndex) => (
          <Box key={rowIndex} style={{ display: "flex" }}>
            {row.map((node) => (
              <NodeEl
                onClick={() => handleNodeClick(node.x, node.y)}
                key={`${node.x}-${node.y}`}
                x={node.x}
                y={node.y}
                visited={node.visited}
                f={node.f}
                h={node.h}
                g={node.g}
                start={node.start}
                target={node.target}
                weight={node.weight}
                shortestPath={node.shortestPath}
                delay={node.delay}
                parent={null}
              />
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Board;
