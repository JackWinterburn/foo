import { Node } from "../types";

export function GreedyBestFirstSearch(
  grid: Node[][],
  startNode: Node,
  targetNode: Node
) {
  const visitedNodesInOrder: Node[] = [];
  const shortestPathNodes: Node[] = [];

  const nodesToVisit: Node[] = [];
  nodesToVisit.push(startNode);

  const visitedNodes: { [key: string]: boolean } = {};

  while (nodesToVisit.length > 0) {
    nodesToVisit.sort(
      (a, b) =>
        calculateHeuristic(a, targetNode) - calculateHeuristic(b, targetNode)
    );
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

      neighbor.parent = currentNode;

      visitedNodes[neighborKey] = true;

      nodesToVisit.push(neighbor);

      visitedNodesInOrder.push(neighbor);
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

  if (isValidNeighbor(x - 1, y)) neighbors.push(grid[y][x - 1]);
  if (isValidNeighbor(x + 1, y)) neighbors.push(grid[y][x + 1]);
  if (isValidNeighbor(x, y - 1)) neighbors.push(grid[y - 1][x]);
  if (isValidNeighbor(x, y + 1)) neighbors.push(grid[y + 1][x]);

  return neighbors;
};

const calculateHeuristic = (
  node: Node,
  targetNode: { x: number; y: number }
): number => {
  // Manhattan heuristic
  return Math.abs(node.x - targetNode.x) + Math.abs(node.y - targetNode.y);
};
