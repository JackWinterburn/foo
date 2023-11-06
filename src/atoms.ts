import { atom, useAtom } from 'jotai';
import { Coords, Node } from './types';
import generateGrid from './utils/generateBoard';

export const selectedAlgorithmAtom = atom<string>('astar');
export const startNodeCoords = atom<Coords>({x: 3, y: 9});
export const targetNodeCoords = atom<Coords>({x: 30, y: 9});

export const BoardState = atom<Node[][]>(generateGrid(17, 35, {x:3, y:9}, {x:30, y:9}))
