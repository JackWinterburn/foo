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

export type Coords = {
  x: number;
  y: number;
};

export type nodeTypeOptions = "start" | "target" | "empty" | "wall";
