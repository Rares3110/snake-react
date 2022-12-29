import { SnakePart } from "./SnakeParts";

export class SnakeEngine {
    private boardSize: number;
    private speed: number;
    private activeDirection: SnakePart.Direction = SnakePart.Direction.Right;

    constructor(boardSize: number, speed?: number) {
        this.boardSize = boardSize;
        if(speed !== undefined) {
            this.speed = speed;
        } else {
            this.speed = 0.5;
        }
    }

    arrayPozToCoord = (poz: number) => {
        return {lin: Math.floor(poz / this.boardSize), col: poz % this.boardSize};
    }

    coordToArrayPoz = (lin: number, col: number) => {
        return lin * this.boardSize + col;
    }

    Start = () => {
        this.NewLevel();
    }

    private keyDownEventHandler = (event: KeyboardEvent) => {
        if(event.key === 'ArrowUp' || event.key === 'w') {
            this.activeDirection = SnakePart.Direction.Up;
        } else if(event.key === 'ArrowRight' || event.key === 'd') {
            this.activeDirection = SnakePart.Direction.Right;
        } else if(event.key === 'ArrowDown' || event.key === 's') {
            this.activeDirection = SnakePart.Direction.Down;
        } else if(event.key === 'ArrowLeft' || event.key === 'a') {
            this.activeDirection = SnakePart.Direction.Left;
        }
    }

    private NewLevel = () => {
        document.addEventListener('keydown', this.keyDownEventHandler);

        var intervalRef = setInterval(() => {
            clearInterval(intervalRef);
        }, this.speed * 1000);
    }
}