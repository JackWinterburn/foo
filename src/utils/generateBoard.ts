import { Coords, Node } from "../types";

export default function generateGrid(
  rows: number,
  cols: number,
  startNode: Coords,
  targetNode: Coords,
  wallNodes: Coords[]
): Node[][] {
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
        parent: null,
        shortestPath: false,
      };

      // Set start node and target node properties
      if (j === startNode.x && i === startNode.y) {
        node.start = true;
      } else if (j === targetNode.x && i === targetNode.y) {
        node.target = true;
      } else {
        wallNodes.forEach((coord) => {
          if (j === coord.x && i === coord.y) node.weight = Infinity; //node is a wall
        });
      }
      row.push(node);
    }
    grid.push(row);
  }

  return grid;
}
