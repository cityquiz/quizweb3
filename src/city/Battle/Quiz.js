class Quiz{
    //enemy prosor
    constructor({caster, enemy, onComplete, questions}){
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete= onComplete;
        this.questions = questions;
        
    }


    getQuestion(item={}){
        //this.createElement();
        
        //if(pageKey === "root"){
            /* const lineupPizzas  = playerState.lineup.map((id)=>{
                const {pizzaId} = playerState.pizzas[id];
                const base = Pizzas[pizzaId];
                
                return {
                    label: base.name,
                    description: base.description, 
                    handler:()=>{
                        this.keyboardMenu.setOptions(this.getOptions(id))
                    }
                }
            }); */
            
            return [
                //...lineupPizzas,
                {
                    label: "Guardar",
                    description: "Guardar progreso",
                    handler: ()=>{

                    }
                },
                {
                    label: "Cerrar",
                    description: "Cerrar",
                    handler: ()=>{
                        console.log('Close');
                        //this.close();
                    }
                },
            ]
        //}
        

        

        
        
    }
    
     createElement(){
        this.element= document.createElement("div");
        this.element.classList.add("Question");
        
        /* this.element.innerHTML = (`
            <h2>Quiz Menu</h2>
        `); */
     }



     init(container){
        this.createElement();
        this.keyboardMenu= new KeyboardMenu({
            descriptionContainer: container
        });

        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions(this.getQuestion());
        container.appendChild(this.element);

        /* utils.wait(200)
        this.esc = new KeyPressedListener("Escape", ()=>{
            this.close();
        }); */
    }
}