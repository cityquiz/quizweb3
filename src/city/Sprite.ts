import type { GameObject } from "./GameObject";
import { utils } from "./utils";

interface ConfigSprite{
    src: string;
    animations?: Object;
    currentAnimation?: string;
    animationFrameLimit?: number | null;
    gameObject: GameObject;
}
export class Sprite{
    image: HTMLImageElement;
    isLoaded: boolean = false;
    shadow: HTMLImageElement;
    useShadow: boolean;
    isShadowLoaded: boolean=false;
    animations: any;
    currentAnimation: string;
    currentAnimationFrame: number;
    animationFrameLimit: number;
    animationFrameProgress: number;
    gameObject: GameObject;


    constructor(config: ConfigSprite){
        // set up the image
        this.image = new Image();
        this.image.src = config.src;
        
        //this.image.height = this.image.height * 2;
        //this.image.width = this.image.width * 2;
        //this.image.classList.add("hero")
        this.image.style.imageRendering="pixelated";
        this.image.onload = ()=>{
            this.isLoaded = true;
        }

        // shadow

        this.shadow =  new Image();
        this.useShadow =  true;
        if(this.useShadow){
            this.shadow.src =  "/assets/images/characters/shadow.png";
        }
        
        this.shadow.onload=()=>{
            this.isShadowLoaded=true;
        }

        //config animation & Initial State
        this.animations = config.animations || {
            "idle-down" : [ [0,0] ],
            "idle-right": [ [0,1] ],
            "idle-up"   : [ [0,2] ],
            "idle-left" : [ [0,3] ],
            "walk-down" : [ [1,0],[0,0],[3,0],[0,0] ],
            "walk-right": [ [1,1],[0,1],[3,1],[0,1] ],
            "walk-up"   : [ [1,2],[0,2],[3,2],[0,2] ],
            "walk-left" : [ [1,3],[0,3],[3,3],[0,3] ],
        };

        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 16;
        this.animationFrameProgress =  this. animationFrameLimit;

        //reference gameobject 
        this.gameObject = config.gameObject;
    }


    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }



    setAnimation(key: string){
        if(this.currentAnimation!== key){
            this.currentAnimation= key;
            this.currentAnimationFrame=0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress(){
        //downtick frame progress

        if(this.animationFrameProgress>0){
            this.animationFrameProgress -= 1;
            return;
        }

        //reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame +=1;

        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D, cameraPerson: GameObject){
        
        const x = this.gameObject.x  - 8 + utils.widthGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y  - 18 + utils.widthGrid(6) - cameraPerson.y;
  
        this.isShadowLoaded && ctx.drawImage(
            this.shadow,
                x,y
                ); 
        
        const [frameX, frameY] = this.frame;

     this.isLoaded && ctx.drawImage(
        this.image,
            frameX * 32, frameY * 32,
            32,32,
            x,y,
            32,32
            );
        this.updateAnimationProgress();
    }
}