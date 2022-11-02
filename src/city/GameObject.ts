import { Direction, type Behavior } from "./interfaces/Behavior";
import { OverworldEvent } from "./WorldEvent";
import type { OverWorldMap } from "./WorldMaps";
import { Sprite } from "./Sprite";
export interface EventGame{
    type: string;
    text?: string;
    enemyId?: string;
    faceHero?: string;
}

export interface ConfigGameObject{
    src?: string;
    behaviorLoop?: Behavior[];
    x?: number;
    y?: number;
    direction?: Direction;
    talking?: Behavior[];
}

export class GameObject{
    id: string | null;
    isMounted: boolean;
    x: number;
    y: number;
    direction: Direction;
    sprite: Sprite;
    behaviorLoop: Behavior[];
    behaviorLoopIndex: number;
    talking: Behavior[];
    isStanding: boolean= false;

    constructor(config:ConfigGameObject){
        this.id= null;
        this.isMounted= false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || Direction.down;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/assets/images/characters/people/hero.png"
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;


        this.talking = config.talking || [];
    }
    setDirection(direction: Direction){
        this.direction= direction;
    }

    mount(map: OverWorldMap){
        console.log('mouting!')
        this.isMounted= true;
        map.addWall(this.x,this.y);

        //  if we have a behavior, kick off after a short delay

        setTimeout(()=>{
            this.doBehaviorEvent(map);
        },10);
    }


     update(state: any){
        
    } 

    async doBehaviorEvent(map: OverWorldMap){

        //don't do anything if there is a more important  or I don't have config to do anything
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding){
            return ;
        }


        //setting up our event with info
        let eventConfig =  this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;


        //create an event instance out of our next event config
        const eventhandler =  new OverworldEvent({map, event: eventConfig});
        await eventhandler.init();

        this.behaviorLoopIndex +=1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0;
        }

        //do it again

        this.doBehaviorEvent(map);
    }
}