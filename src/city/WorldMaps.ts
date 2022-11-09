import type { GameObject } from "./GameObject";
import { Direction, type Behavior } from "./interfaces/Behavior";
import { OverworldEvent } from "./WorldEvent";
import { Person } from "./Person";
import { utils } from "./utils";

interface ConfigWorldMap{
    gameObject: GameObject;
    cutsceneSpaces: any;
    lowerSrc: string;
    upperSrc: string;
    gameObjects: Map<string, GameObject>;
    walls: any;
    
}

export class OverWorldMap{
    overworld: any;
    gameObjects: Map<string, GameObject>;
    cutsceneSpaces: any;
    walls: any;
    lowerImage: HTMLImageElement;
    upperImage: HTMLImageElement;
    isCutscenePlaying: boolean;
    isPaused: boolean;

    constructor(config: ConfigWorldMap){
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};


        this.lowerImage= new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage= new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
        this.isPaused = false;
    }



    drawLowerImage(ctx:CanvasRenderingContext2D, cameraPerson: GameObject){
        ctx.drawImage(
            this.lowerImage,
            utils.widthGrid(10.5) - cameraPerson.x,
            utils.widthGrid(6) - cameraPerson.y
            );
    }

    drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject){
        ctx.drawImage(
            this.upperImage,
            utils.widthGrid(10.5) - cameraPerson.x,
            utils.widthGrid(6) - cameraPerson.y,
        );
    }

    isSpaceTaken(currentX:number, currentY: number, direction: Direction){
        
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }


    async startCutscene(events: Behavior[]){
        this.isCutscenePlaying = true;


         for(let i=0; i<events.length; i++){
            const eventhandler = new OverworldEvent({
                event: events[i],
                map: this
            });
            //console.log(events[i]);
            await eventhandler.init();
            
        }
        //start a loop of async events
        
        this.isCutscenePlaying = false;


        //reset NPC to do their idle behavior
        //Object.values(this.gameObjects).forEach((obj)=>obj.doBehaviorEvent(this));
        this.gameObjects.forEach((obj)=>obj.doBehaviorEvent(this));
    }

    mountObjects(){
        
        const keys= this.gameObjects.keys();

        for (let key of this.gameObjects.keys()) {
            let object = this.gameObjects.get(key);
            object!.id = key;
            //toodo determine if this object should actualy mount

            //console.log(object)
            object!.mount(this);
        }
    }


    checkForFootstepCutscene(){
        const hero  = this.gameObjects.get("hero");
        const match = this.cutsceneSpaces[`${hero!.x},${hero!.y}`];
        console.log({match});
        if(!this.isCutscenePlaying && match){
            this.startCutscene(match[0].events);
        }
    }

    checkForActionCutscene(){
        const hero = this.gameObjects.get("hero");

        
        const nextCoords = utils.nextPosition(hero!.x,hero!.y,hero!.direction);
        const match = Array.from(this.gameObjects.values()).find(object=>{
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        
        if(!this.isCutscenePlaying && match && match.talking.length){
            //this.startCutscene(match.talking.events);
            this.startCutscene(match.talking);
        }
    }

    addWall(x:number,y:number){
        this.walls[`${x},${y}`]= true;
    }

    removeWall(x:number,y:number){
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX:number, wasY:number, direction: Direction){
        this.removeWall(wasX,wasY);
        const {x,y} = utils.nextPosition(wasX,wasY,direction);
        this.addWall(x,y);
    }
    
}

const stopNpcB=[
    {
        events: [
            { who: "npcB", type: "walk", direction: "left"},
            { who: "npcB", type: "stand", direction: "up", time: 500},
            { type: "textMessage", text: "Hei tu, donde vas, aun no pasastes el examen!" },
            { who: "npcB", type: "walk", direction: "right" },

            { who: "hero", type: "walk", direction: "down"},
            { who: "hero", type: "walk", direction: "down"},
            { who: "hero", type: "walk", direction: "down"},
            //{ who: "hero", type: "walk", direction: "left"}
        ]
    }
];

(window as any).OverWorldMap = {
    DemoRoom:{
        lowerSrc:  "/assets/images/maps/city.png", //"/assets/images/maps/mapa1.png", //"/assets/images/maps/DemoLower.png", //"/assets/images/maps/DemoLower.png",
        upperSrc: "/assets/images/maps/DemoUpper.png",
        gameObjects: new Map<string, GameObject>()
        .set("hero", new Person({
            x:utils.widthGrid(14),
            y:utils.widthGrid(8),
            /* x:utils.widthGrid(16),
            y:utils.widthGrid(13.5), */
            isPlayerControlled: true,
        }))
        .set("npcA",new Person({
            x:utils.widthGrid(10),
            y:utils.widthGrid(6),
            src: "/assets/images/characters/people/npc1.png",
            behaviorLoop: [
                { type: "stand", direction: Direction.left, time: 4800 },
                { type: "stand", direction: Direction.down, time: 5800 },
                { type: "stand", direction: Direction.right, time: 4200 },
                //{ type: "stand", direction: Direction.down, time: 4300 },
            ],
            talking: [
               
                        { type: "textMessage", text: "Listo para ser evaluado!", faceHero: "npcA" },
                        //{ type: "textMessage", text: "hi forastero" },
                        { type: "battle", enemyId: "beth" },
                        //{ who: "hero", type: "stand", direction: "right" }
                
                //{
                 //   events: [
                 //       { type: "textMessage", text: "Busco a bitcoin cahs el forastero"}
                 //   ]
                //}
            ]
        },))
        .set("npcB",new Person({
            x:utils.widthGrid(16),
            y:utils.widthGrid(5),
            src: "/assets/images/characters/people/erio.png",
            talking: [
                
                        { type: "textMessage", text: "Bahahaha!", faceHero: "npcB"},
                        //{ type: "textMessage", text: "hi forastero" },
                        { type: "battle", enemyId: "erio" },
                        //{ who: "hero", type: "stand", direction: "right" }
            
            ]
        },)),
        
        /* {
            hero: new Person({
                x:utils.widthGrid(5),
                y:utils.widthGrid(6),
                isPlayerControlled: true,
            }),
            npcA: new Person({
                x:utils.widthGrid(7),
                y:utils.widthGrid(9),
                src: "/assets/images/characters/people/npc1.png",
                behaviorLoop: [
                    { type: "stand", direction: Direction.left, time: 800 },
                    { type: "stand", direction: Direction.up, time: 800 },
                    { type: "stand", direction: Direction.right, time: 1200 },
                    { type: "stand", direction: Direction.up, time: 300 },
                ],
                talking: [
                   
                            { type: "textMessage", text: "I am busy", faceHero: "npcA" },
                            //{ type: "textMessage", text: "hi forastero" },
                            { type: "battle", enemyId: "beth" },
                            //{ who: "hero", type: "stand", direction: "right" }
                    
                    //{
                     //   events: [
                     //       { type: "textMessage", text: "Busco a bitcoin cahs el forastero"}
                     //   ]
                    //}
                ]
            },),
            npcB: new Person({
                x:utils.widthGrid(8),
                y:utils.widthGrid(5),
                src: "/assets/images/characters/people/erio.png",
                talking: [
                    
                            { type: "textMessage", text: "Bahahaha!", faceHero: "npcB"},
                            //{ type: "textMessage", text: "hi forastero" },
                            { type: "battle", enemyId: "erio" },
                            //{ who: "hero", type: "stand", direction: "right" }
                
                ]
            },),
        }, */

        walls: {
            //"16,16": true
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(31,9)]:stopNpcB,
            [utils.asGridCoord(30,9)]: stopNpcB,
            [utils.asGridCoord(18,11)]:[
                {
                    events: [
                        { type: "changeMap", map: "Kitchen"}
                    ]
                }
            ]
        }
    },
    Kitchen:{
        lowerSrc: "/assets/images/maps/Level_0.png",
        //lowerSrc: "/preview1.png",
        
        upperSrc: "/assets/images/maps/KitchenUpper.png",
        gameObjects: new Map<string, GameObject>()
        .set("hero",new Person({
            x:utils.widthGrid(5),
            y:utils.widthGrid(5),
            isPlayerControlled: true,
        }))
        .set("npcB",new Person({
            x:utils.widthGrid(10),
            y:utils.widthGrid(4),
            src: "/assets/images/characters/people/npc2.png",
            talking: [
                
                {type: "textMessage", text: "Hola, hoy es un buen dia para aprender!", faceHero: "npcB"}
            ]
        },)),
        walls: {
            //"16,16": true
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,
        },
        // Definir salida habitaicón
        cutsceneSpaces: {
            // [utils.asGridCoord(31,9)]:stopNpcB,
            // [utils.asGridCoord(30,9)]: stopNpcB,
            [utils.asGridCoord(18,11)]:[
                {
                    events: [
                        { type: "changeMap", map: "DemoRoom"}
                    ]
                }
            ]
        }
        
    }
}