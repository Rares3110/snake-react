export class LimitedQueue<T> {
    private array: T[];
    private size: number;
    private start: number = -1;
    private end: number = 0;
    private activeSize: number = 0;

    constructor(size: number) {
        this.array = [...Array(size)];
        this.size = size;
    }

    isEmpty() {
        return this.activeSize === 0;
    }

    actualSize() {
        return this.activeSize;
    }

    add(newValue: T) {
        if(this.activeSize < this.size) {
            this.start = (this.start + 1) % this.size;
            this.activeSize++;
            this.array[this.start] = newValue;
        } else {
            throw Error('out of bounds');
        }
    }

    remove() {
        if(this.activeSize > 0) {
            let lastPos = this.end;
            this.end = (this.end + 1) % this.size;
            this.activeSize--;
            return this.array[lastPos];
        } else {
            throw Error('out of bounds');
        }
    }

    valueFromStart(index:number = 1) {
        if(index > 0 && index <= this.activeSize) {
            let poz = (this.start - index + 1 + this.size) % this.size;
            return this.array[poz];
        }

        throw Error('out of bounds');
    }

    valueFromEnd(index:number = 1) {
        if(index > 0 && index <= this.activeSize) {
            let poz = (this.end + index - 1) % this.size;
            return this.array[poz];
        }

        throw Error('out of bounds');
    }
}