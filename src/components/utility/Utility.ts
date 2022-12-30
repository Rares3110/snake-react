export interface Coord {
    x: number,
    y: number
}

export const up = (coord: Coord) => {
    return {x: coord.x, y: coord.y - 1};
}

export const right = (coord: Coord) => {
    return {x: coord.x + 1, y: coord.y};
}

export const down = (coord: Coord) => {
    return {x: coord.x, y: coord.y + 1};
}

export const left = (coord: Coord) => {
    return {x: coord.x - 1, y: coord.y};
}

export const sameCoord = (coord1: Coord, coord2:Coord) => {
    if(coord1.x === coord2.x && coord1.y === coord2.y) {
        return true;
    }

    return false;
} 

export const neighbour = (coord: Coord, value: number) => {
    switch(value) {
        case 0: return up(coord);
        case 1: return right(coord);
        case 2: return down(coord);
        case 3: return left(coord);
        default: return coord;
    }
}

export const removeCoordFromArray = (array: Coord[], value: Coord) => {
    let pozition: number | null = null;

    for(let i = 0; i < array.length; i++)
        if(array[i].y === value.y && array[i].x === value.x) {
            pozition = i;
            break;
        }

    if(pozition !== null) {
        array.splice(pozition, 1);
    }
}

export const randomInteger = (lowest: number, highest: number) => {
    return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
}