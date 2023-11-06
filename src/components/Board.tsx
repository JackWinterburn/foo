import React from 'react';
import { Box } from '@chakra-ui/react';
import { Coords, Node } from '../types';
import { useAtom } from 'jotai';
import { BoardState } from '../atoms';
import NodeEl from './NodeEl';



const Board = ({ startNode, targetNode }: {startNode: Coords, targetNode: Coords}) => {
    const [boardState, setBoardState] = useAtom(BoardState);

  return (
    <Box margin="auto">
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
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
            />
          ))}
        </div>
      ))}
    </Box>
  );
};

export default Board;
