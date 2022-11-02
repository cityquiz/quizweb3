import type { Combatant } from "../Battle/Combatant";

export enum Direction{
    left="left",
    right="right",
    down= "down",
    up="up"

}
export interface Behavior{
    type: string;
    direction?: Direction;
    time?: number;
    who?: string | null;
    faceHero?: string
    text?: string;
    map?: string;
    retry?: true;
    enemyId?: string;
    caster?: Combatant;
    //{ type: "stand", direction: "left", time: 800 },
}