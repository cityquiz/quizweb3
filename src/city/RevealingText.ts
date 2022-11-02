interface ConfigRevealText{
    element: HTMLDivElement;
    text: string;
    speed?: number;
}
export class RevealingText implements ConfigRevealText{
    element: HTMLDivElement;
    text: string;
    speed?: number | undefined;

    timeout?:  any | null;
    isDone: boolean;
    
    constructor(config: ConfigRevealText){
        this.element =  config.element;
        this.text = config.text;
        this.speed= config.speed || 70;

        this.timeout= null ;
        this.isDone = false;
    }
    

    revealOneCharacter(list: any[]){
        const next = list.splice(0,1)[0];

        next.span.classList.add("revealed");

        if(list.length>0){
            this.timeout = setTimeout(()=>{
                this.revealOneCharacter(list);
            },next.delayAfter);
        }else{
            this.isDone= true;
        }
    }


    warpToDone(){
        clearTimeout(this.timeout);
        this.isDone=true;
        this.element.querySelectorAll("span").forEach((s)=>{
            s.classList.add("revealed");
        });
    }

    init(){
        let characters: any[] = [];
        let tex= this.text.split("");
        this.text.split("").forEach((character)=>{
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);

            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed
            });
        });

        this.revealOneCharacter(characters);
    }
}