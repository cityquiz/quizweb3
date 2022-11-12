import type { Quiz } from "@/models/Quiz";
import type { Question } from "../interfaces/Question";
import { KeyboardMenu } from "../KeyboardMenu";


interface ResponseQuizComplete{
    play?: boolean;
    quiz_id?: number;
    answer_id?: number;
}
interface ConfigSubmissionQuiz{
    quiz: Quiz;
    onComplete: (args: ResponseQuizComplete)=>void;
}


export class SubmissionQuiz implements ConfigSubmissionQuiz{
    quiz: Quiz;
    onComplete: (args: ResponseQuizComplete) => void;

    element?: HTMLDivElement;

    keyboardMenu?: KeyboardMenu;
    
    constructor(config: ConfigSubmissionQuiz){
        
        this.quiz= config.quiz;
        
        this.onComplete = config.onComplete;

    }
    



    getPages(){
        const backOption= {
            label: "Regresar",
            description: "Regresar a la pagina anterior",
            handler:()=>{
                this.keyboardMenu!.setOptions(this.getPages());
            }
        }

        if(this.quiz){
            //return this.question.options.map(opt=>{
                return this.quiz.questions.map(opt=>{
                return {
                    label: opt.name,
                    description: '',
                    handler:()=>{
                        /* this.caster.answers.push({
                            questionId: this.items[index].id,
                            responseId: opt.id
                        }); */
                         this.onComplete({
                            quiz_id: this.quiz.id,
                            answer_id: opt.id!,
                        }) 
                        console.log(opt.id)
                    }
                }
            });
        }


        
        return [
            {
                label: "Play",
                description: `Inicio del quiz!`,
                handler: ()=>{
                    // go items page .. 
                    
                    //this.keyboardMenu.setTitle("Quiz otpsjibfo");
                    //this.keyboardMenu.setOptions(this.getPages());
                    //this.keyboardMenu.setTitle(this.getTitle(0));
                    this.onComplete({
                        play: true
                    })
                },
                
            },
            {
                label: "Salir",
                description: "Abandonar Quiz",
                //disabled: true,
                handler: ()=>{
                    this.onComplete({
                        play: false
                    });
                    //see pizza options
                    //this.keyboardMenu.setOptions(this.getPages().items);
                }
            },
            
        ]; 
             
    }

    getTitle(){
        const {name} = this.quiz;
        return name;
    }

    createElement(){
        this.element= document.createElement("div");
        this.element.classList.add("QuizMenu");
        
    }

    showMenu(container: HTMLDivElement){
        this.element!.innerHTML = (`
            <h2>Quiz</h2>
        `);

        this.keyboardMenu= new KeyboardMenu({
            descriptionContainer: container
        });
        this.keyboardMenu.init(this.element!);
        this.keyboardMenu.setOptions(this.getPages());
        if(this.quiz){
            
            this.keyboardMenu.setTitle(this.getTitle());
        }
        
        const last= container.querySelector(".QuizMenu");
        
        if(last){
            container.removeChild(last);
        }

        container.appendChild(this.element!);
    }

    init(container:HTMLDivElement){
        this.createElement();
        //show some UI
        this.showMenu(container);
        
    }
}