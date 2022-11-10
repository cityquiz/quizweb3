import { Direction } from "./interfaces/Behavior";

export const utils= {
    widthGrid(n: number){
        return n * 32;
        //return n * 16
    },
    asGridCoord(x: number,y: number){
        return `${x*16},${y*16}`
    },
    nextPosition(initialX: number, initialY: number, direction: Direction){
        console.log(`x: ${initialX}, y: ${initialY}`);
        let x = initialX;
        let y = initialY;
        const size = 16;
        if(direction=="left"){
            x-=size;
        }else if(direction=="right"){
            x+= size;
        }else if(direction=="up"){
            y-= size;
        }else if(direction== "down"){
            y+= size;
        }

        return {x,y};
    },

    oppositeDirection(direction: Direction){
        if(direction===Direction.left){return Direction.right}
        if(direction===Direction.right){return Direction.left}
        if(direction===Direction.up){return Direction.down}
        return Direction.up;
    },


    wait(ms: number){
        return new Promise<void>((resolve)=>{
            setTimeout(()=>{
                resolve();
            },ms);
        });
    },

    randomFromArray(array: boolean[]){
        return array[ Math.floor(Math.random()*array.length) ]

    },
    emitEvent(name: string, detail: any=null){
        const event =new CustomEvent(name,{
            detail
        });
        document.dispatchEvent(event);
    }

}

