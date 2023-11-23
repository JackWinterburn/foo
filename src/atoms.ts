import { atom } from "jotai";
import { Coords, Node } from "./types";
import generateGrid from "./utils/generateBoard";

const defaultStartingNodeCoords = { x: 3, y: 9 };
const defaultTargetNodeCoords = { x: 13, y: 4 };
const defaultBoardHeight = 25;
const defaultBoardWidth = 60;

export const algorithmInExecution = atom<boolean>(false);
export const selectedAlgorithmAtom = atom<string>("astar");
export const startNodeCoords = atom<Coords>(defaultStartingNodeCoords);
export const targetNodeCoords = atom<Coords>(defaultTargetNodeCoords);
export const boardHeight = atom<number>(25);
export const currNode = atom<Coords>(defaultStartingNodeCoords);
export const boardWidth = atom<number>(60);

export const BoardState = atom<Node[][]>(
  generateGrid(
    defaultBoardHeight,
    defaultBoardWidth,
    defaultStartingNodeCoords,
    defaultTargetNodeCoords,
  ),
);
