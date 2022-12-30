import { SnakePart } from "./SnakeParts";
import { removeCoordFromArray, randomInteger, Coord, neighbour} from "./Utility";
import { AppleTypes } from "../singular/Snake";
import { LimitedQueue } from "./LimitedQueue";

export class SnakeEngine {
    private static readonly spikeMaps = [
        [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ],
        [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'X', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', ' ', 'X', 'X', ' ', ' ', ' ', 'X', 'X', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ],
        [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', ' '],
            [' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ],
        [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' '],
            [' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
            [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
            [' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
            [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
            [' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
            [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
            [' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' '],
            [' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ],
        [
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', 'X', 'X', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' '],
            [' ', ' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', ' ', ' '],
            [' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' '],
            [' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' '],
            [' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' '],
            [' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' '],
            [' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X', ' '],
            [' ', ' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', ' ', ' '],
            [' ', 'X', 'X', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ],
        [
            ['X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X'],
            [' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' '],
            [' ', 'X', 'X', 'X', ' ', 'X', ' ', 'X', 'X', 'X', ' '],
            [' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' '],
            ['X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X'],
            ['X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', 'X'],
            ['X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X'],
            [' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' '],
            [' ', 'X', 'X', 'X', ' ', 'X', ' ', 'X', 'X', 'X', ' '],
            [' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' '],
            ['X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', 'X'],
        ]
    ];

    private static readonly boardSize: number = 11;
    private speed: number;
    private activeDirection: SnakePart.Direction = SnakePart.Direction.Right;
    private gameActive: boolean = false;
    private gameEnded: boolean = false;

    private changeSpikesMethod: (spikesMap: string[][]) => void;
    private changeAppleMethod: (position: Coord, toAdd: boolean, appleValue?: number, appleType?: AppleTypes) => void;
    private changeSnakeSkinMethod: (position: Coord, toAdd: boolean, category?: SnakePart.SnakePieceCategory, 
        startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction, duration?: number) => void;

    private canChangeDirection: boolean = false;
    private canQueueDirection: boolean = false;
    //if I make changes to the snake and don't want to interfere with the async event
    private queuedDirection: SnakePart.Direction = SnakePart.Direction.Up;

    constructor(
        changeSpikesMethod: (spikesMap: string[][]) => void,
        changeAppleMethod: (position: Coord, toAdd: boolean, appleValue?: number, appleType?: AppleTypes) => void,
        changeSnakeSkinMethod: (position: Coord, toAdd: boolean, category?: SnakePart.SnakePieceCategory, 
            startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction, duration?: number) => void,
        speed?: number) {
        this.changeSpikesMethod = changeSpikesMethod;
        this.changeAppleMethod = changeAppleMethod;
        this.changeSnakeSkinMethod = changeSnakeSkinMethod;

        if(speed !== undefined) {
            this.speed = speed;
        } else {
            this.speed = 0.5;
        }
    }

    static arrayPozToCoord = (poz: number) => {
        return {y: Math.floor(poz / this.boardSize), x: poz % this.boardSize};
    }

    static coordToArrayPoz = (coord: Coord) => {
        return coord.y * this.boardSize + coord.x;
    }

    static inBounds = (coord: Coord) => {
        if(coord.x < 0 || coord.y < 0 || coord.x >= this.boardSize || coord.y >= this.boardSize) {
            return false;
        }

        return true;
    }

    Start = () => {
        if(!this.gameActive && !this.gameEnded){
            this.gameActive = true;
            this.NewLevel(1, 1, 1);
        }
    }

    private keyDownEventHandler = (event: KeyboardEvent) => {
        let directionChanged: boolean = false;
        let newDirection: SnakePart.Direction = SnakePart.Direction.Up;

        if(event.key === 'ArrowUp' || event.key === 'w') {
            if(this.activeDirection !== SnakePart.Direction.Down && this.activeDirection !== SnakePart.Direction.Up) {
                newDirection = SnakePart.Direction.Up;
                directionChanged = true;
            }
        } else if(event.key === 'ArrowRight' || event.key === 'd') {
            if(this.activeDirection !== SnakePart.Direction.Right && this.activeDirection !== SnakePart.Direction.Left) {
                newDirection = SnakePart.Direction.Right;
                directionChanged = true;
            }
        } else if(event.key === 'ArrowDown' || event.key === 's') {
            if(this.activeDirection !== SnakePart.Direction.Down && this.activeDirection !== SnakePart.Direction.Up) {
                newDirection = SnakePart.Direction.Down;
                directionChanged = true;
            }
        } else if(event.key === 'ArrowLeft' || event.key === 'a') {
            if(this.activeDirection !== SnakePart.Direction.Right && this.activeDirection !== SnakePart.Direction.Left) {
                newDirection = SnakePart.Direction.Left;
                directionChanged = true;
            };
        }

        if(directionChanged) {
            if(this.canQueueDirection) {
                this.canQueueDirection = false;
                this.queuedDirection = newDirection;
            } else if(this.canChangeDirection) {
                this.activeDirection = newDirection;
                //special function
            }
        }
    }

    private NewLevel = (level: number, appleValue: number, speed: number) => {
        document.addEventListener('keydown', this.keyDownEventHandler);
        let levelEnded: boolean = false;
        let levelTiles: string[][] = SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length];

        let emptyTiles: Array<Coord> = [];
        //you need something to remove elements from array, probably better to use n * n
        for(let i = 0; i < SnakeEngine.boardSize; i++)
            for(let j = 0; j < SnakeEngine.boardSize; j++)
                if(levelTiles[i][j] === ' ')
                {
                    emptyTiles.push({y: i, x: j});
                }

        this.changeSpikesMethod(SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length]);
        
        let queue = new LimitedQueue<Coord>(SnakeEngine.boardSize * SnakeEngine.boardSize);
        let snakeInfo:{startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction}[][] = [...Array(SnakeEngine.boardSize)].map(() => {
            return [...Array(SnakeEngine.boardSize)];
        });
        let firstTile = emptyTiles[randomInteger(0, emptyTiles.length - 1)];
        let foundDirection = false;
        for(let i = 0; i <= 3 && !foundDirection; i++) {
            let secondTile = neighbour(firstTile, i);

            if(SnakeEngine.inBounds(secondTile) && levelTiles[secondTile.y][secondTile.x] === ' ') {
                levelTiles[firstTile.y][firstTile.x] = 'S';
                levelTiles[secondTile.y][secondTile.x] = 'S';
                this.activeDirection = i;

                queue.add(firstTile);
                queue.add(secondTile);

                snakeInfo[firstTile.y][firstTile.x] = {
                    startDirection: SnakePart.oppositeDirection(this.activeDirection),
                    endDirection: this.activeDirection
                }
                snakeInfo[secondTile.y][secondTile.x] = {
                    startDirection: SnakePart.oppositeDirection(this.activeDirection),
                    endDirection: this.activeDirection
                }

                removeCoordFromArray(emptyTiles, firstTile);
                removeCoordFromArray(emptyTiles, secondTile);

                this.changeSnakeSkinMethod(firstTile, true, SnakePart.SnakePieceCategory.Leave,
                    SnakePart.oppositeDirection(this.activeDirection), this.activeDirection, 100000000);
                this.changeSnakeSkinMethod(secondTile, true, SnakePart.SnakePieceCategory.Enter,
                    SnakePart.oppositeDirection(this.activeDirection), this.activeDirection, 100000000);

                foundDirection = true;
            }
        }

        let intervalRef = setInterval(() => {
            this.canQueueDirection = true;
            this.canChangeDirection = false;

            //movement

            if(this.canQueueDirection === true) {
                this.canChangeDirection = true;
            } else {
                //special function
            }
            

            if(levelEnded) {
                clearInterval(intervalRef);

                if(this.gameActive) {
                    let newAppleValue: number;
                    let newSpeed: number;

                    if(level % SnakeEngine.spikeMaps.length === SnakeEngine.spikeMaps.length - 1) {
                        newAppleValue = appleValue + 1;
                        newSpeed = Math.max(speed * 0.9, 0.2);
                    } else {
                        newAppleValue = appleValue;
                        newSpeed = speed;
                    }

                    this.NewLevel(level + 1, newAppleValue, newSpeed);
                }
            }
        }, this.speed * 1000);
    }
}