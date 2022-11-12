
import type { ReponseQuiz } from "@/models/Inputs/CheckProjectInput";
import type { Quiz } from "@/models/Quiz";
import { getProjectQuizById } from "@/stores/api";
import type { Behavior } from "../interfaces/Behavior";
import type { Enemy } from "../interfaces/Enemy";
import type { Question } from "../interfaces/Question";
import { utils } from "../utils";
import { BattleEvent } from "./BattleEvent";
import type { Combatant } from "./Combatant";
import { Team } from "./Team";
import { TurnCycle } from "./TurnCycle";

interface ConfigBattle{
    enemy: Enemy;
    onComplete: ()=>void;
}
export class Battle {
    element?: HTMLDivElement;
    enemy: Enemy;
    onComplete: ()=>void;
    combatants: any;
    activeCombatants: any;
    items: any[];
    //questions: Question[];
    quizes: Quiz[];
    usedInstanceIds: any;
    answers: any[];
    responses: ReponseQuiz[];

    playerTeam?: Team;
    enemyTeam?: Team;
    turnCycle?: TurnCycle;
    

    constructor(config: ConfigBattle){
        this.enemy = config.enemy;
        this.onComplete = config.onComplete;

        this.combatants={
        }

        this.activeCombatants = {
            player: null,
            enemy: null, 
        };

         //dynamically add the player team
        
        /*  (window as any).playerState.lineup.forEach((id: string)=>{
            this.addCombatant(id, "player", (window as any).playerState.pizzas[id])
        }) */

        //now the enemy team
        /* Object.keys(this.enemy.pizzas).forEach((key)=>{
            this.addCombatant(`e_${key}`, "enemy", this.enemy.pizzas[key]);
        }); */ 

        

        this.items= [];
        //add player items
        /* window.playerState.items.forEach((item)=>{
            this.items.push({
                ...item,
                team: "player"
            });
        }); */
        
        this.items= config.enemy.questions;
        
        this.quizes= [];// config.enemy.questions;


        //load items
        

        this.usedInstanceIds = {};

        this.answers=[];
        this.responses=[];

    }

    /* addCombatant(id: string, team: string, config){
            this.combatants[id]= new Combatant({
                ...Pizzas[config.pizzaId],
                ...config,
                team: team,
                isPlayerControlled: team === "player"
            }, this);
 

            //populate first pizza

            this.activeCombatants[team] = this.activeCombatants[team] || id;
    } */

    createElement(){
        this.element= document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML= (`
        <div class="Battle_hero">
            <img src="${'/assets/images/characters/people/hero.png'}">
        </div>
        <div class="Battle_enemy">
            <img src="${this.enemy.src}" >
        </div>
        `);
    }

    async init(container: HTMLDivElement){
        this.createElement();
        container.appendChild(this.element!);
        
        if(this.enemy.project_id){
            const quiz= await getProjectQuizById(this.enemy.project_id);
            
            this.quizes= quiz.quizes!;
        }

        //iniziamos con la obtencion del wallet id para identificar el player y el profesor
        this.playerTeam = new Team("player", "Hero");

        this.enemyTeam = new Team("enemy", "Bully");


        Object.keys(this.combatants).forEach((key)=>{
            let combatant = this.combatants[key];
            combatant.id=key;
            combatant.init(this.element);

            //add to correct team
            if(combatant.team === "player"){
                this.playerTeam!.combatants.push(combatant);
            }else if(combatant.team === "enemy"){
                this.enemyTeam!.combatants.push(combatant);
            }
        });

        this.playerTeam.init(this.element!);
        this.enemyTeam.init(this.element!);

        this.turnCycle =  new TurnCycle({
            battle: this,
            onNewEvent: (event: Combatant)=>{
                return new Promise((resolve)=>{
                    const battleEvent =  new BattleEvent(event, this);
                    battleEvent.init(resolve);
                })
            },
            onExitBattle: ()=>{
                this.element!.remove();
                this.onComplete();
            },
            onWinner:(winner)=>{
                /* if(winner === "player"){
                    const playerState = (window as any).playerState;
                    Object.keys(playerState.pizzas).forEach((id)=>{
                        const playerStatePizza = playerState.pizzas[id];
                        const combatant = this.combatants[id];
                        if(combatant){
                            playerStatePizza.hp = combatant.hp;
                            playerStatePizza.xp = combatant.xp;
                            playerStatePizza.maxHp = combatant.maxHp;
                            playerStatePizza.level = combatant.level;
                        }
                    });

                    playerState.items = playerState.items.filter((item)=>{
                        return !this.usedInstanceIds[item.instanceId];
                    });


                    //send signal to update
                    utils.emitEvent("PlayerStateUpdated");

                } */
                this.element!.remove();
                this.onComplete();
            }
        });
        this.turnCycle.init();
    }
}

