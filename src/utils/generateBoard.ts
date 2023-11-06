import { Node } from "../types";

export default function generateGrid(rows: number, cols: number, startNode: { x: number, y: number }, targetNode: { x: number, y: number }): Node[][] {
    const grid: Node[][] = [];
  
    for (let i = 0; i < rows; i++) {
      const row: Node[] = [];
      for (let j = 0; j < cols; j++) {
        const node: Node = {
          x: j,
          y: i,
          visited: false,
          f: 0,
          h: 0,
          g: 0,
          start: false,
          target: false,
          weight: 1,
        };
  
        // Set start node and target node properties
        if (j === startNode.x && i === startNode.y) {
          node.start = true;
        }
  
        if (j === targetNode.x && i === targetNode.y) {
          node.target = true;
        }
  
        row.push(node);
      }
      grid.push(row);
    }
  
    return grid;
  }