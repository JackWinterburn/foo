import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Coords, Node, node } from "../types";
import { useAtom } from "jotai";
import generateGrid from "../utils/generateBoard";
import {
  BoardState,
  algorithmInExecution,
  selectedAlgorithmAtom,
} from "../atoms";
import NodeEl from "./NodeEl";
import {
  startNodeCoords,
  targetNodeCoords,
  wallNodeCoords,
  boardHeight,
  boardWidth,
} from "../atoms";
import { Dijkstra } from "../algorithms/Djikstra";
import { AStar } from "../algorithms/Astar";
import { GreedyBestFirstSearch } from "../algorithms/Greedy";
import { DepthFirstSearch } from "../algorithms/Dfs";
import { BreadthFirstSearch } from "../algorithms/Bfs";
import { BiDirectionalSwarm } from "../algorithms/BiDirectionalSwarm";

const Board = () => {
  const [startCoords] = useAtom(startNodeCoords);
  const [targetCoords] = useAtom(targetNodeCoords);
  const [selectedAlgorithm] = useAtom(selectedAlgorithmAtom);
  const [wallNodes, setWallNodeCoords] = useAtom(wallNodeCoords);
  const [boardW] = useAtom(boardWidth);
  const [boardH] = useAtom(boardHeight);

  const [startNode, setStartNode] = useState<Node>({
    ...node,
    x: startCoords.x,
    y: startCoords.y,
    start: true,
  });
  const [targetNode, setTargetNode] = useState<Node>({
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
  const algs = [
    {
      function: Dijkstra,
      symbol: "Dijkstra",
    },
    {
      function: AStar,
      symbol: "Astar",
    },
    {
      function: GreedyBestFirstSearch,
      symbol: "GBFS",
    },

    {
      function: BiDirectionalSwarm,
      symbol: "BS",
    },
    {
      function: DepthFirstSearch,
      symbol: "DFS",
    },
    {
      function: BreadthFirstSearch,
      symbol: "BFS",
    },
  ];

  useEffect(() => {
    setStartNode({ ...startNode, x: startCoords.x, y: startCoords.y });
    setTargetNode({ ...targetNode, x: targetCoords.x, y: targetCoords.y });
    setBoardState(
      generateGrid(boardH, boardW, startCoords, targetCoords, wallNodes)
    );
  }, [startCoords, targetCoords]);

  useEffect(() => {
    if (algorithmIsExecuting) {
      let bs = boardState;
      let visitedNodes: Node[] = [];
      let shortestPathNodes: Node[] = [];
      const dijkstraAlgorithm = () => {
        algs.forEach((alg) => {
          if (alg.symbol == selectedAlgorithm.symbol) {
            [visitedNodes, shortestPathNodes] = alg.function(
              bs,
              startNode,
              targetNode
            );
            setShortestPathCells(shortestPathNodes);
            setVisitedCells(visitedNodes);
            animateAlgorithm(visitedCells, shortestPathCells);
          }
        });
      };
      dijkstraAlgorithm();
      setAlgorithmIsExecuting(false);
    }
  }, [algorithmIsExecuting]);

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
    const clickedNode: Node = boardState[y][x];
    const newNode: Node = {
      ...clickedNode,
      weight: Infinity,
      visited: false,
    };
    if (!clickedNode.start && !clickedNode.target) {
      let newWallNodes = wallNodes.concat([newNode]);
      setWallNodeCoords(newWallNodes);
      setBoardState((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]);
        newGrid[y][x] = newNode;

        return newGrid;
      });
    }
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
