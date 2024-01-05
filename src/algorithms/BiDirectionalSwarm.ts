import { Node } from "../types";

type SearchResult = [Node[], Node[]];

export function BiDirectionalSwarm(
  grid: Node[][],
  startNode: Node,
  targetNode: Node
): SearchResult {
  const startVisitedNodes: { [key: string]: boolean } = {};
  const targetVisitedNodes: { [key: string]: boolean } = {};
  const startNodesToVisit: Node[] = [startNode];
  const targetNodesToVisit: Node[] = [targetNode];
  const visitedNodesInOrder: Node[] = [];
  let shortestPathNodes: Node[] = [];

  while (startNodesToVisit.length > 0 && targetNodesToVisit.length > 0) {
    const startResult = processNode(
      startNodesToVisit,
      startVisitedNodes,
      targetVisitedNodes,
      visitedNodesInOrder,
      shortestPathNodes,
      grid
    );

    if (startResult) {
      return startResult;
    }

    const targetResult = processNode(
      targetNodesToVisit,
      targetVisitedNodes,
      startVisitedNodes,
      visitedNodesInOrder,
      shortestPathNodes,
      grid
    );

    if (targetResult) {
      return targetResult;
    }
  }

  return [[], []];
}

function processNode(
  nodesToVisit: Node[],
  visitedNodes: { [key: string]: boolean },
  oppositeVisitedNodes: { [key: string]: boolean },
  visitedNodesInOrder: Node[],
  shortestPathNodes: Node[],
  grid: Node[][]
): SearchResult | undefined {
  const currentNode = nodesToVisit.shift();

  if (!currentNode) {
    return undefined;
  }

  const { x, y } = currentNode;
  const neighborKeys = [
    `${x - 1}-${y}`,
    `${x + 1}-${y}`,
    `${x}-${y - 1}`,
    `${x}-${y + 1}`,
  ];

  for (const neighborKey of neighborKeys) {
    if (neighborKey in visitedNodes) {
      continue;
    }

    const [neighborX, neighborY] = neighborKey.split("-").map(Number);

    if (
      neighborX >= 0 &&
      neighborX < grid[0].length &&
      neighborY >= 0 &&
      neighborY < grid.length &&
      !grid[neighborY][neighborX].visited &&
      grid[neighborY][neighborX].weight !== Infinity
    ) {
      const neighborNode = grid[neighborY][neighborX];

      neighborNode.parent = currentNode;
      visitedNodes[neighborKey] = true;
      nodesToVisit.push(neighborNode);
      visitedNodesInOrder.push(neighborNode);

      if (oppositeVisitedNodes[neighborKey]) {
        shortestPathNodes = getShortestPathNodes(
          currentNode,
          neighborNode,
          visitedNodesInOrder
        );
        return [visitedNodesInOrder, shortestPathNodes];
      }
    }
  }

  return undefined;
}

function getShortestPathNodes(
  startNode: Node,
  endNode: Node,
  visitedNodesInOrder: Node[]
): Node[] {
  const shortestPathNodes: Node[] = [];
  let currentNode = endNode;

  // Include all nodes in the shortest path
  while (currentNode && currentNode !== startNode) {
    shortestPathNodes.push(currentNode);
    currentNode = currentNode.parent!;
  }

  // Include the start node
  shortestPathNodes.push(startNode);

  // Reverse the array to get the correct order
  shortestPathNodes.reverse();

  // Filter the visited nodes array to include only those in the shortest path
  const filteredVisitedNodes: Node[] = [];

  for (const node of visitedNodesInOrder) {
    if (shortestPathNodes.some((pathNode) => pathNode === node)) {
      filteredVisitedNodes.push(node);
    }
  }

  // Return the filtered array
  return filteredVisitedNodes;
}
