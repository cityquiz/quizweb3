import { utils } from "../utils";
import type { Combatant } from "./Combatant";

export const BattleAnimations={
    async spin(event: Combatant, onComplete: ()=>void){
        const element = event.caster!.pizzaElement;
        const animationClassName = event.caster!.team ==="player" ? "battle-spin-right": "battle-spin-left";
        element!.classList.add(animationClassName);

        //remove class animation
        element!.addEventListener("animationend", ()=>{
            element!.classList.remove(animationClassName);
        },{once:true});

        //continue battle cycle right around when the pizza collide

        await utils.wait(100);
        onComplete();
    },



    async glob(event: Combatant, onComplete: ()=>void){
        const {caster} = event;
        let div =  document.createElement("div");
        div.classList.add("glob-orb");
        div.classList.add(caster!.team === "player" ? "battle-glob-right" : "battle-glob-left");
        div.innerHTML=(`
        <svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="16" r="16" fill="${event.color!}" />
        </svg>
        `);

        //remove class when animation is fully complete
        div.addEventListener("animationend", ()=>{
            div.remove();
        });

        //add to scene
        document.querySelector(".Battle")!.appendChild(div);

        await utils.wait(820);
        onComplete();
    }
}