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

export const neighbour = (coord: Coord, value: number) => {
    switch(value) {
        case 0: return up(coord);
        case 1: return right(coord);
        case 2: return down(coord);
        case 3: return left(coord);
        default: return coord;
    }
}

export const removeFromArray = <T>(array: T[], position: number) => {
    if(position >= 0 && position < array.length) {
        var value = array[position];
        [array[array.length - 1], array[position]] = [array[position], array[array.length - 1]];
        array.pop();
        return value;
    }

    throw Error('out of bounds');
}

export const randomInteger = (lowest: number, highest: number) => {
    return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
}