export interface Coord {
    x: number,
    y: number
}

const RemoveFromArray = <T>(array: T[], position: number) => {
    if(position >= 0 && position < array.length) {
        var value = array[position];
        [array[array.length - 1], array[position]] = [array[position], array[array.length - 1]];
        array.pop();
        return value;
    }

    throw Error('out of bounds');
}

const RandomInteger = (lowest: number, highest: number) => {
    return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
}

export {RemoveFromArray, RandomInteger};