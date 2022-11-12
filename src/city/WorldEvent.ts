import type { Behavior } from "./interfaces/Behavior";
import type { OverWorldMap } from "./WorldMaps";
import { Person } from "./Person";
import { SceneTransition } from "./SceneTransition";
import { TextMessage } from "./TextMessage";
import { utils } from "./utils";
import { Battle } from "./Battle/Battle";
import { Enemies } from "./Content/enemies";
//import { getProjectQuizById } from "@/stores/api";

interface ConfigOverWorldMap{
    map: OverWorldMap;
    event: Behavior

}
export class OverworldEvent{
    map: OverWorldMap;
    event: Behavior;

    constructor(config: ConfigOverWorldMap){
        this.map = config.map;
        this.event = config.event;
    }


    stand(resolve:() => void){
        
        const who = this.map.gameObjects.get(this.event.who!);
        if(who instanceof Person){
            who.startBehavior({
                map: this.map
            },{
                type: "stand",
                direction: this.event.direction,
                time: this.event.time
            });
        }

        //resolve();

        //set up handler to complete walkinking event
        const completeHandler = (e:any)=>{
            if(e.detail.whoId == this.event.who){
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandComplete",completeHandler)

        
    }


    walk(resolve:() => void){
        const who = this.map.gameObjects.get(this.event.who!);
        if(who instanceof Person){
            who.startBehavior({
                map: this.map
            },
            {
                type: "walk",
                direction: this.event.direction,
                retry: true
            });
        }
        //set up handler to complete walkinking event
        const completeHandler = (e: any)=>{
            if(e.detail.whoId == this.event.who){
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete",completeHandler)
    }



    textMessage(resolve:() => void){
    
        if(this.event.faceHero){
            const obj = this.map.gameObjects.get(this.event.faceHero);
            obj!.direction= utils.oppositeDirection(this.map.gameObjects.get("hero")!.direction);
        }

        const message= new TextMessage({
            text: this.event.text!,
            onComplete: ()=>resolve()
        });

        message.init(document.querySelector(".game-container")!);
    }



    changeMap(resolve:() => void){
        const sceneTransition =  new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container")!,()=>{
            
            this.map.overworld.startMap((window as any).OverWorldMap[this.event.map!]);
            resolve();

            sceneTransition.fadeOut();
        });

        //
    }


    async battle(resolve:() => void){
        const enemy = Enemies.get(this.event.enemyId!)!;
        /* if(enemy.quiz_id){
             await getQuizById(enemy.quiz_id!).then(res=>{
                
                console.log(res);
                //enemy.questions=res;
             });
        } */
        const battle = new Battle({
            enemy: enemy,
            onComplete: ()=>{
                resolve();
            }
        });

        battle.init(document.querySelector(".game-container")!);
    } 

    /* 
    pause(resolve:() => void){
        console.log("PAUSE NOW")
        this.map.isPaused= true;
        const menu = new PauseMenu({
            onComplete: ()=>{
                resolve();
                this.map.isPaused= false;
                this.map.overworld.startGameLoop();
            }
        });

        menu.init(document.querySelector(".game-container"));
    } */


    init(){
        return new Promise((resolve)=>{
            (this as any)[this.event.type](resolve)
        });
    }

}