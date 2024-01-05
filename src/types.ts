export type Node = {
  h: number;
  x: number;
  y: number;
  visited: boolean;
  f: number;
  g: number;
  start?: boolean;
  target?: boolean;
  weight: number;
  parent: Node | null;
  shortestPath: boolean;
  current?: boolean;
  delay?: number;
};

export const node: Node = {
  x: 0,
  y: 0,
  h: 0,
  f: 0,
  g: 0,
  visited: false,
  start: false,
  target: false,
  weight: 1,
  parent: null,
  shortestPath: false,
};

export type Coords = {
  x: number;
  y: number;
};

export type nodeTypeOptions = "start" | "target" | "empty" | "wall";
