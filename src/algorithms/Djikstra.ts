import { Node } from "../types";

export function Dijkstra({
  grid,
  startNode,
  targetNode,
}: {
  grid: Node[][];
  startNode: Node;
  targetNode: Node;
}) {
  const visitedNodesInOrder: Node[] = [];
  const shortestPathNodes: Node[] = [];

  const nodesToVisit: Node[] = [];
  nodesToVisit.push(startNode);

  const visitedNodes: { [key: string]: boolean } = {};

  while (nodesToVisit.length > 0) {
    nodesToVisit.sort((a, b) => a.f - b.f);
    const currentNode = nodesToVisit.shift();

    if (!currentNode) {
      continue;
    }

    if (currentNode.x === targetNode.x && currentNode.y === targetNode.y) {
      break;
    }

    const neighbors = getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x}-${neighbor.y}`;
      if (neighborKey in visitedNodes) {
        continue;
      }

      const newG = currentNode.g + 1;

      if (newG <= neighbor.g || !(neighborKey in nodesToVisit)) {
        neighbor.g = newG;
        neighbor.parent = currentNode;

        visitedNodes[neighborKey] = true;

        nodesToVisit.push(neighbor);

        visitedNodesInOrder.push(neighbor);
      }
    }
  }

  let currentNode = grid[targetNode.y][targetNode.x];

  while (currentNode.parent) {
    shortestPathNodes.push(currentNode);
    currentNode = currentNode.parent;
  }

  return [visitedNodesInOrder, shortestPathNodes];
}

const getNeighbors = (node: Node, grid: Node[][]): Node[] => {
  const neighbors: Node[] = [];
  const { x, y } = node;

  // Define a helper function to check if a node is a valid neighbor
  const isValidNeighbor = (neighborX: number, neighborY: number): boolean => {
    return (
      neighborX >= 0 &&
      neighborX < grid[0].length &&
      neighborY >= 0 &&
      neighborY < grid.length &&
      !grid[neighborY][neighborX].visited &&
      grid[neighborY][neighborX].weight !== Infinity
    );
  };

  // Check left neighbor
  if (isValidNeighbor(x - 1, y)) neighbors.push(grid[y][x - 1]);

  // Check right neighbor
  if (isValidNeighbor(x + 1, y)) neighbors.push(grid[y][x + 1]);

  // Check top neighbor
  if (isValidNeighbor(x, y - 1)) neighbors.push(grid[y - 1][x]);

  // Check bottom neighbor
  if (isValidNeighbor(x, y + 1)) neighbors.push(grid[y + 1][x]);

  return neighbors;
};
