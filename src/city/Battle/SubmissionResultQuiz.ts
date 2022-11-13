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
    title: string;
    message: string;
    quiz_id: string;
    project_id: string;
    onComplete: (args: ResponseQuizComplete)=>void;
    
}


export class SubmissionResultQuiz implements ConfigSubmissionQuiz{
    title: string;
    message: string;
    onComplete: (args: ResponseQuizComplete) => void;
    quiz_id: string;
    project_id: string;
    element?: HTMLDivElement;

    keyboardMenu?: KeyboardMenu;
    
    constructor(config: ConfigSubmissionQuiz){
        this.project_id= config.project_id;
        this.quiz_id= config.quiz_id;
        this.message= config.message;
        this.title= config.title;
        
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
        const claimOption= {
            label: "Claim",
            description: "Reclamar su nft",
            handler:async ()=>{
                const store = useWallet();
                const wallet = await store.mintContract721();
                //const {address} = store.user;
                if(wallet){
                    wallet.signerContract.on("Transfer",async (from, to, tokenId: BigNumber) => {
                      const token=  tokenId.toBigInt().toString();
                      //this.loading=false;
                      console.log('TokenID:', token);
                      await store.registerToken(token, this.project_id).then((res)=>{

                            debugger
                            this.onComplete({
                                quiz_id: this.quiz_id,
                                project_id: this.project_id,
                                play: true
                            }); 
                        
                      })     
                    });
                    
                    const txMint =await wallet.txMint();
                    const tx= await txMint.wait();
                    console.log(tx.transactionHash);
          
                }

                
            }
        } 
        
            if(this.project_id && this.quiz_id){
                return [
                    exitOption,
                    claimOption
                ];
            }

            return [
                exitOption,
            ];
        
            
            /* return this.question.options.map(opt=>{
                return {
                    label: opt.response,
                    description: opt.response,
                    handler:()=>{
                        this.onComplete({
                            project_id: this.question.id,
                            quiz_id: opt.id,
                        }) 
                        console.log(opt.id)
                    }
                }
            }); */
        /* 
        
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
            
        ];  */
             
    }

    getTitle(){
        //const {question} = this.message;
        return this.title;
    }

    createElement(){
        this.element= document.createElement("div");
        this.element.classList.add("QuizMenu");
        
    }

    showMenu(container: HTMLDivElement){
        //container.innerHTML=(``);
        this.element!.innerHTML = (`
            <h2>Resultado</h2>
            
            <div class="container">
                <span>${this.message}</span>
            </div>
        `);

        this.keyboardMenu= new KeyboardMenu({
            descriptionContainer: container,
            css: 'space-evenly'
        });

        this.keyboardMenu.init(this.element!);
        
        if(this.title){
            
            this.keyboardMenu.setTitle(this.getTitle());
        }
        
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