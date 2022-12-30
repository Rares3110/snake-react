import { SnakePart } from "./SnakeParts";
import { RemoveFromArray, RandomInteger, Coord } from "./usefull";
import { AppleTypes } from "../singular/Snake";

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

    constructor(
        changeSpikesMethod: (spikesMap: string[][]) => void,
        changeAppleMethod: (position: Coord, toAdd: boolean, appleValue?: number, appleType?: AppleTypes) => void,
        speed?: number) {
        this.changeSpikesMethod = changeSpikesMethod;
        this.changeAppleMethod = changeAppleMethod;

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

    Start = () => {
        if(!this.gameActive && !this.gameEnded){
            this.gameActive = true;
            this.NewLevel(1, 1, 1);
        }
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

    private NewLevel = (level: number, appleValue: number, speed: number) => {
        document.addEventListener('keydown', this.keyDownEventHandler);
        var levelEnded: boolean = false;
        var levelTiles: string[][] = SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length];

        var emptyTiles: Array<Coord> = [];
        for(var i = 0; i < SnakeEngine.boardSize; i++)
            for(var j = 0; j < SnakeEngine.boardSize; j++)
                if(levelTiles[i][j] === ' ')
                    emptyTiles.push({y: i, x: j});

        this.changeSpikesMethod(SnakeEngine.spikeMaps[level % SnakeEngine.spikeMaps.length]);
        var tile = RemoveFromArray<Coord>(emptyTiles, RandomInteger(0, emptyTiles.length - 1));
        levelTiles[tile.y][tile.x] = 'A';
        this.changeAppleMethod(tile, true);

        var intervalRef = setInterval(() => {
            

            if(levelEnded) {
                clearInterval(intervalRef);

                if(this.gameActive) {
                    var newAppleValue: number;
                    var newSpeed: number;

                    if(level % SnakeEngine.spikeMaps.length === SnakeEngine.spikeMaps.length - 1) {
                        newAppleValue = appleValue + 1;
                        newSpeed = Math.max(speed * 0.9, 0.2);
                    }
                    else {
                        newAppleValue = appleValue;
                        newSpeed = speed;
                    }

                    this.NewLevel(level + 1, newAppleValue, newSpeed);
                }
            }
        }, this.speed * 1000);
    }
}