import { Node } from "../types";

export function DepthFirstSearch(
  grid: Node[][],
  startNode: Node,
  targetNode: Node
) {
  const visitedNodesInOrder: Node[] = [];
  const stack: Node[] = [];
  const visitedNodes: { [key: string]: boolean } = {};

  stack.push(startNode);

  while (stack.length > 0) {
    const currentNode = stack.pop();

    if (!currentNode) {
      continue;
    }

    if (currentNode.x === targetNode.x && currentNode.y === targetNode.y) {
      // Found targetNode node
      visitedNodesInOrder.push(currentNode);
      break;
    }

    if (!(currentNode.x + "-" + currentNode.y in visitedNodes)) {
      visitedNodes[currentNode.x + "-" + currentNode.y] = true;
      visitedNodesInOrder.push(currentNode);

      const neighbors = getNeighbors(currentNode, grid);

      for (const neighbor of neighbors) {
        stack.push(neighbor);
        neighbor.parent = currentNode;
      }
    }
  }

  const shortestPathNodes = getShortestPath(grid, startNode, targetNode);
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

const getShortestPath = (
  grid: Node[][],
  startNode: Node,
  endNode: Node
): Node[] => {
  const shortestPathNodes: Node[] = [];
  let currentNode = endNode;

  while (currentNode.parent && currentNode.parent !== startNode) {
    shortestPathNodes.push(currentNode);
    currentNode = currentNode.parent;
  }

  shortestPathNodes.push(startNode);
  return shortestPathNodes.reverse();
};
