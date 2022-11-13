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
        const questionsEvents = this.battle.quizes;
        
        for(let i=0; i<questionsEvents.length; i++){
            
            const event = {
                type: "makeToQuestion",
                question: questionsEvents[i],
                //target: submission.target
            }
            const response = await this.onNewEvent(event);
            
            this.battle.responses.push(response);
        }
        

        //resolver quiz 
        const event = {
            type: "loading",
            title: "Loading...",
            message: "Estamos evaluando su examen.",
            project_id: this.battle.enemy.project_name,
            quiz_id: this.battle.enemy.quiz_id,
            responses: this.battle.responses,
            //target: submission.target
        }

        const result= await this.onNewEvent(event);

        //if(result.aproved){
            const eventResult = {
                type: "makeResultQuiz",
                title: 'Resultado del quiz',
                message: result.message,
                quiz_id: result.aproved ? this.battle.enemy.project_name : null,
                project_id: result.aproved ? this.battle.enemy.quiz_id: null,
                //target: submission.target
            }
        const resultClaim =await this.onNewEvent(eventResult);

            debugger
        console.log(resultClaim);
        if(resultClaim.play){
            const eventOk = {
                type: "OK",
                //target: submission.target
            }
            await this.onNewEvent(eventOk);
        }
        //}


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