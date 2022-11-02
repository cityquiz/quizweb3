import { KeyPressedListener } from "./KeyPressedListener";
import { RevealingText } from "./RevealingText";

interface ConfigTextMessage{
    text: string;
    onComplete: () => void
}
export class TextMessage implements ConfigTextMessage{
    text: string;
    onComplete: () => void;

    element: HTMLDivElement | null;
    revealingText?: RevealingText;
    actionListener?: KeyPressedListener;


    constructor(config: ConfigTextMessage){
        this.text = config.text;
        this.onComplete= config.onComplete;

        this.element= null;
    }
    

    createElement(){
        
        this.element= document.createElement("div");
        this.element.classList.add("TextMessage");
        this.element.innerHTML= (`
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `)


        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p")!,
            text: this.text
        });

        this.element.querySelector("button")!.addEventListener("click",()=>{
            this.done();
        });

        this.actionListener =  new KeyPressedListener("Enter",()=>{
            //this.actionListener.unbind();
            this.done();
        });
    }


    done(){
        if(this.revealingText!.isDone){
            this.element!.remove();
            this.actionListener!.unbind();
            this.onComplete();
        }else{
            this.revealingText!.warpToDone();
        }
        
    }

    init(container: HTMLDivElement){
        this.createElement();
        
        container.appendChild(this.element!);

        this.revealingText!.init();
    }
}