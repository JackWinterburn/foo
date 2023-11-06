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
}

export type Coords = {
    x: number,
    y: number
}