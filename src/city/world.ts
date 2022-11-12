
import { useWallet } from "@/stores/store-wallet";
import { computed, watch } from "vue";
import  { DirectionInput } from "./DirectionInput";
import { Hud } from "./Hud";
//import  { Hud } from "./Hud";

import { KeyPressedListener } from "./KeyPressedListener";
import { OverWorldMap } from "./WorldMaps";

export interface  ConfigOverworld{
    element: HTMLDivElement
}
export class Overworld {
    element: HTMLDivElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D ;
    map: OverWorldMap | null;
    hud?: Hud;

    directionInput: DirectionInput | null = null;

    //user: any;

    constructor(config: ConfigOverworld){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas")!;
        this.ctx = this.canvas!.getContext("2d")!;
        this.map= null;
        
    }

    startGameLoop(){
        //let nextTime=0;
        const step = (time: number=800)=>{
            // clear off the canvas
                
                this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

                    //stablecemos la camara de la persona
                const cameraPerson = this.map!.gameObjects.get("hero")!;
                //if(time>nextTime){
                    //nextTime= time+10;
                    this.map?.gameObjects.forEach((object)=>{
                        object.update({
                            arrow: this.directionInput!.direction,
                            map: this.map
                        });
                        //console.log(object)
                    });
                    /* Object.values(this.map.gameObjects).forEach(object=>{
                        object.update({
                            arrow: this.directionInput.direction,
                            map: this.map
                        });
                        //console.log(object)
                    }); */
                //}
                    this.map!.drawLowerImage(this.ctx, cameraPerson);

                //draw game objects
                

                Array.from(this.map!.gameObjects.values()).sort((a,b) => {
                    return a.y - b.y;
                })
                .forEach(object=>{
                    object.sprite.draw(this.ctx, cameraPerson);
                });
            
                this.map!.drawUpperImage(this.ctx, cameraPerson);
                //console.log("steppind!!");
        
                if(!this.map!.isPaused){
                    requestAnimationFrame((time)=>{
                        step(time);
                    });
                }
            
        }
        step();
    }


    bindActionInput(){
        new KeyPressedListener("Enter", ()=>{
            this.map!.checkForActionCutscene();
        });

        new KeyPressedListener("Escape", ()=>{
            if(!this.map!.isCutscenePlaying){
                /* this.map.startCutscene([
                    { type: "pause" }
                ]); */

            }
        });
    }

    bindHeroPositionCheck(){
        document.addEventListener("PersonWalkingComplete", (e:any)=>{
            if(e.detail.whoId=="hero"){
                //hero s position has chnaged
                
                this.map!.checkForFootstepCutscene();
            }
        })
    }

    startMap(mapConfig: any){
        this.map = new OverWorldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }


   

    

    init(){


        const stateUser=useWallet();
        const user=computed(()=>stateUser.getUser);
        //agregamos los hud en el mapa
        this.hud = new Hud(user.value.username); 
        this.hud.init(document.querySelector(".game-container")!);
        
        //watch(user,(newUser)=>{
            
        this.hud?.setUsername(user.value.username!);
        this.hud?.createElement();
        //})
  

        this.startMap((window as any).OverWorldMap.DemoRoom);

        this.bindActionInput();
        this.bindHeroPositionCheck();

        this.directionInput =  new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        
/*         this.map.startCutscene([
            
            
            //{ who: "hero", type: "walk", direction: "down"},
            //{ who: "hero", type: "walk", direction: "down"},
            //{ who: "npcA", type: "walk", direction: "left"},
            //{ who: "npcA", type: "walk", direction: "left"},
            //{ who: "npcA", type: "stand", direction: "up" , time: 200 },
            
            //{type: "textMessage", text:"This is the very first message!" }
            //{type: "changeMap", map:"DemoRoom" }

            { type: "battle", enemyId: "beth" }
        ]); */
        

       
    }
}