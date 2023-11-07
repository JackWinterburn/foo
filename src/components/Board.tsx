import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Node } from '../types';
import { useAtom } from 'jotai';
import { BoardState, algorithmInExecution } from '../atoms';
import NodeEl from './NodeEl';
import { Dijkstra } from "../algorithms/Djikstra"


const Board = ({ startNode, targetNode }: {startNode: Node, targetNode: Node}) => {
    const [algorithmIsExecuting, setAlgorithmIsExecuting] = useAtom(algorithmInExecution);
    const [boardState, setBoardState] = useAtom(BoardState);
    let grid = boardState;
    useEffect(() => {
      if(algorithmIsExecuting) {

        let visitedNodesInOrder: Node[] = [];
        let shortestPathNodes: Node[] = [];
        const dijkstraAlgorithm = async () => {
          [visitedNodesInOrder, shortestPathNodes] = await Dijkstra({grid, startNode, targetNode});
          
          animateAlgorithm(visitedNodesInOrder, shortestPathNodes);
        };
        
        dijkstraAlgorithm();
      }
    }, [startNode, targetNode, algorithmIsExecuting]);
    
    const animateAlgorithm = (visitedNodesInOrder: Node[], shortestPathNodes: Node[]) => {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            shortestPathNodes.forEach(node => {
              setTimeout(() => {
                setBoardState(prevGrid => {
                  const newGrid = prevGrid.map(row => [...row]);
                  const newNode = {
                    ...node,
                    shortestPath: true,
                  };
                  newGrid[node.y][node.x] = newNode;
                  return newGrid;
                });
              }, 50)
            });
            setAlgorithmIsExecuting(false);
          }, 30 * i);
          return;
        }
        setTimeout(() => {
          const grid = boardState;
          const node = visitedNodesInOrder[i];
          const newGrid = grid.slice();
          const newNode = {
            ...node,
            visited: true,
          };
          newGrid[node.y][node.x] = newNode;
          setBoardState(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            const newNode = {
              ...node,
              visited: true,
            };
            newGrid[node.y][node.x] = newNode;
            return newGrid;
          });        
        }, 30 * i);
      }

    };

  return (
    <Box margin="auto" 
    pointerEvents={`${algorithmIsExecuting? "none" : "auto"}`}
    >
      {boardState.map((row, rowIndex) => (
        <Box key={rowIndex} style={{ display: 'flex' }}>
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
              parent={null}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Board;
