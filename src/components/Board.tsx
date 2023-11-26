import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Node } from "../types";
import { useAtom } from "jotai";
import { BoardState, algorithmInExecution } from "../atoms";
import NodeEl from "./NodeEl";
import { Dijkstra } from "../algorithms/Djikstra";
import { time } from "console";

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
        }, visitedCells.length * 33);
        setAlgorithmIsExecuting(false);
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
