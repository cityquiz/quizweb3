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
            x:utils.widthGrid(11),
            y:utils.widthGrid(14),

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
                
                { type: "textMessage", text: "¡Hola, busca un edificio para completar un quiz y conseguir NFTs!", faceHero: "npcB"},
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
            // BORDER IMAGEN:
            // LADO IZQ
            [utils.asGridCoord(3,0)]: true,
            [utils.asGridCoord(3,1)]: true,
            [utils.asGridCoord(3,2)]: true,
            [utils.asGridCoord(3,3)]: true,
            [utils.asGridCoord(3,4)]: true,
            [utils.asGridCoord(3,5)]: true,
            [utils.asGridCoord(3,6)]: true,
            [utils.asGridCoord(3,7)]: true,
            [utils.asGridCoord(3,8)]: true,
            [utils.asGridCoord(3,9)]: true,
            [utils.asGridCoord(3,10)]: true,
            [utils.asGridCoord(3,11)]: true,
            [utils.asGridCoord(3,12)]: true,
            [utils.asGridCoord(3,13)]: true,
            [utils.asGridCoord(3,14)]: true,
            [utils.asGridCoord(3,15)]: true,
            [utils.asGridCoord(3,16)]: true,
            [utils.asGridCoord(3,17)]: true,
            [utils.asGridCoord(3,18)]: true,
            [utils.asGridCoord(3,19)]: true,
            [utils.asGridCoord(3,20)]: true,
            [utils.asGridCoord(3,21)]: true,
            [utils.asGridCoord(3,22)]: true,
            [utils.asGridCoord(3,23)]: true,
            [utils.asGridCoord(3,24)]: true,
            [utils.asGridCoord(3,25)]: true,
            [utils.asGridCoord(3,26)]: true,
            [utils.asGridCoord(3,27)]: true,
            [utils.asGridCoord(3,28)]: true,
            [utils.asGridCoord(3,29)]: true,
            [utils.asGridCoord(3,30)]: true,
            [utils.asGridCoord(3,31)]: true,
            [utils.asGridCoord(3,32)]: true,
            [utils.asGridCoord(3,33)]: true,
            [utils.asGridCoord(3,34)]: true,
            [utils.asGridCoord(3,35)]: true,
            [utils.asGridCoord(3,36)]: true,
            [utils.asGridCoord(3,37)]: true,
            [utils.asGridCoord(3,38)]: true,
            [utils.asGridCoord(3,39)]: true,
            [utils.asGridCoord(3,40)]: true,
            [utils.asGridCoord(3,41)]: true,
            [utils.asGridCoord(3,42)]: true,
            [utils.asGridCoord(3,43)]: true,
            [utils.asGridCoord(3,44)]: true,
            [utils.asGridCoord(3,45)]: true,
            [utils.asGridCoord(3,46)]: true,
            [utils.asGridCoord(3,47)]: true,
            [utils.asGridCoord(3,48)]: true,
            [utils.asGridCoord(3,49)]: true,
            [utils.asGridCoord(3,50)]: true,
            [utils.asGridCoord(3,51)]: true,
            [utils.asGridCoord(3,52)]: true,
            [utils.asGridCoord(3,53)]: true,
            [utils.asGridCoord(3,54)]: true,
            [utils.asGridCoord(3,55)]: true,
            [utils.asGridCoord(3,56)]: true,
            [utils.asGridCoord(3,57)]: true,
            [utils.asGridCoord(3,58)]: true,
            [utils.asGridCoord(3,59)]: true,
            [utils.asGridCoord(3,60)]: true,            


            // TOP
            [utils.asGridCoord(1,11)]: true,
            [utils.asGridCoord(2,11)]: true,
            [utils.asGridCoord(3,11)]: true,
            [utils.asGridCoord(4,11)]: true,
            [utils.asGridCoord(5,11)]: true,
            [utils.asGridCoord(6,11)]: true,
            [utils.asGridCoord(7,11)]: true,
            [utils.asGridCoord(8,11)]: true,
            [utils.asGridCoord(9,11)]: true,
            [utils.asGridCoord(10,11)]: true,
            [utils.asGridCoord(11,11)]: true,
            [utils.asGridCoord(12,11)]: true,
            [utils.asGridCoord(13,11)]: true,
            [utils.asGridCoord(14,11)]: true,
            [utils.asGridCoord(15,11)]: true,
            [utils.asGridCoord(16,11)]: true,
            // EDIFICIO 1
            // [utils.asGridCoord(17,11)]: true,
            // [utils.asGridCoord(18,11)]: true,
            [utils.asGridCoord(19,11)]: true,
            [utils.asGridCoord(20,11)]: true,
            [utils.asGridCoord(21,11)]: true,
            [utils.asGridCoord(22,11)]: true,
            [utils.asGridCoord(23,11)]: true,
            [utils.asGridCoord(24,11)]: true,
            [utils.asGridCoord(25,11)]: true,
            [utils.asGridCoord(26,11)]: true,
            [utils.asGridCoord(27,11)]: true,
            [utils.asGridCoord(28,11)]: true,
            [utils.asGridCoord(28,10)]: true,
            [utils.asGridCoord(28,9)]: true,

            [utils.asGridCoord(29,9)]: true,
            [utils.asGridCoord(30,9)]: true,
            [utils.asGridCoord(31,9)]: true,
            [utils.asGridCoord(32,9)]: true,
            [utils.asGridCoord(33,9)]: true,
            [utils.asGridCoord(34,9)]: true,
            [utils.asGridCoord(34,10)]: true,
            [utils.asGridCoord(34,11)]: true,
            [utils.asGridCoord(35,11)]: true,
            [utils.asGridCoord(36,11)]: true,
            [utils.asGridCoord(37,11)]: true,
            [utils.asGridCoord(38,11)]: true,
            [utils.asGridCoord(39,11)]: true,
            [utils.asGridCoord(40,11)]: true,                        
            [utils.asGridCoord(41,11)]: true,
            [utils.asGridCoord(42,11)]: true,
            [utils.asGridCoord(43,11)]: true,
            [utils.asGridCoord(44,11)]: true,
            [utils.asGridCoord(45,11)]: true,
            [utils.asGridCoord(46,11)]: true,
            [utils.asGridCoord(47,11)]: true,
            [utils.asGridCoord(48,11)]: true,
            [utils.asGridCoord(49,11)]: true,
            [utils.asGridCoord(50,11)]: true,  
            [utils.asGridCoord(51,11)]: true,
            [utils.asGridCoord(52,11)]: true,
            [utils.asGridCoord(53,11)]: true,
            [utils.asGridCoord(54,11)]: true,
            [utils.asGridCoord(55,11)]: true,
            [utils.asGridCoord(56,11)]: true,
            [utils.asGridCoord(57,11)]: true,
            [utils.asGridCoord(58,11)]: true,
            [utils.asGridCoord(59,11)]: true,
            [utils.asGridCoord(60,11)]: true,              

            // BOTTOM 30-60
            [utils.asGridCoord(1,30)]: true,
            [utils.asGridCoord(2,30)]: true,
            [utils.asGridCoord(3,30)]: true,
            [utils.asGridCoord(4,30)]: true,
            [utils.asGridCoord(5,30)]: true,
            [utils.asGridCoord(6,30)]: true,
            [utils.asGridCoord(7,30)]: true,
            [utils.asGridCoord(8,30)]: true,
            [utils.asGridCoord(9,30)]: true,
            [utils.asGridCoord(10,30)]: true,
            [utils.asGridCoord(11,30)]: true,
            [utils.asGridCoord(12,30)]: true,
            [utils.asGridCoord(13,30)]: true,
            [utils.asGridCoord(14,30)]: true,
            [utils.asGridCoord(15,30)]: true,
            [utils.asGridCoord(16,30)]: true,
            [utils.asGridCoord(17,30)]: true,
            [utils.asGridCoord(18,30)]: true,
            [utils.asGridCoord(19,30)]: true,
            [utils.asGridCoord(20,30)]: true,
            [utils.asGridCoord(21,30)]: true,
            [utils.asGridCoord(22,30)]: true,
            [utils.asGridCoord(23,30)]: true,
            [utils.asGridCoord(24,30)]: true,
            [utils.asGridCoord(25,30)]: true,
            [utils.asGridCoord(26,30)]: true,
            [utils.asGridCoord(27,30)]: true,
            [utils.asGridCoord(28,30)]: true,
            [utils.asGridCoord(29,30)]: true,
            [utils.asGridCoord(30,30)]: true,            
            [utils.asGridCoord(21,30)]: true,
            [utils.asGridCoord(22,30)]: true,
            [utils.asGridCoord(23,30)]: true,
            [utils.asGridCoord(24,30)]: true,
            [utils.asGridCoord(25,30)]: true,
            [utils.asGridCoord(26,30)]: true,
            [utils.asGridCoord(27,30)]: true,
            [utils.asGridCoord(28,30)]: true,
            [utils.asGridCoord(29,30)]: true,
            [utils.asGridCoord(30,30)]: true,                        
            [utils.asGridCoord(31,30)]: true,
            [utils.asGridCoord(32,30)]: true,
            [utils.asGridCoord(33,30)]: true,
            [utils.asGridCoord(34,30)]: true,
            [utils.asGridCoord(35,30)]: true,
            [utils.asGridCoord(36,30)]: true,
            [utils.asGridCoord(37,30)]: true,
            [utils.asGridCoord(38,30)]: true,
            [utils.asGridCoord(39,30)]: true,
            [utils.asGridCoord(40,30)]: true,                        
            [utils.asGridCoord(41,30)]: true,
            [utils.asGridCoord(42,30)]: true,
            [utils.asGridCoord(43,30)]: true,
            [utils.asGridCoord(44,30)]: true,
            [utils.asGridCoord(45,30)]: true,
            [utils.asGridCoord(46,30)]: true,
            [utils.asGridCoord(47,30)]: true,
            [utils.asGridCoord(48,30)]: true,
            [utils.asGridCoord(49,30)]: true,
            [utils.asGridCoord(50,30)]: true,  
            [utils.asGridCoord(51,30)]: true,
            [utils.asGridCoord(52,30)]: true,
            [utils.asGridCoord(53,30)]: true,
            [utils.asGridCoord(54,30)]: true,
            [utils.asGridCoord(55,30)]: true,
            [utils.asGridCoord(56,30)]: true,
            [utils.asGridCoord(57,30)]: true,
            [utils.asGridCoord(58,30)]: true,
            [utils.asGridCoord(59,30)]: true,
            [utils.asGridCoord(60,30)]: true,  

            // LADO DERCH.
            [utils.asGridCoord(56,0)]: true,
            [utils.asGridCoord(56,1)]: true,
            [utils.asGridCoord(56,2)]: true,
            [utils.asGridCoord(56,3)]: true,
            [utils.asGridCoord(56,4)]: true,
            [utils.asGridCoord(56,5)]: true,
            [utils.asGridCoord(56,6)]: true,
            [utils.asGridCoord(56,7)]: true,
            [utils.asGridCoord(56,8)]: true,
            [utils.asGridCoord(56,9)]: true,
            [utils.asGridCoord(56,10)]: true,
            [utils.asGridCoord(56,11)]: true,
            [utils.asGridCoord(56,12)]: true,
            [utils.asGridCoord(56,13)]: true,
            [utils.asGridCoord(56,14)]: true,
            [utils.asGridCoord(56,15)]: true,
            [utils.asGridCoord(56,16)]: true,
            [utils.asGridCoord(56,17)]: true,
            [utils.asGridCoord(56,18)]: true,
            [utils.asGridCoord(56,19)]: true,
            [utils.asGridCoord(56,20)]: true,
            [utils.asGridCoord(56,21)]: true,
            [utils.asGridCoord(56,22)]: true,
            [utils.asGridCoord(56,23)]: true,
            [utils.asGridCoord(56,24)]: true,
            [utils.asGridCoord(56,25)]: true,
            [utils.asGridCoord(56,26)]: true,
            [utils.asGridCoord(56,27)]: true,
            [utils.asGridCoord(57,27)]: true,
            [utils.asGridCoord(58,27)]: true,
            [utils.asGridCoord(59,27)]: true,
            [utils.asGridCoord(60,28)]: true,
            [utils.asGridCoord(60,29)]: true,
            [utils.asGridCoord(60,30)]: true,
            [utils.asGridCoord(60,31)]: true,
            [utils.asGridCoord(60,32)]: true,
            [utils.asGridCoord(60,33)]: true,
            [utils.asGridCoord(60,34)]: true,
            [utils.asGridCoord(60,35)]: true,
            [utils.asGridCoord(60,36)]: true,
            [utils.asGridCoord(60,37)]: true,
            [utils.asGridCoord(60,38)]: true,
            [utils.asGridCoord(60,39)]: true,
            [utils.asGridCoord(60,40)]: true,
            [utils.asGridCoord(60,41)]: true,
            [utils.asGridCoord(60,42)]: true,
            [utils.asGridCoord(60,43)]: true,
            [utils.asGridCoord(60,44)]: true,
            [utils.asGridCoord(60,45)]: true,
            [utils.asGridCoord(60,46)]: true,
            [utils.asGridCoord(60,47)]: true,
            [utils.asGridCoord(60,48)]: true,
            [utils.asGridCoord(60,49)]: true,
            [utils.asGridCoord(60,50)]: true,
            [utils.asGridCoord(60,51)]: true,
            [utils.asGridCoord(60,52)]: true,
            [utils.asGridCoord(60,53)]: true,
            [utils.asGridCoord(60,54)]: true,
            [utils.asGridCoord(60,55)]: true,
            [utils.asGridCoord(60,56)]: true,
            [utils.asGridCoord(60,57)]: true,
            [utils.asGridCoord(60,58)]: true,
            [utils.asGridCoord(60,59)]: true,
            [utils.asGridCoord(60,60)]: true,   

            // EDIFICIO ROJO
            [utils.asGridCoord(49,17)]: true,
            [utils.asGridCoord(48,17)]: true,
            [utils.asGridCoord(47,17)]: true,
            [utils.asGridCoord(46,17)]: true,
            [utils.asGridCoord(45,17)]: true,
            [utils.asGridCoord(44,17)]: true,
            [utils.asGridCoord(43,17)]: true,
            [utils.asGridCoord(42,17)]: true,
            [utils.asGridCoord(42,18)]: true,
            [utils.asGridCoord(42,19)]: true,
            [utils.asGridCoord(42,20)]: true,
            [utils.asGridCoord(42,21)]: true,
            [utils.asGridCoord(42,22)]: true,
            [utils.asGridCoord(42,23)]: true,
            [utils.asGridCoord(42,24)]: true,
            [utils.asGridCoord(42,25)]: true,
            [utils.asGridCoord(42,26)]: true,

            [utils.asGridCoord(49,27)]: true,
            [utils.asGridCoord(48,27)]: true,
            [utils.asGridCoord(47,27)]: true,
            [utils.asGridCoord(46,27)]: true,
            [utils.asGridCoord(45,27)]: true,
            [utils.asGridCoord(44,27)]: true,
            [utils.asGridCoord(43,27)]: true,
            [utils.asGridCoord(42,27)]: true,

            [utils.asGridCoord(49,17)]: true,
            [utils.asGridCoord(49,18)]: true,
            [utils.asGridCoord(49,19)]: true,
            [utils.asGridCoord(49,20)]: true,
            [utils.asGridCoord(49,21)]: true,
            [utils.asGridCoord(49,22)]: true,
            [utils.asGridCoord(49,23)]: true,
            [utils.asGridCoord(49,24)]: true,
            [utils.asGridCoord(49,25)]: true,
            [utils.asGridCoord(49,26)]: true,


            // EDIFICIO AZUL
            [utils.asGridCoord(12,15)]: true,
            [utils.asGridCoord(13,15)]: true,
            [utils.asGridCoord(14,15)]: true,
            [utils.asGridCoord(15,15)]: true,
            [utils.asGridCoord(16,15)]: true,
            [utils.asGridCoord(17,15)]: true,
            [utils.asGridCoord(18,15)]: true,
            [utils.asGridCoord(19,15)]: true,
            [utils.asGridCoord(20,15)]: true,
            [utils.asGridCoord(21,15)]: true,

            [utils.asGridCoord(12,25)]: true,
            [utils.asGridCoord(13,25)]: true,
            [utils.asGridCoord(14,25)]: true,
            [utils.asGridCoord(15,25)]: true,
            [utils.asGridCoord(16,25)]: true,
            [utils.asGridCoord(17,25)]: true,
            [utils.asGridCoord(18,25)]: true,
            [utils.asGridCoord(19,25)]: true,
            [utils.asGridCoord(20,25)]: true,
            [utils.asGridCoord(21,25)]: true,

            [utils.asGridCoord(12,16)]: true,
            [utils.asGridCoord(12,17)]: true,
            [utils.asGridCoord(12,18)]: true,
            [utils.asGridCoord(12,19)]: true,
            [utils.asGridCoord(12,20)]: true,
            [utils.asGridCoord(12,21)]: true,
            [utils.asGridCoord(12,22)]: true,
            [utils.asGridCoord(12,23)]: true,
            [utils.asGridCoord(12,24)]: true,
            [utils.asGridCoord(12,25)]: true,

            [utils.asGridCoord(21,16)]: true,
            [utils.asGridCoord(21,17)]: true,
            [utils.asGridCoord(21,18)]: true,
            [utils.asGridCoord(21,19)]: true,
            [utils.asGridCoord(21,20)]: true,
            [utils.asGridCoord(21,21)]: true,
            [utils.asGridCoord(21,22)]: true,
            [utils.asGridCoord(21,23)]: true,
            [utils.asGridCoord(21,24)]: true,
            [utils.asGridCoord(21,25)]: true,


        },
        cutsceneSpaces: {
            [utils.asGridCoord(31,9)]: stopNpcB,
            [utils.asGridCoord(30,9)]: stopNpcB,
            [utils.asGridCoord(17,11)]:[
                {
                    events: [
                        { type: "changeMap", map: "Kitchen"}
                    ]
                }
            ],
            [utils.asGridCoord(18,11)]:[
                {
                    events: [
                        { type: "changeMap", map: "Kitchen"}
                    ]
                }
            ],
                  
        }
    },
    Kitchen:{
        lowerSrc: "/assets/images/maps/Level_1.png",
        //lowerSrc: "/preview1.png",
        
        upperSrc: "/assets/images/maps/KitchenUpper.png",
        gameObjects: new Map<string, GameObject>()
        .set("hero",new Person({
            x:utils.widthGrid(15),
            y:utils.widthGrid(6),
            isPlayerControlled: true,
        }))
        .set("npcB",new Person({
            x:utils.widthGrid(30),
            y:utils.widthGrid(8),
            src: "/assets/images/characters/people/npc2.png",
            talking: [
                
                {type: "textMessage", text: "Hola, ¡hoy es un buen dia para aprender!", faceHero: "npcB"}
            ]
        },)),
        walls: {
            //"16,16": true
            [utils.asGridCoord(1,7)]: true,
            [utils.asGridCoord(2,7)]: true,
            [utils.asGridCoord(3,7)]: true,
            [utils.asGridCoord(4,7)]: true,
            [utils.asGridCoord(5,7)]: true,
            [utils.asGridCoord(6,7)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,
            [utils.asGridCoord(9,7)]: true,
            [utils.asGridCoord(10,7)]: true,
            [utils.asGridCoord(11,7)]: true,
            [utils.asGridCoord(11,6)]: true,

            [utils.asGridCoord(2,12)]: true,
            [utils.asGridCoord(3,12)]: true,
            [utils.asGridCoord(4,12)]: true,
            [utils.asGridCoord(5,12)]: true,
            [utils.asGridCoord(5,13)]: true,
            [utils.asGridCoord(5,14)]: true,
            [utils.asGridCoord(4,14)]: true,
            [utils.asGridCoord(3,14)]: true,
            [utils.asGridCoord(2,14)]: true,


            [utils.asGridCoord(22,6)]: true,
            [utils.asGridCoord(22,7)]: true,
            [utils.asGridCoord(23,7)]: true,
            [utils.asGridCoord(24,7)]: true,
            [utils.asGridCoord(25,7)]: true,
            [utils.asGridCoord(26,7)]: true,
            [utils.asGridCoord(27,7)]: true,
            [utils.asGridCoord(27,6)]: true,

            // MEsa de fondo
            [utils.asGridCoord(14,21)]: true,
            [utils.asGridCoord(14,22)]: true,
            [utils.asGridCoord(14,23)]: true,
            [utils.asGridCoord(15,21)]: true,
            [utils.asGridCoord(16,21)]: true,
            [utils.asGridCoord(17,21)]: true,
            [utils.asGridCoord(18,21)]: true,
            [utils.asGridCoord(19,21)]: true,
            [utils.asGridCoord(20,21)]: true,
            [utils.asGridCoord(21,21)]: true,
            [utils.asGridCoord(21,22)]: true,
            [utils.asGridCoord(21,23)]: true,

            // MESA DE CENTRO
            [utils.asGridCoord(16,11)]: true,
            [utils.asGridCoord(17,11)]: true,
            [utils.asGridCoord(18,11)]: true,
            [utils.asGridCoord(19,11)]: true,
            [utils.asGridCoord(16,15)]: true,
            [utils.asGridCoord(17,15)]: true,
            [utils.asGridCoord(18,15)]: true,
            [utils.asGridCoord(19,15)]: true,
            [utils.asGridCoord(16,12)]: true,
            [utils.asGridCoord(16,13)]: true,
            [utils.asGridCoord(16,14)]: true,
            [utils.asGridCoord(16,15)]: true,
            [utils.asGridCoord(19,12)]: true,
            [utils.asGridCoord(19,13)]: true,
            [utils.asGridCoord(19,14)]: true,
            [utils.asGridCoord(19,15)]: true,


            [utils.asGridCoord(6,14)]: true,
            [utils.asGridCoord(7,14)]: true,
            [utils.asGridCoord(7,15)]: true,
            [utils.asGridCoord(7,16)]: true,
            [utils.asGridCoord(7,17)]: true,
            [utils.asGridCoord(7,18)]: true,
            [utils.asGridCoord(7,19)]: true,
            [utils.asGridCoord(6,14)]: true,
            [utils.asGridCoord(6,15)]: true,
            [utils.asGridCoord(6,16)]: true,
            [utils.asGridCoord(6,17)]: true,
            [utils.asGridCoord(6,18)]: true,
            [utils.asGridCoord(6,19)]: true,


            [utils.asGridCoord(10,5)]: true,
            [utils.asGridCoord(11,5)]: true,
            [utils.asGridCoord(12,5)]: true,
            [utils.asGridCoord(13,5)]: true,
            [utils.asGridCoord(14,5)]: true,
            [utils.asGridCoord(15,5)]: true,
            // Door
            // [utils.asGridCoord(16,5)]: true,
            // [utils.asGridCoord(17,5)]: true,
            [utils.asGridCoord(18,5)]: true,
            [utils.asGridCoord(19,5)]: true,
            [utils.asGridCoord(20,5)]: true,
            [utils.asGridCoord(21,5)]: true,
            [utils.asGridCoord(22,5)]: true,
            [utils.asGridCoord(23,5)]: true,
            [utils.asGridCoord(24,5)]: true,
            [utils.asGridCoord(25,5)]: true,
            [utils.asGridCoord(26,5)]: true,
            [utils.asGridCoord(27,5)]: true,
            [utils.asGridCoord(28,5)]: true,
            [utils.asGridCoord(29,5)]: true,
            [utils.asGridCoord(30,5)]: true,




            [utils.asGridCoord(1,8)]: true,
            [utils.asGridCoord(1,9)]: true,
            [utils.asGridCoord(1,10)]: true,
            [utils.asGridCoord(1,11)]: true,
            [utils.asGridCoord(1,12)]: true,
            [utils.asGridCoord(1,13)]: true,
            [utils.asGridCoord(1,14)]: true,
            [utils.asGridCoord(1,15)]: true,
            [utils.asGridCoord(1,16)]: true,
            [utils.asGridCoord(1,17)]: true,
            [utils.asGridCoord(1,18)]: true,
            [utils.asGridCoord(1,19)]: true,
            [utils.asGridCoord(1,20)]: true,
            [utils.asGridCoord(1,21)]: true,
            [utils.asGridCoord(1,22)]: true,
            [utils.asGridCoord(1,23)]: true,
            [utils.asGridCoord(1,24)]: true,

            [utils.asGridCoord(2,24)]: true,
            [utils.asGridCoord(3,24)]: true,
            [utils.asGridCoord(4,24)]: true,
            [utils.asGridCoord(5,24)]: true,
            [utils.asGridCoord(6,24)]: true,
            [utils.asGridCoord(7,24)]: true,
            [utils.asGridCoord(8,24)]: true,
            [utils.asGridCoord(9,24)]: true,
            [utils.asGridCoord(10,24)]: true,
            [utils.asGridCoord(11,24)]: true,
            [utils.asGridCoord(12,24)]: true,
            [utils.asGridCoord(13,24)]: true,
            [utils.asGridCoord(14,24)]: true,
            [utils.asGridCoord(15,24)]: true,
            [utils.asGridCoord(16,24)]: true,
            [utils.asGridCoord(17,24)]: true,
            [utils.asGridCoord(18,24)]: true,
            [utils.asGridCoord(19,24)]: true,
            [utils.asGridCoord(20,24)]: true,
            [utils.asGridCoord(21,24)]: true,
            [utils.asGridCoord(22,24)]: true,
            [utils.asGridCoord(23,24)]: true,
            [utils.asGridCoord(24,24)]: true,
            [utils.asGridCoord(25,24)]: true,
            [utils.asGridCoord(26,24)]: true,
            [utils.asGridCoord(27,24)]: true,
            [utils.asGridCoord(28,24)]: true,
            [utils.asGridCoord(29,24)]: true,
            [utils.asGridCoord(30,24)]: true,

            [utils.asGridCoord(30,23)]: true,
            [utils.asGridCoord(30,22)]: true,
            [utils.asGridCoord(30,21)]: true,
            [utils.asGridCoord(30,20)]: true,
            [utils.asGridCoord(30,19)]: true,
            [utils.asGridCoord(30,18)]: true,
            [utils.asGridCoord(30,17)]: true,
            [utils.asGridCoord(30,16)]: true,
            [utils.asGridCoord(30,15)]: true,
            [utils.asGridCoord(30,14)]: true,
            [utils.asGridCoord(30,13)]: true,
            [utils.asGridCoord(30,12)]: true,
            [utils.asGridCoord(30,11)]: true,
            [utils.asGridCoord(30,10)]: true,
            [utils.asGridCoord(30,9)]: true,
            [utils.asGridCoord(30,8)]: true,
            [utils.asGridCoord(30,7)]: true,
            [utils.asGridCoord(30,6)]: true,
            [utils.asGridCoord(30,5)]: true,
            [utils.asGridCoord(30,4)]: true,
            [utils.asGridCoord(30,3)]: true,
            [utils.asGridCoord(30,2)]: true,
            [utils.asGridCoord(30,1)]: true,



            [utils.asGridCoord(11,7)]: true,

            
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,
        },
        // Definir salida habitaicón
        cutsceneSpaces: {
            // [utils.asGridCoord(31,9)]:stopNpcB,
            // [utils.asGridCoord(30,9)]: stopNpcB,
            [utils.asGridCoord(16,5)]:[
                {
                    events: [
                        { type: "changeMap", map: "DemoRoom"}
                    ]
                }
            ],
            [utils.asGridCoord(17,5)]:[
                {
                    events: [
                        { type: "changeMap", map: "DemoRoom"}
                    ]
                }
            ]
        }
        
    }
}