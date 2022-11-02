import { GameObject, type ConfigGameObject } from "./GameObject";
import type { Behavior } from "./interfaces/Behavior";
import { utils } from "./utils";
export interface ConfigPerson extends ConfigGameObject{
    isPlayerControlled?: boolean;
    
    
}
export class Person  extends GameObject{
    movingProgressRemaning: number;
    isPlayerControlled:boolean;
    directionUpdate: any;

    constructor(config:ConfigPerson){
        super(config);
        this.movingProgressRemaning= 0;
        this.isStanding =  false;
        
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.directionUpdate={
            "up": ["y",-1],
            "down": ["y",1],
            "left": ["x",-1],
            "right": ["x",1],
        }


    }

    override update(state: any){
        
        if(this.movingProgressRemaning > 0){
            this.updatePosition();
        }else{
            //more cases for  stating  to walk will come here
            //

            //case : were keyboard ready and have arrow pressed
            if(!state.map.isCutscenePlaying && this.isPlayerControlled &&  state.arrow){
                this.startBehavior(state,{
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite();
        }
    }

    startBehavior(state: any, behavior: any){
        //set character direction to whatever behavior  has
        console.log(`${this.x}, ${this.y}`)
        this.direction =  behavior.direction!;
        if(behavior.type==="walk"){
            //stop here if space  is not free
            if(state.map.isSpaceTaken(this.x,this.y, this.direction)){
                behavior.retry && setTimeout(()=>{
                    this.startBehavior(state, behavior);
                },10);
                return;
            }

            //ready to wall
            state.map.moveWall(this.x,this.y,this.direction);
            this.movingProgressRemaning = 16;
            this.updateSprite();
        }
        
        if(behavior.type==="stand"){
            this.isStanding = true;
            setTimeout(()=>{
                utils.emitEvent("PersonStandComplete",{
                    whoId: this.id
                });
                this.isStanding=false;
            },behavior.time);
        }
        
    }

    updatePosition(){
        
            const [property, change] = this.directionUpdate[this.direction];
            (this as any)[property] += change;
            this.movingProgressRemaning -= 1;

            if(this.movingProgressRemaning === 0){
                //we finish the walk!
                utils.emitEvent("PersonWalkingComplete",{
                    whoId: this.id
                });
            }
        
    }

    updateSprite(){
        if(this.movingProgressRemaning > 0){
            this.sprite.setAnimation("walk-"+this.direction);
            return ;
        }
        this.sprite.setAnimation("idle-"+ this.direction);        
    }
}