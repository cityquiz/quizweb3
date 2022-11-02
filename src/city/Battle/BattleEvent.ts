import type { Behavior } from "../interfaces/Behavior";
import type { Battle } from "./Battle";
import { BattleAnimations } from "./BattleAnimations";
import type { Combatant } from "./Combatant";
import { SubmissionQuiz } from "./SubmissionQuiz";

export class BattleEvent{
    battle: Battle;
    event: Combatant;

    constructor(event: Combatant, battle: Battle){
        this.battle= battle;
        this.event= event;
    }
/* 
    textMessage(resolve: ()=>void){
        const text = this.event.text!
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.action?.name);

        const message = new TextMessage({
            text,
            onComplete:()=>{
                resolve();
            }
        });
        message.init(this.battle.element);
    } */



    makeToQuestion(resolve: (arg: any)=>void){
        
        const {question} = this.event; 
        const menu = new SubmissionQuiz({
            question: question!,
            onComplete: (submission)=>{
                //submission what move to use  who  to use it on
                resolve(submission);
            }
        });
        menu.init(this.battle.element!);
    }

    
    
/* 
    submissionMenu(resolve: (arg: any)=>void){
        const {caster} = this.event; 
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            items: this.battle.items,
            replacements: Object.values(this.battle.combatants).filter((c)=>{
                return c.id !== caster.id && c.team === caster.team && c.hp > 0;
            }),
            onComplete: (submission)=>{
                //submission what move to use  who  to use it on
                resolve(submission);
            }
        });
        menu.init(this.battle.element);
    }
 */
/* 
    replacementMenu(resolve){
        
        const menu = new ReplacementMenu({
            replacements: Object.values(this.battle.combatants).filter((c)=>{
                return  c.team === this.event.team && c.hp > 0;
            }),
            onComplete: (replacement)=>{
                resolve(replacement);
            }
        });

        menu.init(this.battle.element);
    }
    async replace(resolve){
        const {replacement} = this.event;
        //clear out old  combatant
        
        const prevCombatant = this.battle.combatants[this.battle.activeCombatants[replacement.team]];
        this.battle.activeCombatants[replacement.team] = null;
        prevCombatant.update();
        await utils.wait(400);
        
        //in with the new!
        this.battle.activeCombatants[replacement.team]= replacement.id;
        replacement.update();
        await utils.wait(400);

        // update Team components
        this.battle.playerTeam.update();
        this.battle.enemyTeam.update();
        
        resolve();
    }

    giveXp(resolve){
        let amount = this.event.xp;
        const {combatant} = this.event;
        const step = ()=>{
            if(amount > 0){
                amount -=1;
                combatant.xp +=1;

                //check if wh've hit level up point
                if(combatant.xp === combatant.maxXp){
                    combatant.xp = 0;
                    combatant.mapXp = 100;
                    combatant.level += 1;
                }

                combatant.update();
                requestAnimationFrame(step);
                return;
            }
            resolve();

        }

        requestAnimationFrame(step);
    } */

    animation(resolve: ()=>void){
        const fn = (BattleAnimations as any)[this.event.animation!];
        fn(this.event,resolve);
    }

    init(resolve:(args: any)=>void){
        (this as any)[this.event.type](resolve);
    }

}