import { atom } from "jotai";
import { Coords, Node } from "./types";
import generateGrid from "./utils/generateBoard";

const defaultStartingNodeCoords = { x: 3, y: 9 };
const defaultTargetNodeCoords = { x: 26, y: 4 };
const defaultBoardHeight = 20;
const defaultBoardWidth = 30;

export const algorithmInExecution = atom<boolean>(false);
export const selectedAlgorithmAtom = atom<string>("dijkstra");
export const startNodeCoords = atom<Coords>(defaultStartingNodeCoords);
export const targetNodeCoords = atom<Coords>(defaultTargetNodeCoords);
export const wallNodeCoords = atom<Coords[]>([]);
export const boardHeight = atom<number>(defaultBoardHeight);
export const currNode = atom<Coords>(defaultStartingNodeCoords);
export const boardWidth = atom<number>(defaultBoardWidth);

export const BoardState = atom<Node[][]>(
  generateGrid(
    defaultBoardHeight,
    defaultBoardWidth,
    defaultStartingNodeCoords,
    defaultTargetNodeCoords,
    []
  )
);
