import {motion} from "framer-motion";

export namespace SnakePart {

    export enum Direction {
        Up = 0, Right = 1, Down = 2, Left = 3
    }

    export enum SnakePieceCategory {
        Leave, Stay, Enter
    }

    export const oppositeDirection = (value: Direction) => {
        switch(value) {
            case Direction.Up: return Direction.Down;
            case Direction.Right: return Direction.Left;
            case Direction.Down: return Direction.Up;
            case Direction.Left: return Direction.Right;
        }
    }

    export interface SnakeAnimation {
        duration: number,
        startFrom?: number,
        skinColor?: string,
        eyeColor?: string,
        startDirection: Direction,
        endDirection: Direction
    }

    export const SnakeSideLeave:React.FC<SnakeAnimation> = (props) => {
        let myScaleX:number = 1;
        let myScaleY:number = 1;
        let rotation:number = 0;

        if(props.startDirection === Direction.Left && props.endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 270;
        } else if(props.startDirection === Direction.Left && props.endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 270;
        } else if(props.startDirection === Direction.Up && props.endDirection === Direction.Left) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 0;
        } else if(props.startDirection === Direction.Up && props.endDirection === Direction.Right) {
            myScaleX = -1;
            myScaleY = 1;
            rotation = 0;
        } else if(props.startDirection === Direction.Right && props.endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 90;
        } else if(props.startDirection === Direction.Right && props.endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 90;
        } else if(props.startDirection === Direction.Down && props.endDirection === Direction.Right) {
            myScaleX = -1;
            myScaleY = -1;
            rotation = 0;  
        } else if(props.startDirection === Direction.Down && props.endDirection === Direction.Left) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 0;  
        }

        return (<div 
        style={{
            transform: `scaleX(${myScaleX}) scaleY(${myScaleY}) rotate(${rotation}deg)`
        }}
        className="relative w-full h-full flex items-center justify-center z-10">
            <motion.svg
            width="100%"
            height="180%"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            >
                <motion.circle
                cx="0"
                cy="0"
                r="50"
                stroke={props.skinColor ?? "#1e40af"}
                style={{
                    strokeWidth: '80px',
                    strokeLinecap: 'round',
                    fill: 'transparent'
                }}
                variants={{
                    hidden: { 
                        pathLength: 0.25 
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            rotateZ: 90,
                            transition: {
                            duration: props.duration,
                            delay: props.startFrom !== undefined ? -props.startFrom : 0,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
            </motion.svg>
        </div>);
    }

    export const SnakeSideStay:React.FC<SnakeAnimation> = (props) => {
        let myScaleX:number = 1;
        let myScaleY:number = 1;
        let rotation:number = 0;
        let startDirection:Direction = props.endDirection;
        let endDirection:Direction = props.startDirection;

        if(startDirection === Direction.Left && endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 270;
        } else if(startDirection === Direction.Left && endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 270;
        } else if(startDirection === Direction.Up && endDirection === Direction.Left) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 0;
        } else if(startDirection === Direction.Up && endDirection === Direction.Right) {
            myScaleX = -1;
            myScaleY = 1;
            rotation = 0;
        } else if(startDirection === Direction.Right && endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 90;
        } else if(startDirection === Direction.Right && endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 90;
        } else if(startDirection === Direction.Down && endDirection === Direction.Right) {
            myScaleX = -1;
            myScaleY = -1;
            rotation = 0;  
        } else if(startDirection === Direction.Down && endDirection === Direction.Left) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 0;  
        }
        
        return (<div 
        style={{
            transform: `scaleX(${myScaleX}) scaleY(${myScaleY}) rotate(${rotation}deg)`
        }}
        className="relative w-full h-full flex items-center justify-center z-10">
            <motion.svg
            width="100%"
            height="180%"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            >
                <motion.circle
                cx="0"
                cy="0"
                r="50"
                stroke={props.skinColor ?? "#1e40af"}
                style={{
                    strokeWidth: '80px',
                    strokeLinecap: 'round',
                    fill: 'transparent'
                }}
                variants={{
                    hidden: { 
                        pathLength: 0.25
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            rotateZ: [90, 0],
                            transition: {
                            duration: props.duration,
                            delay: -props.duration,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
            </motion.svg>
        </div>);
    }

    export const SnakeSideEnter:React.FC<SnakeAnimation> = (props) => {
        let myScaleX:number = 1;
        let myScaleY:number = 1;
        let rotation:number = 0;
        let startDirection:Direction = props.endDirection;
        let endDirection:Direction = props.startDirection;

        if(startDirection === Direction.Left && endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 270;
        } else if(startDirection === Direction.Left && endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 270;
        } else if(startDirection === Direction.Up && endDirection === Direction.Left) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 0;
        } else if(startDirection === Direction.Up && endDirection === Direction.Right) {
            myScaleX = -1;
            myScaleY = 1;
            rotation = 0;
        } else if(startDirection === Direction.Right && endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 90;
        } else if(startDirection === Direction.Right && endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 90;
        } else if(startDirection === Direction.Down && endDirection === Direction.Right) {
            myScaleX = -1;
            myScaleY = -1;
            rotation = 0;  
        } else if(startDirection === Direction.Down && endDirection === Direction.Left) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 0;  
        }
        
        return (<div 
        style={{
            transform: `scaleX(${myScaleX}) scaleY(${myScaleY}) rotate(${rotation}deg)`
        }}
        className="relative w-full h-full flex items-center justify-center z-20">
            <motion.svg
            width="100%"
            height="180%"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            >
                <motion.circle
                cx="0"
                cy="0"
                r="50"
                stroke={props.skinColor ?? "#1e40af"}
                style={{
                    strokeWidth: '80px',
                    strokeLinecap: 'round',
                    fill: 'transparent'
                }}
                variants={{
                    hidden: { 
                        pathLength: 0.25
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            rotateZ: [90, 0],
                            transition: {
                            duration: props.duration,
                            delay: props.startFrom !== undefined ? -props.startFrom : 0,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
                <motion.circle
                cx="0"
                cy="0"
                r="33"
                stroke={props.eyeColor ?? "black"}
                style={{
                    strokeWidth: '24px',
                    strokeLinecap: 'round',
                    fill: 'transparent'
                }}
                variants={{
                    hidden: { 
                        pathLength: 0
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            rotateZ: [90, 0],
                            y: [0, -12],
                            x: [12, 0],
                            transition: {
                            duration: props.duration,
                            delay: props.startFrom !== undefined ? -props.startFrom : 0,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
                <motion.circle
                cx="0"
                cy="0"
                r="67"
                stroke={props.eyeColor ?? "black"}
                style={{
                    strokeWidth: '24px',
                    strokeLinecap: 'round',
                    fill: 'transparent'
                }}
                variants={{
                    hidden: { 
                        pathLength: 0
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            rotateZ: [90, 0],
                            y: [0, -12],
                            x: [12, 0],
                            transition: {
                            duration: props.duration,
                            delay: props.startFrom !== undefined ? -props.startFrom : 0,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
            </motion.svg>
        </div>);
    }

    export const SnakeStraightLeave:React.FC<SnakeAnimation> = (props) => {
        let myScaleX:number = 1;
        let myScaleY:number = 1;
        let rotation:number = 0;

        if(props.startDirection === Direction.Left && props.endDirection === Direction.Right) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 90;
        } else if(props.startDirection === Direction.Right && props.endDirection === Direction.Left) {
            myScaleX = -1;
            myScaleY = 1;
            rotation = 90;
        } else if(props.startDirection === Direction.Up && props.endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 0;
        } else if(props.startDirection === Direction.Down && props.endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 0;
        }
        
        return (<div 
        style={{
            transform: `scaleX(${myScaleX}) scaleY(${myScaleY}) rotate(${rotation}deg)`
        }}
        className="relative w-full h-full flex items-center z-10">
            <motion.svg
            className="mt-[70%]"
            width="100%"
            height="170%"
            viewBox="0 35 100 170"
            initial="hidden"
            animate="visible"
            >
                <motion.line
                x1="50"
                y1="35"
                x2="50"
                y2="135"
                stroke={props.skinColor ?? "#1e40af"}
                style={{
                    strokeWidth: '80px',
                    strokeLinecap: 'round'
                }}
                variants={{
                    hidden: { 
                        pathLength: 1
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            pathLength: 0,
                            transition: {
                            duration: props.duration,
                            delay: props.startFrom !== undefined ? -props.startFrom : 0,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
            </motion.svg>
        </div>);
    }

    export const SnakeStraightStay:React.FC<SnakeAnimation> = (props) => {
        let myScaleX:number = 1;
        let myScaleY:number = 1;
        let rotation:number = 0;
        let startDirection: Direction = props.endDirection;
        let endDirection: Direction = props.startDirection;

        if(startDirection === Direction.Left && endDirection === Direction.Right) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 90;
        } else if(startDirection === Direction.Right && endDirection === Direction.Left) {
            myScaleX = -1;
            myScaleY = 1;
            rotation = 90;
        } else if(startDirection === Direction.Up && endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 0;
        } else if(startDirection === Direction.Down && endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 0;
        }
        
        return (<div 
        style={{
            transform: `scaleX(${myScaleX}) scaleY(${myScaleY}) rotate(${rotation}deg)`
        }}
        className="relative w-full h-full flex items-center z-10">
            <motion.svg
            className="mt-[70%]"
            width="100%"
            height="170%"
            viewBox="0 35 100 170"
            initial="hidden"
            animate="visible"
            >
                <motion.line
                x1="50"
                y1="35"
                x2="50"
                y2="135"
                stroke={props.skinColor ?? "#1e40af"}
                style={{
                    strokeWidth: '80px',
                    strokeLinecap: 'round'
                }}
                variants={{
                    hidden: { 
                        pathLength: 0
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            pathLength: 1,
                            transition: {
                            duration: props.duration,
                            delay: -props.duration,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
            </motion.svg>
        </div>);
    }

    export const SnakeStraightEnter:React.FC<SnakeAnimation> = (props) => {    
        let myScaleX:number = 1;
        let myScaleY:number = 1;
        let rotation:number = 0;
        let startDirection: Direction = props.endDirection;
        let endDirection: Direction = props.startDirection;

        if(startDirection === Direction.Left && endDirection === Direction.Right) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 90;
        } else if(startDirection === Direction.Right && endDirection === Direction.Left) {
            myScaleX = -1;
            myScaleY = 1;
            rotation = 90;
        } else if(startDirection === Direction.Up && endDirection === Direction.Down) {
            myScaleX = 1;
            myScaleY = -1;
            rotation = 0;
        } else if(startDirection === Direction.Down && endDirection === Direction.Up) {
            myScaleX = 1;
            myScaleY = 1;
            rotation = 0;
        }
        
        return (<div 
        style={{
            transform: `scaleX(${myScaleX}) scaleY(${myScaleY}) rotate(${rotation}deg)`
        }}
        className="relative w-full h-full flex items-center z-20">
            <motion.svg
            className="mt-[70%]"
            width="100%"
            height="170%"
            viewBox="0 35 100 170"
            initial="hidden"
            animate="visible"
            >
                <motion.line
                x1="50"
                y1="35"
                x2="50"
                y2="135"
                stroke={props.skinColor ?? "#1e40af"}
                style={{
                    strokeWidth: '80px',
                    strokeLinecap: 'round'
                }}
                variants={{
                    hidden: { 
                        pathLength: 0
                    },
                    visible: () => {
                        return {
                            opacity: 1,
                            pathLength: 1,
                            transition: {
                            duration: props.duration,
                            delay: props.startFrom !== undefined ? -props.startFrom : 0,
                            type: "tween",
                            ease: "linear"
                            }
                        };
                    }
                }}
                />
                <motion.circle
                cx="33"
                cy="47"
                r="12"
                style={{
                    fill: props.eyeColor !== undefined ? props.eyeColor : 'black'
                }}
                animate={{
                    y: 100,
                    transition: {
                        type: 'tween',
                        ease: 'linear',
                        duration: props.duration,
                        delay: props.startFrom !== undefined ? -props.startFrom : 0
                    }
                }}
                />
                <motion.circle
                cx="67"
                cy="47"
                r="12"
                style={{
                    fill: props.eyeColor !== undefined ? props.eyeColor : 'black'
                }}
                animate={{
                    y: 100,
                    transition: {
                        type: 'tween',
                        ease: 'linear',
                        duration: props.duration,
                        delay: props.startFrom !== undefined ? -props.startFrom : 0
                    }
                }}
                />
            </motion.svg>
        </div>);
    }
}