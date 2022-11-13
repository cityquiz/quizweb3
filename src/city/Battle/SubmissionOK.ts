import { postRegisterToken } from "@/stores/api";
import { useWallet } from "@/stores/store-wallet";
import type { BigNumber } from "ethers";
import type { Question } from "../interfaces/Question";
import { KeyboardMenu } from "../KeyboardMenu";


interface ResponseQuizComplete{
    project_id?: string;
    quiz_id?: string;
    play: boolean;
}

interface ConfigSubmissionQuiz{
    onComplete: (args: ResponseQuizComplete)=>void;
    
}


export class SubmissionOK implements ConfigSubmissionQuiz{
    
    onComplete: (args: ResponseQuizComplete) => void;
    
    element?: HTMLDivElement;

    keyboardMenu?: KeyboardMenu;
    
    constructor(config: ConfigSubmissionQuiz){
        
        this.onComplete = config.onComplete;

    }
    



    getPages(){
         const exitOption= {
            label: "Salir",
            description: "Regresar a la pagina anterior",
            handler:()=>{
                this.onComplete({
                    play: false
                });
            }
        }
        
            return [
                exitOption,
            ];
        
            
             
    }

    getTitle(){
        //const {question} = this.message;
        return 'Token registrado';
    }

    createElement(){
        this.element= document.createElement("div");
        this.element.classList.add("QuizMenu");
        
    }

    showMenu(container: HTMLDivElement){
        //container.innerHTML=(``);
        this.element!.innerHTML = (`
            <h2>Felicidades su token fue Entregado con éxito</h2>
            
            <div class="container">
                <span>${this.getTitle()}</span>
            </div>
        `);

        this.keyboardMenu= new KeyboardMenu({
            descriptionContainer: container,
            css: 'space-evenly'
        });

        this.keyboardMenu.init(this.element!);
        
        
        
        const last= container.querySelector(".QuizMenu");
        if(last){
            container.removeChild(last);
        } 
        
        container.appendChild(this.element!);


        this.keyboardMenu.setOptions(this.getPages());
    }

    init(container:HTMLDivElement){
        this.createElement();
        //show some UI
        this.showMenu(container);
        
    }
}