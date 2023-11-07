export type Node = {
    h: number
    x: number, 
    y: number,
    visited: boolean,
    f: number,
    g: number,
    start?: boolean,
    target?: boolean,
    weight: number,
    parent: Node | null,
    shortestPath: boolean
}

export type Coords = {
    x: number,
    y: number
}