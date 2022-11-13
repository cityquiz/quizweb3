


interface ResponseQuizComplete{
    message: string;
    loading: boolean;
    aproved:boolean;
}

interface ConfigLoadingQuiz{
    title: string;
    message: string;
    quiz_id: string;
    project_id: string;
    onComplete: (args: ResponseQuizComplete)=>void;
    callBackLoading: ()=>Promise<any>;
}


export class LoadingQuiz implements ConfigLoadingQuiz{
    title: string;
    message: string;
    onComplete: (args: ResponseQuizComplete) => void;
    callBackLoading: () => Promise<any>;
    quiz_id: string;
    project_id: string;
    element?: HTMLDivElement;
    
    constructor(config: ConfigLoadingQuiz){
        this.project_id= config.project_id;
        this.quiz_id= config.quiz_id;
        this.message= config.message;
        this.title= config.title;
        
        this.onComplete = config.onComplete;
        this.callBackLoading = config.callBackLoading;

    }
    
    

    getTitle(){
        //const {question} = this.message;
        return this.title;
    }

    createElement(){
        this.element= document.createElement("div");
        this.element.classList.add("QuizMenu");
        
    }

    showLoading(container: HTMLDivElement){
        //container.innerHTML=(``);
        this.element!.innerHTML = (`
            <h2>Loading....</h2>
            
            <div class="container">
                <span>${this.message}</span>
            </div>
        `);

                
        const last= container.querySelector(".QuizMenu");
        if(last){
            container.removeChild(last);
        } 
        
        container.appendChild(this.element!);

        this.callBackLoading().then(res=>{
            
            
            console.log("evaluo la respuesta del server");
            this.onComplete({
                message: res.message,
                loading:false,
                aproved: res.aproved
            });
        })

    }

    init(container:HTMLDivElement){
        this.createElement();
        //show some UI
        this.showLoading(container);
        
    }
}