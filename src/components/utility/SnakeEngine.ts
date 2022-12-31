import { SnakePart } from "./SnakeParts";
import { removeCoordFromArray, randomInteger, Coord, neighbour, sameCoord} from "./Utility";
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
    private static readonly applesToAdvance: number = 5;
    private speed: number;
    private activeDirection: SnakePart.Direction = SnakePart.Direction.Right;
    private gameActive: boolean = false;
    private gameEnded: boolean = false;

    private changeSpikesMethod: (spikesMap: string[][]) => void;
    private changeAppleMethod: (position: Coord, toAdd: boolean, appleValue?: number, appleType?: AppleTypes) => void;
    private changePortalMethod: (position: Coord, toAdd: boolean) => void;
    private changeSnakeSkinMethod: (position: Coord, toAdd: boolean, category?: SnakePart.SnakePieceCategory, 
        startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction, duration?: number, startFrom?: number) => void;
    private cleanMethod: () => void;
    private pauseMethod: () => void;

    private canChangeDirection: boolean = false;
    private snakeInfo:{startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction}[][] = [];
    private currentHeadOfSnake: Coord = {x: 0, y: 0};
    private lastCall: number = 0;

    //getting all the methods used to change how the board looks
    constructor(
        changeSpikesMethod: (spikesMap: string[][]) => void,
        changeAppleMethod: (position: Coord, toAdd: boolean, appleValue?: number, appleType?: AppleTypes) => void,
        changePortalMethod: (position: Coord, toAdd: boolean) => void,
        changeSnakeSkinMethod: (position: Coord, toAdd: boolean, category?: SnakePart.SnakePieceCategory, 
            startDirection?: SnakePart.Direction, endDirection?: SnakePart.Direction, duration?: number, startFrom?: number) => void,
        cleanMethod: () => void,
        pauseMethod: () => void,
        speed?: number) {
        this.changeSpikesMethod = changeSpikesMethod;
        this.changeAppleMethod = changeAppleMethod;
        this.changeSnakeSkinMethod = changeSnakeSkinMethod;
        this.changePortalMethod = changePortalMethod;
        this.cleanMethod = cleanMethod;
        this.pauseMethod = pauseMethod;

        if(speed !== undefined) {
            this.speed = speed;
        } else {
            this.speed = 0.3;
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
            this.NewLevel(0, 1);
        }
    }

    //input of the user
    private keyDownEventHandler = (event: KeyboardEvent) => {
        //prevents scrolling the window when playing
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
            event.preventDefault();
        }

        let directionChanged: boolean = false;
        let newDirection: SnakePart.Direction = SnakePart.Direction.Up;

        //checks for a direction change
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

    //used  for changing the head piece in the middle of it's animation
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
        let levelEnded: boolean = false;
        //cloning a matrix
        let levelTiles: string[][] = JSON.parse(JSON.stringify(SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length]));
        let applesEaten: number = 0;

        //adding all empty tiles in a single array
        let emptyTiles: Array<Coord> = [];
        for(let y = 0; y < SnakeEngine.boardSize; y++)
            for(let x = 0; x < SnakeEngine.boardSize; x++)
                if(levelTiles[y][x] === ' ')
                {
                    emptyTiles.push({y: y, x: x});
                }
        
        //adding the spikes in the level
        this.changeSpikesMethod(SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length]);
        
        //the queue for the snake parts
        let queue = new LimitedQueue<Coord>(SnakeEngine.boardSize * SnakeEngine.boardSize);
        this.snakeInfo = [...Array(SnakeEngine.boardSize)].map(() => {
            return [...Array(SnakeEngine.boardSize)];
        });
        //adding the first 2 snake pieces
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
                this.currentHeadOfSnake = secondTile;

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

                this.changeSnakeSkinMethod(firstTile, true,
                    SnakePart.SnakePieceCategory.Leave,
                    this.snakeInfo[firstTile.y][firstTile.x].startDirection,
                    this.snakeInfo[firstTile.y][firstTile.x].endDirection, 
                    1000000);
                this.changeSnakeSkinMethod(secondTile, true, 
                    SnakePart.SnakePieceCategory.Enter,
                    this.snakeInfo[secondTile.y][secondTile.x].startDirection, 
                    this.snakeInfo[secondTile.y][secondTile.x].endDirection, 
                    1000000);

                foundDirection = true;
            }
        }

        //adding apple
        let applePosition: Coord = emptyTiles[randomInteger(0, emptyTiles.length - 1)];
        removeCoordFromArray(emptyTiles, applePosition);
        this.changeAppleMethod(applePosition, true, appleValue, AppleTypes.Normal);

        //the iterations for moving
        let firstIteration: boolean = true;

        this.pauseMethod();
        setTimeout(() => {
            document.addEventListener('keydown', this.keyDownEventHandler);

            let intervalRef = setInterval(() => {
                this.canChangeDirection = true;
                this.lastCall = Date.now();

                //on first iteration I just start the animation
                if(firstIteration) {
                    firstIteration = false;
                    let head = queue.valueFromStart();
                    let tail = queue.valueFromEnd();

                    this.changeSnakeSkinMethod(head, true,
                        SnakePart.SnakePieceCategory.Enter,
                        this.snakeInfo[head.y][head.x].startDirection,
                        this.snakeInfo[head.y][head.x].endDirection,
                        this.speed);

                    this.changeSnakeSkinMethod(tail, true, 
                        SnakePart.SnakePieceCategory.Leave,
                        this.snakeInfo[tail.y][tail.x].startDirection,
                        this.snakeInfo[tail.y][tail.x].endDirection,
                        this.speed);

                    return;
                }

                let head = queue.valueFromStart();
                let newHead = neighbour(head, this.activeDirection);
                let tail = queue.valueFromEnd();
                let newTail = queue.valueFromEnd(2);
                
                //updating the snake, checking for collisions
                if(SnakeEngine.inBounds(newHead) && (levelTiles[newHead.y][newHead.x] === ' ' ||
                (levelTiles[newHead.y][newHead.x] === 'S' && sameCoord(newHead, tail)))) {
                    this.snakeInfo[newHead.y][newHead.x] = {
                        startDirection: SnakePart.oppositeDirection(this.activeDirection),
                        endDirection: this.activeDirection
                    }

                    if(queue.actualSize > 2) {
                        this.changeSnakeSkinMethod(head, true, 
                            SnakePart.SnakePieceCategory.Stay,
                            this.snakeInfo[head.y][head.x].startDirection,
                            this.snakeInfo[head.y][head.x].endDirection,
                            this.speed);
                    }

                    //if it eats an apple it
                    if(sameCoord(newHead, applePosition)) {
                        this.changeAppleMethod(applePosition, false);
                        applesEaten++;

                        if(emptyTiles.length > 0 && applesEaten === SnakeEngine.applesToAdvance) {
                            let portalPosition = emptyTiles[randomInteger(0, emptyTiles.length - 1)];
                            removeCoordFromArray(emptyTiles, portalPosition);
                            this.changePortalMethod(portalPosition, true);
                            levelTiles[portalPosition.y][portalPosition.x] = 'P';
                        }

                        if(emptyTiles.length > 0) {
                            applePosition = emptyTiles[randomInteger(0, emptyTiles.length - 1)];
                            removeCoordFromArray(emptyTiles, applePosition);

                            if(applesEaten < SnakeEngine.applesToAdvance)
                                this.changeAppleMethod(applePosition, true, appleValue, AppleTypes.Normal);
                            else
                                this.changeAppleMethod(applePosition, true, Math.ceil(appleValue * 1.5), AppleTypes.Golden);
                        }

                        this.changeSnakeSkinMethod(newTail, true, 
                            SnakePart.SnakePieceCategory.Stay,
                            this.snakeInfo[newTail.y][newTail.x].startDirection,
                            this.snakeInfo[newTail.y][newTail.x].endDirection,
                            this.speed);
                    } else {
                        queue.pop();
                        emptyTiles.push(tail);
                        this.changeSnakeSkinMethod(tail, false);
                        levelTiles[tail.y][tail.x] = ' ';

                        this.changeSnakeSkinMethod(newTail, true, 
                            SnakePart.SnakePieceCategory.Leave,
                            this.snakeInfo[newTail.y][newTail.x].startDirection,
                            this.snakeInfo[newTail.y][newTail.x].endDirection,
                            this.speed);
                    }

                    this.changeSnakeSkinMethod(newHead, true,
                        SnakePart.SnakePieceCategory.Enter,
                        this.snakeInfo[newHead.y][newHead.x].startDirection,
                        this.snakeInfo[newHead.y][newHead.x].endDirection,
                        this.speed);
                    levelTiles[newHead.y][newHead.x] = 'S';
                    queue.push(newHead);
                    this.currentHeadOfSnake = newHead;
                    removeCoordFromArray(emptyTiles, newHead);
                } else {
                    if(!SnakeEngine.inBounds(newHead) || levelTiles[newHead.y][newHead.x] !== 'P') {
                        this.gameActive = false;
                        this.gameEnded = true;
                    }
                    levelEnded = true;
                }

                //after either a portal or after the game ends
                if(levelEnded) {
                    clearInterval(intervalRef);
                    document.removeEventListener('keydown', this.keyDownEventHandler);

                    if(this.gameActive) {
                        let newAppleValue: number;

                        if(level % SnakeEngine.spikeMaps.length === SnakeEngine.spikeMaps.length - 1) {
                            newAppleValue = appleValue + 1;
                            this.speed = Math.max(this.speed - 0.1, 0.1);
                        } else {
                            newAppleValue = appleValue;
                        }
                        
                        for(let y = 0; y < SnakeEngine.boardSize; y++)
                            for(let x = 0; x < SnakeEngine.boardSize; x++)
                                if(levelTiles[y][x] === 'S') {
                                    this.changeSnakeSkinMethod({y: y, x: x}, false);
                                } else if(levelTiles[y][x] === 'P') {
                                    this.changePortalMethod({y: y, x: x}, false);
                                }
                        this.changeAppleMethod(applePosition, false);

                        this.snakeInfo = [...Array(SnakeEngine.boardSize)].map(() => {
                            return [...Array(SnakeEngine.boardSize)];
                        });
                        this.NewLevel(level + 1, newAppleValue);
                    } else {
                        setTimeout(() => {
                            this.cleanMethod();
                        }, 1000);
                    }
                }
            }, this.speed * 1000);
        }, 1000);
    }
}