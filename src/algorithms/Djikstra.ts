import { Node } from "../types";

export function Dijkstra(
  { grid, startNode, targetNode }: {
    grid: Node[][];
    startNode: Node;
    targetNode: Node;
  },
) {
  const visitedNodesInOrder: Node[] = [];

  const nodesToVisit: Node[] = [];
  nodesToVisit.push(startNode);

  const visitedNodes: { [key: string]: boolean } = {};

  while (nodesToVisit.length > 0) {
    nodesToVisit.sort((a, b) => a.f - b.f);
    const currentNode = nodesToVisit.shift();

    // type guard to avoid undef error
    if (!currentNode) {
      continue;
    }

    if (currentNode.x === targetNode.x && currentNode.y === targetNode.y) {
      // Found targetNode node
      break;
    }

    const neighbors = getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x}-${neighbor.y}`;
      if (neighborKey in visitedNodes) {
        continue;
      }

      const newG = currentNode.g + 1;
      const newF = newG + calculateHeuristic(neighbor, targetNode);

      if (newF <= neighbor.f || !(neighborKey in nodesToVisit)) {
        neighbor.g = newG;
        neighbor.f = newF;
        neighbor.parent = currentNode;

        visitedNodes[neighborKey] = true;

        nodesToVisit.push(neighbor);

        visitedNodesInOrder.push(neighbor);
      }
    }
  }

  let currentNode = grid[targetNode.y][targetNode.x];
  const shortestPathNodes: Node[] = [];

  while (currentNode.parent) {
    shortestPathNodes.push(currentNode);
    currentNode = currentNode.parent;
  }

  return [visitedNodesInOrder, shortestPathNodes];
}

const getNeighbors = (node: Node, grid: Node[][]): Node[] => {
  const neighbors: Node[] = [];
  const { x, y } = node;

  if (x > 0) neighbors.push(grid[y][x - 1]);
  if (x < grid[0].length - 1) neighbors.push(grid[y][x + 1]);
  if (y > 0) neighbors.push(grid[y - 1][x]);
  if (y < grid.length - 1) neighbors.push(grid[y + 1][x]);

  return neighbors.filter((neighbor) => !neighbor.visited);
};

const calculateHeuristic = (
  node: Node,
  targetNode: { x: number; y: number },
): number => {
  return Math.abs(node.x - targetNode.x) + Math.abs(node.y - targetNode.y);
};
