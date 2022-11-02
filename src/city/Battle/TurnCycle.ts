import type { Battle } from "./Battle";
import type { BattleEvent } from "./BattleEvent";

interface ConfigTurnCycle{
    battle: Battle;
    onNewEvent: any;//BattleEvent;
    onWinner: (winner: string)=>void;
    onExitBattle: ()=>void;
}
export class TurnCycle implements ConfigTurnCycle{
    battle: Battle;
    onNewEvent: any;//BattleEvent;
    onWinner: (winner: string) => void;
    onExitBattle: () => void;
    
    currentTeam: string;

    constructor(config: ConfigTurnCycle){
        this.battle= config.battle;
        this.onNewEvent = config.onNewEvent;
        this.onWinner = config.onWinner;
        this.currentTeam = "player" // or enemy;
        this.onExitBattle = config.onExitBattle;
    }
    

    async turn(){
        const casterId =  this.battle.activeCombatants[this.currentTeam];
        const caster =  this.battle.combatants[casterId];
        //const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"];
        const enemy = this.battle.enemy;
        

         const SubmissionQuiz = await this.onNewEvent({
            type: "makeToQuestion",
            caster,
            enemy,
        });
        if(!SubmissionQuiz.play){
            this.onExitBattle();
            return;
        }
        
        //const postEvents = caster.getPostEvents();
        const questionsEvents = this.battle.questions;
        
        for(let i=0; i<questionsEvents.length; i++){
            const event = {
                type: "makeToQuestion",
                question: questionsEvents[i],
                //target: submission.target
            }
            
            const response = await this.onNewEvent(event);
            
            
        }



        this.onExitBattle();
        return;


        
        
/* 
        //do we have a winning team?
        const winner= this.getWinningTeam();
        if(winner){
            await this.onNewEvent({
                type: "textMessage",
                text: "Winner!"
            });

            this.onWinner(winner);
            return;
        }
 */            

    }

    nextTurn(){
        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
    }

    /* getWinningTeam(){
        let aliveTeams = {};
        Object.values(this.battle.combatants).forEach((c)=>{
            if(c.hp > 0){
                aliveTeams[c.team] =true;
            }
        });

        if(!aliveTeams["player"]) {return "enemy"}
        if(!aliveTeams["enemy"]) {return "player"}
        return null;
    } */

    async init(){
        
        /*await this.onNewEvent({
            type: "textMessage",
            text: "The battle  in starting"
        });
        */
    
        this.turn();
    }
}