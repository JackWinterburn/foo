import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Node } from "../types";
import { useAtom } from "jotai";
import { BoardState, algorithmInExecution } from "../atoms";
import NodeEl from "./NodeEl";
import { Dijkstra } from "../algorithms/Djikstra";

const Board = ({
  startNode,
  targetNode,
}: {
  startNode: Node;
  targetNode: Node;
}) => {
  const [algorithmIsExecuting, setAlgorithmIsExecuting] =
    useAtom(algorithmInExecution);
  const [boardState, setBoardState] = useAtom(BoardState);
  const [visitedCells, setVisitedCells] = useState<Node[]>([]);
  const [shortestPathCells, setShortestPathCells] = useState<Node[]>([]);
  let grid = boardState;
  useEffect(() => {
    if (algorithmIsExecuting) {
      let visitedNodesInOrder: Node[] = [];
      let shortestPathNodes: Node[] = [];
      const dijkstraAlgorithm = async () => {
        [visitedNodesInOrder, shortestPathNodes] = await Dijkstra({
          grid,
          startNode,
          targetNode,
        });
        setShortestPathCells(shortestPathNodes);
        setVisitedCells(visitedNodesInOrder);
        animateAlgorithm(visitedCells, shortestPathCells);
      };
      dijkstraAlgorithm();
    }
  }, [startNode, targetNode, algorithmIsExecuting]);

  const animateAlgorithm = (
    visitedNodesInOrder: Node[],
    shortestPathNodes: Node[]
  ) => {
    let grid = boardState;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setBoardState(grid);
        let arr = shortestPathNodes.reverse();
        setTimeout(() => {
          setBoardState((prevGrid) => {
            const newGrid = prevGrid.map((row) => [...row]);
            arr.forEach((node, j) => {
              const newNode = {
                ...node,
                shortestPath: true,
                delay: 30 * j,
              };
              newGrid[node.y][node.x] = newNode;
            });
            return newGrid;
          });
          setAlgorithmIsExecuting(false);
        }, visitedNodesInOrder.length * 33);
        return;
      }

      const node = visitedNodesInOrder[i];
      const newNode = {
        ...node,
        visited: true,
        delay: 30 * i,
      };
      grid[node.y][node.x] = newNode;
    }
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
