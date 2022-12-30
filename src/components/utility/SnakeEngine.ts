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
        startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction, duration?: number, startFrom?: number) => void;

    private canChangeDirection: boolean = false;
    private snakeInfo:{startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction}[][] = [];
    private currentHeadOfSnake: Coord = {x: 0, y: 0};
    private lastCall: number = 0;

    constructor(
        changeSpikesMethod: (spikesMap: string[][]) => void,
        changeAppleMethod: (position: Coord, toAdd: boolean, appleValue?: number, appleType?: AppleTypes) => void,
        changeSnakeSkinMethod: (position: Coord, toAdd: boolean, category?: SnakePart.SnakePieceCategory, 
            startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction, duration?: number, startFrom?: number) => void,
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
            this.NewLevel(1, 1);
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

        if(directionChanged && this.canChangeDirection) {
            this.ChangeSnakeDirection(newDirection);
            this.canChangeDirection = false;
        }
    }

    private ChangeSnakeDirection(newDirection: SnakePart.Direction) {
        this.snakeInfo[this.currentHeadOfSnake.y][this.currentHeadOfSnake.x].startDirection = SnakePart.oppositeDirection(this.activeDirection);
        this.snakeInfo[this.currentHeadOfSnake.y][this.currentHeadOfSnake.x].endDirection = newDirection;
        this.activeDirection = newDirection;

        this.changeSnakeSkinMethod(this.currentHeadOfSnake, true,
            SnakePart.SnakePieceCategory.Enter,
            this.snakeInfo[this.currentHeadOfSnake.y][this.currentHeadOfSnake.x].startDirection,
            this.snakeInfo[this.currentHeadOfSnake.y][this.currentHeadOfSnake.x].endDirection,
            this.speed,
            (Date.now() - this.lastCall) / 1000);
    }

    private NewLevel = (level: number, appleValue: number) => {
        document.addEventListener('keydown', this.keyDownEventHandler);
        let levelEnded: boolean = false;
        let levelTiles: string[][] = SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length];

        let emptyTiles: Array<Coord> = [];
        for(let i = 0; i < SnakeEngine.boardSize; i++)
            for(let j = 0; j < SnakeEngine.boardSize; j++)
                if(levelTiles[i][j] === ' ')
                {
                    emptyTiles.push({y: i, x: j});
                }

        this.changeSpikesMethod(SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length]);
        
        let queue = new LimitedQueue<Coord>(SnakeEngine.boardSize * SnakeEngine.boardSize);
        this.snakeInfo = [...Array(SnakeEngine.boardSize)].map(() => {
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

                queue.push(firstTile);
                queue.push(secondTile);

                this.snakeInfo[firstTile.y][firstTile.x] = {
                    startDirection: SnakePart.oppositeDirection(this.activeDirection),
                    endDirection: this.activeDirection
                }
                this.snakeInfo[secondTile.y][secondTile.x] = {
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
            this.canChangeDirection = true;
            this.lastCall = Date.now();

            let head = queue.valueFromStart();
            let newHead = neighbour(head, this.activeDirection);
            let tail = queue.valueFromEnd();
            let newTail = queue.valueFromEnd(2);

            if(SnakeEngine.inBounds(newHead) && levelTiles[newHead.y][newHead.x] === ' ') {
                this.snakeInfo[newHead.y][newHead.x] = {
                    startDirection: SnakePart.oppositeDirection(this.activeDirection),
                    endDirection: this.activeDirection
                }
                
                this.changeSnakeSkinMethod(newHead, true,
                    SnakePart.SnakePieceCategory.Enter,
                    this.snakeInfo[newHead.y][newHead.x].startDirection,
                    this.snakeInfo[newHead.y][newHead.x].endDirection,
                    this.speed);
                levelTiles[newHead.y][newHead.x] = 'S';
                queue.push(newHead);
                this.currentHeadOfSnake = newHead;

                if(queue.actualSize > 2) {
                    this.changeSnakeSkinMethod(head, true, 
                        SnakePart.SnakePieceCategory.Stay,
                        this.snakeInfo[head.y][head.x].startDirection,
                        this.snakeInfo[head.y][head.x].endDirection,
                        this.speed);
                }

                this.changeSnakeSkinMethod(tail, false);
                levelTiles[tail.y][tail.x] = ' ';
                queue.pop();
    
                this.changeSnakeSkinMethod(newTail, true, 
                    SnakePart.SnakePieceCategory.Leave,
                    this.snakeInfo[newTail.y][newTail.x].startDirection,
                    this.snakeInfo[newTail.y][newTail.x].endDirection,
                    this.speed);
            } else {
                this.gameActive = false;
                this.gameEnded = true;
                levelEnded = true;
            }

            if(levelEnded) {
                clearInterval(intervalRef);

                if(this.gameActive) {
                    let newAppleValue: number;

                    if(level % SnakeEngine.spikeMaps.length === SnakeEngine.spikeMaps.length - 1) {
                        newAppleValue = appleValue + 1;
                        this.speed = Math.max(this.speed * 0.9, 0.2);
                    } else {
                        newAppleValue = appleValue;
                    }

                    this.NewLevel(level + 1, newAppleValue);
                }
            }
        }, this.speed * 1000);
    }
}