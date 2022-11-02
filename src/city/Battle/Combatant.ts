import type { Question } from "../interfaces/Question";
import { utils } from "../utils";
import type { Battle } from "./Battle";

interface ConfigCombatant{

}
export class Combatant{
    id?: string;
    name?: string;
    src!: string;
    icon!: string;
    hp?:number;
    maxHp?: number;
    battle: Battle;
    xp?: number;
    maxXp?: number;
    team?: string;
    level?: number;
    status?: any;
    //isActive: boolean | undefined;

    hubElement?: HTMLDivElement;
    pizzaElement?: HTMLDivElement;
    hpFills?: any;
    xpFills?: any;
    caster?: Combatant;
    target?: Combatant;
    question?: Question;
    type!: string;
    color?: string;
    animation?: string;



    constructor(config: any, battle: Battle){
        Object.keys(config).forEach((key)=>{
            (this as any)[key] = config[key];
        });

        this.hp= typeof(this.hp) === "undefined" ? this.maxHp : this.hp;
        this.battle = battle;
    }

    get hpPercent(){
        const percent = this.hp! / this.maxHp! * 100;
        return percent > 0 ? percent : 0;
    }

    get xpPercent(){
        return this.xp! / this.maxXp! * 100;
    }

    isActive(): boolean{
        return this.battle!.activeCombatants[this.team!] === this.id!;
    }
    

    get giveXp(){
        return this.level! * 20;
    }

    createElement(){
        this.hubElement = document.createElement("div");
        this.hubElement.classList.add("Combatant");
        this.hubElement.setAttribute("data-combatant", this.id!);
        this.hubElement.setAttribute("data-team",this.team!);
        this.hubElement.innerHTML = (`
        <p class="Combatant_name">${this.name!}</p>
        <p class="Combatant_level"></p>
        <div class="Combatant_character_crop">
            <img class="Combatant_character" src="${this.src}" >
        </div>
        <img class="Combatant_type" src="${this.icon}">
        <svg viewBox="0 0 26 3" class="Combatant_life-container">
            <rect x="0", y="0" width="0%" height="1" fill="#82ff71" />
            <rect x="0", y="1" width="0%" height="2" fill="#3ef126" />
        </svg>
        <svg viewBox="0 0 26 2" class="Combatant_xp-container">
            <rect x="0", y="0" width="0%" height="1" fill="#ffd76a" />
            <rect x="0", y="1" width="0%" height="1" fill="#ffc934" />
        </svg>
        <p class="Combatant_status"></p>
        `);

        
        this.pizzaElement = document.createElement("img");
        this.pizzaElement.classList.add("Pizza");
        this.pizzaElement.setAttribute("src", this.src);
        this.pizzaElement.setAttribute("alt", this.name!);
        this.pizzaElement.setAttribute("data-team", this.team!); 

        this.hpFills = this.hubElement.querySelectorAll(".Combatant_life-container > rect");
        this.xpFills = this.hubElement.querySelectorAll(".Combatant_xp-container > rect");
    }

    update(changes:any={}){
        Object.keys(changes).forEach((key)=>{
            (this as any)[key]=changes[key];
        });
        
        this.hubElement!.setAttribute("data-active", `${this.isActive()}`)
        this.pizzaElement!.setAttribute("data-active", `${this.isActive()}`)

        this.hpFills.forEach((rect:any)=>rect.style.width = `${this.hpPercent}%`)
        this.xpFills.forEach((rect:any)=>rect.style.width = `${this.xpPercent}%`)

        (this.hubElement!.querySelector(".Combatant_level")).innerText = this.level;
        //update status

        const statusElement = this.hubElement!.querySelector(".Combatant_status")!;
        if(this.status){
            (statusElement as any).innerText= this.status.type;
            (statusElement as any).style.display= "block";
        }else{
            (statusElement as any).innerText = "";
            (statusElement as any).style.display= "none";
        }
    }

    getReplacedEvents(originalEvents: any[]){
        if(this.status?.type === "clumsy" && utils.randomFromArray([true, false, false])){
            return [
                { type: "textMessage", text: `${this.name} flops over!` },
            ];
        }
        return originalEvents;
    }

    getPostEvents(){
        if(this.status?.type==="saucy"){
            return [
                {type: "textMessage", text: "Feeling' saucy"},
                {type: "stateChange", recover: 5, onCaster: true}
            ];
        }
        return [];
    }

    decrementStatus(){
        if(this.status?.expiresIn > 0){
            this.status.expiresIn-=1;
            if(this.status.expiresIn===0){
                this.update({
                    status: null
                });
                return {
                    type: "textMessage",
                    text: "Status expired!"
                }
            }
        }
    }

    init(container: HTMLDivElement){
        this.createElement();
        //muestra los pokemon en la battalla 
        //container.appendChild(this.hubElement);
        //container.appendChild(this.pizzaElement);
        this.update()
    }
}